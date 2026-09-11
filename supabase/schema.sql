-- ==========================================
-- ZeroLimit Lab - Database Schema (Supabase)
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for quote request status
CREATE TYPE request_status AS ENUM (
  'NUOVA',
  'IN_ANALISI',
  'PREVENTIVO_INVIATO',
  'ACCETTATA',
  'IN_PRODUZIONE',
  'COMPLETATA',
  'ANNULLATA'
);

-- Enum for request type
CREATE TYPE request_type AS ENUM (
  'Stampa 3D',
  'Progettazione CAD',
  'Prototipo',
  'Ricambio',
  'Piccola serie',
  'Prodotto personalizzato',
  'Altro'
);

-- 1. PROFILES / ADMIN USERS
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'staff', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. QUOTE REQUESTS (Richieste Preventivo)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_code VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Customer Details
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  
  -- Technical Request Specs
  request_type request_type NOT NULL DEFAULT 'Stampa 3D',
  quantity INT NOT NULL DEFAULT 1,
  material TEXT NOT NULL DEFAULT 'PLA',
  description TEXT NOT NULL,
  
  -- Workflow & Pricing
  status request_status NOT NULL DEFAULT 'NUOVA',
  quoted_price DECIMAL(10,2),
  estimated_lead_time_days INT,
  internal_notes TEXT,
  
  -- Privacy
  privacy_accepted BOOLEAN NOT NULL DEFAULT true
);

-- 3. QUOTE FILES (File allegati per ogni richiesta)
CREATE TABLE IF NOT EXISTS public.quote_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_size INT NOT NULL,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MATERIALS (Gestione Materiali)
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  badge TEXT,
  description TEXT NOT NULL,
  characteristics TEXT[] DEFAULT '{}',
  tensile_strength TEXT NOT NULL,
  flexibility_rating INT NOT NULL DEFAULT 3,
  heat_resistance_c INT NOT NULL,
  print_difficulty INT NOT NULL DEFAULT 2,
  recommended_usage TEXT NOT NULL,
  industrial_usage TEXT NOT NULL,
  color_options TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client_type TEXT DEFAULT 'Industriale',
  short_description TEXT NOT NULL,
  full_description TEXT,
  tech_details JSONB DEFAULT '{}'::jsonb,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PRODUCTS (E-commerce ready)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  material_options TEXT[] DEFAULT '{}',
  availability_status TEXT DEFAULT 'disponibile',
  image_url TEXT NOT NULL,
  customizable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert quote_requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin select quote_requests" ON public.quote_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update quote_requests" ON public.quote_requests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete quote_requests" ON public.quote_requests FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Public insert quote_files" ON public.quote_files FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin select quote_files" ON public.quote_files FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public read materials" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

CREATE POLICY "Admin manage materials" ON public.materials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage portfolio" ON public.portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-files', 'quote-files', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public upload to quote-files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'quote-files');
CREATE POLICY "Allow admin download from quote-files" ON storage.objects FOR SELECT USING (bucket_id = 'quote-files' AND auth.role() = 'authenticated');

-- Public ticket lookup exposes only information required to track a quote.
-- Customer contact details, private operator notes and uploaded files remain private.
CREATE OR REPLACE FUNCTION public.get_public_quote_ticket(ticket_code TEXT)
RETURNS TABLE (
  id UUID,
  request_code VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  request_type request_type,
  quantity INT,
  material TEXT,
  description TEXT,
  status request_status,
  quoted_price DECIMAL,
  estimated_lead_time_days INT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    q.id,
    q.request_code,
    q.created_at,
    q.updated_at,
    q.request_type,
    q.quantity,
    q.material,
    q.description,
    q.status,
    q.quoted_price,
    q.estimated_lead_time_days
  FROM public.quote_requests AS q
  WHERE q.request_code = UPPER(TRIM(ticket_code))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_quote_ticket(TEXT) TO anon, authenticated;
