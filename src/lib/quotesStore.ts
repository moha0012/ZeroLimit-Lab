import { QuoteRequest, MaterialSpec, PortfolioItem, ProductItem, QuoteRequestStatus } from '@/types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

interface PublicTicketRow {
  id: string;
  request_code: string;
  created_at: string;
  updated_at: string;
  request_type: QuoteRequest['requestType'];
  quantity: number;
  material: string;
  description: string;
  status: QuoteRequestStatus;
  quoted_price: number | null;
  estimated_lead_time_days: number | null;
}

export const INITIAL_MATERIALS: MaterialSpec[] = [
  {
    id: 'mat-pla',
    code: 'PLA',
    name: 'PLA (Polylactic Acid)',
    badge: 'Prototipazione & Estetica',
    description: 'Polimero rigido e preciso, ideale per verificare ingombri, forme, prototipi di studio e componenti estetici non soggetti ad alte temperature.',
    characteristics: ['Elevata precisione dimensionale', 'Finitura superficiale uniforme', 'Eco-compatibile e bioplastico', 'Zero deformazione (warping)'],
    tensileStrength: '55-65 MPa',
    flexibilityRating: 1,
    heatResistanceC: 55,
    printDifficulty: 1,
    recommendedUsage: 'Prototipi di forma, modelli concettuali, contenitori, accessori.',
    industrialUsage: 'Dime di controllo non sollecitate, prototipi di packaging.',
    colorOptions: ['Nero Industriale', 'Grigio Tecnico', 'Bianco Puro', 'Blu Elettrico', 'Arancio'],
    isActive: true,
  },
  {
    id: 'mat-petg',
    code: 'PETG',
    name: 'PETG (Polyethylene Terephthalate Glycol)',
    badge: 'Standard Industriale',
    description: 'Materiale bilanciato con eccellente resistenza meccanica, trasparenza all’impatto e resistenza agli agenti chimici ed idrici.',
    characteristics: ['Elevata tenacità all’impatto', 'Resistenza chimica ed idrica', 'Buona flessibilità strutturale', 'Bassa igroscopicità'],
    tensileStrength: '50-55 MPa',
    flexibilityRating: 3,
    heatResistanceC: 75,
    printDifficulty: 2,
    recommendedUsage: 'Componenti funzionali, supporti tecnici, gusci protettivi.',
    industrialUsage: 'Staffe industriali, carter protettivi, passacavi, guide pneumatiche.',
    colorOptions: ['Nero Satinato', 'Trasparente Neutro', 'Grigio Antracite'],
    isActive: true,
  },
  {
    id: 'mat-abs',
    code: 'ABS',
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    badge: 'Resistenza Meccanica',
    description: 'Polimero ad elevate prestazioni termiche e d’impatto. Ampiamente utilizzato nel settore automotive e nell’elettronica di consumo.',
    characteristics: ['Elevata resistenza agli urti', 'Post-lavorabile e carteggiabile', 'Tenuta fino a 95-100°C', 'Rigidità elevata'],
    tensileStrength: '40-50 MPa',
    flexibilityRating: 2,
    heatResistanceC: 98,
    printDifficulty: 4,
    recommendedUsage: 'Parti meccaniche robuste, gusci per elettronica, componenti da post-lavorare.',
    industrialUsage: 'Carter motore, scatole di giunzione, impugnature tecniche.',
    colorOptions: ['Nero Opaco', 'Grigio Scuro', 'Bianco'],
    isActive: true,
  },
  {
    id: 'mat-asa',
    code: 'ASA',
    name: 'ASA (Acrylonitrile Styrene Acrylate)',
    badge: 'Resistenza UV & Outdoor',
    description: 'Evoluzione dell’ABS specifica per uso esterno. Immutabile ai raggi UV, al calore ed agli agenti atmosferici più aggressivi.',
    characteristics: ['Resistenza UV totale senza ingiallimento', 'Resistenza intemperie & pioggia', 'Elevata stabilità dimensionale', 'Finitura opaca professionale'],
    tensileStrength: '45-52 MPa',
    flexibilityRating: 2,
    heatResistanceC: 100,
    printDifficulty: 4,
    recommendedUsage: 'Componenti per esterni, accessori automotive, parti di droni e nautica.',
    industrialUsage: 'Sensori esterni, staffe fotovoltaiche, scatole di derivazione da palo.',
    colorOptions: ['Nero UV Guard', 'Grigio Industriale', 'Bianco Outdoor'],
    isActive: true,
  },
  {
    id: 'mat-tpu',
    code: 'TPU',
    name: 'TPU (Thermoplastic Polyurethane 95A)',
    badge: 'Elastomero Flessibile',
    description: 'Gomma tecnica ad altissima resistenza all’abrasione, agli oli ed agli urti. Perfetta per guarnizioni, smorzatori e giunti.',
    characteristics: ['Elevata elasticità & memoria di forma', 'Resistenza ad oli, grassi e solventi', 'Forte assorbimento vibrazioni', 'Resistenza all’abrasione'],
    tensileStrength: '35-40 MPa',
    flexibilityRating: 5,
    heatResistanceC: 80,
    printDifficulty: 4,
    recommendedUsage: 'Guarnizioni, piedini antivibranti, paracolpi, protezioni flessibili.',
    industrialUsage: 'Smorzatori per linee automatiche, soffietto protettivo, ruote morbide.',
    colorOptions: ['Nero Flex', 'Grigio Cemento', 'Arancio Segnaletica'],
    isActive: true,
  },
  {
    id: 'mat-nylon',
    code: 'NYLON / PA12-CF',
    name: 'Nylon PA12 Caricato Carbonio',
    badge: 'Sostituzione Metallo',
    description: 'Poliammide caricata con fibra di carbonio ad altissimo modulo elastico. Sostituisce alluminio ed ergal in applicazioni strutturali.',
    characteristics: ['Rapporto peso/resistenza straordinario', 'Resistenza termica oltre i 150°C', 'Autolubrificante ed anti-usura', 'Rigidità quasi metallica'],
    tensileStrength: '110-140 MPa',
    flexibilityRating: 1,
    heatResistanceC: 155,
    printDifficulty: 5,
    recommendedUsage: 'Ingranaggi ad alto carico, leve strutturali, parti di supporto sollecitate.',
    industrialUsage: 'Bracci robotici, dima di saldatura, staffe per corse/motorsport, ingranaggi.',
    colorOptions: ['Nero Carbonio Satinato'],
    isActive: true,
  },
  {
    id: 'mat-resina',
    code: 'RESINA MSLA',
    name: 'Resina ad Alta Precisione (SLA/MSLA)',
    badge: 'Micro-Dettaglio & Superficie',
    description: 'Polimerizzazione UV per dettagli infinitamente piccoli e tolleranze millesimali. Superficie liscia senza linee di strato visibili.',
    characteristics: ['Superficie perfettamente liscia', 'Dettagli fino a 25 micron', 'Tolleranze dimensionali micro', 'Ottima isotropia'],
    tensileStrength: '65-75 MPa',
    flexibilityRating: 1,
    heatResistanceC: 65,
    printDifficulty: 3,
    recommendedUsage: 'Prototipi estetici ad altissima risoluzione, master per stampi, miniature tecniche.',
    industrialUsage: 'Connettori ad alta densità, micro-involucri elettronici, prototipi medicali.',
    colorOptions: ['Grigio Alta Precisione', 'Nero Lucido', 'Trasparente Ottico'],
    isActive: true,
  },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    slug: 'supporto-sensore-linea-automazione',
    title: 'Supporto tecnico personalizzato per linea di confezionamento',
    category: 'Industriale',
    clientType: 'Industriale',
    shortDescription: 'Progettazione e produzione di 25 staffe rinforzate in PETG Carbon per sensori ottici industriali.',
    fullDescription: 'Un’azienda leader nel packaging alimentare necessitava di riposizionare 25 sensori ottici su una linea ad alta velocità senza bloccare la produzione. ZeroLimit Lab ha rilevato le quote, ridisegnato il supporto in CAD 3D ed eseguito la produzione in serie ridotta in 48 ore.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    techDetails: {
      material: 'PETG Carbon Black',
      productionTime: '48 ore',
      precision: '±0.08 mm',
      quantity: '25 pezzi',
      process: 'Stampa 3D FDM Industriale + Inserti Filettati in Ottone'
    }
  },
  {
    id: 'port-2',
    slug: 'prototipo-funzionale-scatola-cambio',
    title: 'Prototipo funzionale di involucro scatola rotismi',
    category: 'Prototipi',
    clientType: 'R&D',
    shortDescription: 'Verifica geometrica ed accoppiamento cuscinetti per nuovo brevetto meccanico.',
    fullDescription: 'Prototipazione rapida in ABS per testare l’ergonomia e l’accoppiamento di ingranaggi prima dell’investimento nello stampo ad iniezione. Realizzato con tolleranze strette e sedi cuscinetto rettificate.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    techDetails: {
      material: 'ABS Pro',
      productionTime: '24 ore',
      precision: '±0.05 mm',
      quantity: '2 prototipi',
      process: 'Progettazione CAD + FDM a camera calda'
    }
  },
  {
    id: 'port-3',
    slug: 'ricambio-su-misura-macchina-utensile',
    title: 'Ricostruzione su misura ingranaggio fuori produzione',
    category: 'Ricambi',
    clientType: 'Industriale',
    shortDescription: 'Reverse engineering di una puleggia dentata rotta per fresatrice d’epoca.',
    fullDescription: 'Partendo dai monconi del componente originale spezzato, ZeroLimit Lab ha ricostruito il modello CAD 3D a computer e prodotto il ricambio in PA12 Caricato Carbonio per garantire resistenza ed autolubrificazione.',
    imageUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    techDetails: {
      material: 'Nylon PA12-CF',
      productionTime: '36 ore',
      precision: '±0.05 mm',
      quantity: '1 pezzo su misura',
      process: 'Reverse Engineering + CAD 3D + FDM High-Temp'
    }
  },
  {
    id: 'port-4',
    slug: 'dima-di-assemblaggio-automotive',
    title: 'Dima di montaggio ed azzeramento componenti',
    category: 'Industriale',
    clientType: 'Industriale',
    shortDescription: 'Attrezzatura personalizzata per velocizzare il posizionamento dei connettori su cablaggi.',
    fullDescription: 'Dima ergonomica stampata in ASA resistente ad oli e solventi, dotata di sedi sagomate e magneti di ritenuta integrati nel corpo del pezzo durante il processo produttivo.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    techDetails: {
      material: 'ASA Industriale',
      productionTime: '3 giorni',
      precision: '±0.1 mm',
      quantity: '5 dime',
      process: 'Design per Additive Manufacturing'
    }
  },
  {
    id: 'port-5',
    slug: 'contenitore-tecnico-elettronica-custom',
    title: 'Guscio protettivo per centralina telemetry racing',
    category: 'Personalizzati',
    clientType: 'Privato',
    shortDescription: 'Custodia stagna con guarnizione integrata in TPU per uso pista su veicoli da competizione.',
    fullDescription: 'Sviluppato da zero per un team privato. Il guscio principale in ASA resiste al calore del vano motore, mentre le guarnizioni ed i passacavi in TPU assorbono le vibrazioni del telaio.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    techDetails: {
      material: 'ASA + TPU 95A (Multimateriale)',
      productionTime: '48 ore',
      precision: '±0.1 mm',
      quantity: '3 pezzi',
      process: 'CAD 3D + Stampa Multimateriale'
    }
  },
  {
    id: 'port-6',
    slug: 'collettore-aspirazione-prototipo',
    title: 'Componente meccanico ad alto flusso termico',
    category: 'Design',
    clientType: 'R&D',
    shortDescription: 'Collettore stampato in Resina ad alta temperatura per test in galleria del vento.',
    fullDescription: 'Superfici interne rifinite a specchio per fluidodinamica ottimizzata. Prodotto in un unico pezzo monolitico senza giunte o incollaggi.',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    techDetails: {
      material: 'Resina HT Glass',
      productionTime: '24 ore',
      precision: '±0.03 mm',
      quantity: '1 pezzo',
      process: 'Stampa 3D MSLA 4K'
    }
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    sku: 'ZLM-BRK-01',
    name: 'Supporto Orientabile Industriale per Sensori 18mm',
    slug: 'supporto-orientabile-sensori',
    category: 'Attrezzature Industriali',
    description: 'Supporto a snodo sferico rinforzato per fotocellule e sensori di prossimità industriali. Resistente alle vibrazioni.',
    price: 34.50,
    materialOptions: ['PETG Carbon', 'ASA UV-Guard'],
    availabilityStatus: 'disponibile',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    customizable: true
  },
  {
    id: 'prod-2',
    sku: 'ZLM-ORG-02',
    name: 'Organizer Tecnico per Binario DIN Heavy Duty',
    slug: 'organizer-binario-din',
    category: 'Quadri Elettrici',
    description: 'Modulo di montaggio a scatto per pettini di cablaggio e connettori ethernet industriali. Ignifugo ed antiurto.',
    price: 18.90,
    materialOptions: ['ABS Pro Black', 'PETG Grey'],
    availabilityStatus: 'disponibile',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    customizable: false
  },
  {
    id: 'prod-3',
    sku: 'ZLM-DMP-03',
    name: 'Set Piedini Antivibranti in TPU Shore 95A (4 pezzi)',
    slug: 'set-piedini-antivibranti-tpu',
    category: 'Accessori Meccanici',
    description: 'Smorzatori elastici ad alte prestazioni per stampanti 3D, compressori e piccoli banchi da lavoro. Riducono il rumore del 60%.',
    price: 24.00,
    materialOptions: ['TPU Black', 'TPU Orange'],
    availabilityStatus: 'disponibile',
    imageUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80',
    customizable: true
  },
  {
    id: 'prod-4',
    sku: 'ZLM-MNT-04',
    name: 'Supporto Comparatore Centregio per Torretta Tornio',
    slug: 'supporto-comparatore-tornio',
    category: 'Strumenti di Misura',
    description: 'Attacco rigido con azzeramento millesimale per tastatore d’officina. Compatibile con steli da 8mm.',
    price: 49.00,
    materialOptions: ['Nylon PA12-CF'],
    availabilityStatus: 'su_ordinazione',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    customizable: true
  },
  {
    id: 'prod-5',
    sku: 'ZLM-FAN-05',
    name: 'Bocchettone Convogliatore Aria ad Alta Efficienza',
    slug: 'bocchettone-convogliatore-aria',
    category: 'Raffreddamento & Ventilazione',
    description: 'Duct aria fluidodinamico testato al computer per raffreddamento mirato su componenti elettronici hot-spot.',
    price: 29.90,
    materialOptions: ['ASA White', 'ABS Black'],
    availabilityStatus: 'disponibile',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    customizable: true
  },
  {
    id: 'prod-6',
    sku: 'ZLM-KIT-06',
    name: 'Kit Prototipazione Scatole di Giunzione IP65 Custom',
    slug: 'kit-scatole-giunzione-custom',
    category: 'Contenitori Tecnici',
    description: 'Box personalizzabile nelle dimensioni e nei fori di passaggio cavi prima della produzione. Con guarnizione stampata.',
    price: 59.00,
    materialOptions: ['PETG + TPU', 'ASA + TPU'],
    availabilityStatus: 'in_sviluppo',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    customizable: true
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-demo-1',
    requestCode: 'ZLM-2026-0891',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    firstName: 'Marco',
    lastName: 'Rossi',
    email: 'm.rossi@meccanicamarche.it',
    phone: '+39 0721 849201',
    company: 'Meccanica Marche S.r.l.',
    requestType: 'Stampa 3D',
    quantity: 15,
    material: 'PETG',
    description: 'Abbiamo bisogno di 15 carter protettivi per un banco di collaudo. Invio file STEP in allegato. Richiesta tolleranza ±0.1mm e colore Nero industriale.',
    files: [
      {
        id: 'f-1',
        name: 'carter_protezione_v2.step',
        size: 2480100,
        type: 'application/step',
        publicUrl: '#'
      },
      {
        id: 'f-2',
        name: 'disegno_tecnico_quote.pdf',
        size: 890400,
        type: 'application/pdf',
        publicUrl: '#'
      }
    ],
    status: 'NUOVA',
    privacyAccepted: true
  },
  {
    id: 'quote-demo-2',
    requestCode: 'ZLM-2026-0884',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    firstName: 'Elena',
    lastName: 'Moretti',
    email: 'elena.moretti@designstudio.it',
    phone: '+39 347 1234567',
    company: 'Moretti Design Lab',
    requestType: 'Progettazione CAD',
    quantity: 2,
    material: 'Resina',
    description: 'Servizio completo dal disegno a mano libera al prototipo finito in resina ad alta risoluzione per un nuovo dispositivo indossabile.',
    files: [
      {
        id: 'f-3',
        name: 'schizzo_concetto.jpg',
        size: 1450000,
        type: 'image/jpeg',
        publicUrl: '#'
      }
    ],
    status: 'PREVENTIVO_INVIATO',
    quotedPrice: 380.00,
    estimatedLeadTimeDays: 4,
    internalNotes: 'Modello CAD stimato in 3 ore di lavoro. Stampa 3D MSLA resina ad alta definizione.',
    privacyAccepted: true
  }
];

