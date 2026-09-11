export type QuoteRequestStatus =
  | 'NUOVA'
  | 'IN_ANALISI'
  | 'PREVENTIVO_INVIATO'
  | 'ACCETTATA'
  | 'IN_PRODUZIONE'
  | 'COMPLETATA'
  | 'ANNULLATA';

export type QuoteRequestType =
  | 'Stampa 3D'
  | 'Progettazione CAD'
  | 'Prototipo'
  | 'Ricambio'
  | 'Piccola serie'
  | 'Prodotto personalizzato'
  | 'Altro';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  storagePath?: string;
  publicUrl?: string;
  dataUrl?: string;
}

export interface QuoteRequest {
  id: string;
  requestCode: string;
  createdAt: string;
  updatedAt: string;
  
  // Customer
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  
  // Technical specs
  requestType: QuoteRequestType;
  quantity: number;
  material: string;
  description: string;
  files: UploadedFileItem[];
  
  // Status & Management
  status: QuoteRequestStatus;
  quotedPrice?: number;
  estimatedLeadTimeDays?: number;
  internalNotes?: string;
  privacyAccepted: boolean;
}

export interface MaterialSpec {
  id: string;
  code: string;
  name: string;
  badge?: string;
  description: string;
  characteristics: string[];
  tensileStrength: string;
  flexibilityRating: number; // 1-5
  heatResistanceC: number;
  printDifficulty: number; // 1-5
  recommendedUsage: string;
  industrialUsage: string;
  colorOptions: string[];
  isActive: boolean;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: 'Industriale' | 'Prototipi' | 'Ricambi' | 'Personalizzati' | 'Design';
  clientType: 'Industriale' | 'Privato' | 'R&D';
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  galleryUrls?: string[];
  techDetails: {
    material: string;
    productionTime?: string;
    precision?: string;
    quantity?: string;
    process?: string;
  };
  featured: boolean;
}

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  materialOptions: string[];
  availabilityStatus: 'disponibile' | 'su_ordinazione' | 'in_sviluppo';
  imageUrl: string;
  customizable: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