const LOCAL_STORAGE_QUOTES_KEY = 'zerolimit_quotes_db_v1';

export function getLocalQuotes(): QuoteRequest[] {
  if (typeof window === 'undefined') return INITIAL_QUOTES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_QUOTES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_QUOTES_KEY, JSON.stringify(INITIAL_QUOTES));
      return INITIAL_QUOTES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading quotes from localStorage:', err);
    return INITIAL_QUOTES;
  }
}

export function saveLocalQuotes(quotes: QuoteRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_QUOTES_KEY, JSON.stringify(quotes));
  } catch (err) {
    console.error('Failed saving quotes to localStorage:', err);
  }
}

export async function fetchAllQuoteRequests(): Promise<QuoteRequest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select(`
          *,
          files:quote_files(*)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          requestCode: item.request_code,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          firstName: item.first_name,
          lastName: item.last_name,
          email: item.email,
          phone: item.phone,
          company: item.company,
          requestType: item.request_type,
          quantity: item.quantity,
          material: item.material,
          description: item.description,
          status: item.status,
          quotedPrice: item.quoted_price,
          estimatedLeadTimeDays: item.estimated_lead_time_days,
          internalNotes: item.internal_notes,
          privacyAccepted: item.privacy_accepted,
          files: (item.files || []).map((f: Record<string, unknown>) => ({
            id: f.id,
            name: f.file_name,
            size: f.file_size,
            type: f.file_type,
            storagePath: f.storage_path,
            publicUrl: f.public_url,
          })),
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local store:', e);
    }
  }
  return getLocalQuotes();
}

export async function getQuoteByCode(code: string): Promise<QuoteRequest | null> {
  const cleanCode = code.trim().toUpperCase();
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .rpc('get_public_quote_ticket', { ticket_code: cleanCode })
        .maybeSingle();

      if (!error && data) {
        const ticket = data as PublicTicketRow;
        return {
          id: ticket.id,
          requestCode: ticket.request_code,
          createdAt: ticket.created_at,
          updatedAt: ticket.updated_at,
          // The public ticket endpoint deliberately omits personal data and files.
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          requestType: ticket.request_type,
          quantity: ticket.quantity,
          material: ticket.material,
          description: ticket.description,
          status: ticket.status,
          quotedPrice: ticket.quoted_price ?? undefined,
          estimatedLeadTimeDays: ticket.estimated_lead_time_days ?? undefined,
          privacyAccepted: true,
          files: [],
        };
      }
    } catch (e) {
      console.warn('Supabase ticket lookup failed, checking local store:', e);
    }
  }

  const all = getLocalQuotes();
  const found = all.find((q) => q.requestCode.toUpperCase() === cleanCode);
  return found || null;
}

export async function submitQuoteRequest(
  payload: Omit<QuoteRequest, 'id' | 'requestCode' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<QuoteRequest> {
  const codeNumber = Math.floor(1000 + Math.random() * 9000);
  const requestCode = `ZLM-2026-${codeNumber}`;
  const now = new Date().toISOString();

  const newQuote: QuoteRequest = {
    ...payload,
    id: `quote-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    requestCode,
    createdAt: now,
    updatedAt: now,
    status: 'NUOVA',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: dbQuote, error: quoteErr } = await supabase
        .from('quote_requests')
        .insert({
          request_code: requestCode,
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          company: payload.company || null,
          request_type: payload.requestType,
          quantity: payload.quantity,
          material: payload.material,
          description: payload.description,
          privacy_accepted: payload.privacyAccepted,
          status: 'NUOVA',
        })
        .select()
        .single();

      if (!quoteErr && dbQuote) {
        newQuote.id = dbQuote.id;
        if (payload.files && payload.files.length > 0) {
          const filesToInsert = payload.files.map((file) => ({
            quote_request_id: dbQuote.id,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            storage_path: file.storagePath || `quotes/${dbQuote.id}/${file.name}`,
            public_url: file.publicUrl || null,
          }));
          await supabase.from('quote_files').insert(filesToInsert);
        }
      }
    } catch (e) {
      console.warn('Supabase insert failed, saving to local store:', e);
    }
  }

  const existing = getLocalQuotes();
  const updated = [newQuote, ...existing];
  saveLocalQuotes(updated);

  return newQuote;
}

export async function updateQuoteStatusAndDetails(
  id: string,
  updates: {
    status?: QuoteRequestStatus;
    quotedPrice?: number;
    estimatedLeadTimeDays?: number;
    internalNotes?: string;
  }
): Promise<QuoteRequest | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('quote_requests')
        .update({
          status: updates.status,
          quoted_price: updates.quotedPrice,
          estimated_lead_time_days: updates.estimatedLeadTimeDays,
          internal_notes: updates.internalNotes,
          updated_at: now,
        })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase update failed:', e);
    }
  }

  const quotes = getLocalQuotes();
  const idx = quotes.findIndex((q) => q.id === id);
  if (idx !== -1) {
    quotes[idx] = {
      ...quotes[idx],
      ...updates,
      updatedAt: now,
    };
    saveLocalQuotes(quotes);
    return quotes[idx];
  }
  return null;
}

export async function deleteQuoteRequest(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('quote_requests')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase delete failed:', e);
    }
  }

  const quotes = getLocalQuotes();
  const filtered = quotes.filter((q) => q.id !== id);
  saveLocalQuotes(filtered);
  return true;
}
