'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from '@/lib/quotesStore';
import { QuoteRequestType, UploadedFileItem } from '@/types';
import { 
  UploadCloud, 
  FileCheck, 
  FileCode, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const REQUEST_TYPES: QuoteRequestType[] = [
  'Stampa 3D',
  'Progettazione CAD',
  'Prototipo',
  'Ricambio',
  'Piccola serie',
  'Prodotto personalizzato',
  'Altro'
];

const MATERIALS = [
  'PLA',
  'PETG',
  'ABS',
  'ASA',
  'TPU',
  'Nylon',
  'Resina',
  'Non so / consigliami tu'
];

const ALLOWED_EXTENSIONS = ['.stl', '.step', '.stp', '.obj', '.3mf', '.pdf', '.jpg', '.png', '.zip'];

export default function QuoteForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  
  const [requestType, setRequestType] = useState<QuoteRequestType>('Stampa 3D');
  const [quantity, setQuantity] = useState<number>(1);
  const [material, setMaterial] = useState<string>('PETG');
  const [description, setDescription] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successQuoteCode, setSuccessQuoteCode] = useState<string | null>(null);

  // File Drag & Drop Handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (fileList: File[]) => {
    setErrorMsg('');
    const newItems: UploadedFileItem[] = [];

    for (const f of fileList) {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setErrorMsg(`Estensione non supportata per il file "${f.name}". Formati ammessi: STL, STEP, STP, OBJ, 3MF, PDF, JPG, PNG, ZIP.`);
        continue;
      }

      if (f.size > 50 * 1024 * 1024) { // 50MB limit per file
        setErrorMsg(`Il file "${f.name}" supera il limite di 50MB.`);
        continue;
      }

      newItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: f.name,
        size: f.size,
        type: f.type || 'application/octet-stream',
        publicUrl: '#'
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !description.trim()) {
      setErrorMsg('Compila tutti i campi obbligatori per procedere.');
      return;
    }

    if (!privacyAccepted) {
      setErrorMsg('È necessario accettare la privacy policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitQuoteRequest({
        firstName,
        lastName,
        email,
        phone,
        company: company.trim() || undefined,
        requestType,
        quantity,
        material,
        description,
        files,
        privacyAccepted: true,
      });

      setSuccessQuoteCode(res.requestCode);
      
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

    } catch (err) {
      console.error(err);
      setErrorMsg('Si è verificato un errore durante l’invio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccessQuoteCode(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setDescription('');
    setFiles([]);
    setQuantity(1);
  };

  if (successQuoteCode) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-emerald-500/40 text-center space-y-6 animate-in zoom-in-95 duration-300 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
            Richiesta Registrata
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Richiesta inviata correttamente!
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Ti ricontatteremo dopo aver analizzato le geometrie ed la fattibilità tecnica del tuo progetto.
          </p>
        </div>

        {/* Request Ticket Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center max-w-md mx-auto space-y-1">
          <span className="text-xs text-slate-400 font-mono">CODICE IDENTIFICATIVO PREVENTIVO:</span>
          <div className="text-2xl font-mono font-black text-blue-400 tracking-wider">
            {successQuoteCode}
          </div>
          <span className="text-[11px] text-slate-400">Conserva questo codice per qualsiasi comunicazione futura</span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/ticket?code=${encodeURIComponent(successQuoteCode)}`}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-blue-500/30 font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            CONSULTA IL TICKET
          </Link>
          <button
            onClick={resetForm}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            INVIA UN&apos;ALTRA RICHIESTA
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-8 max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>MODULO PREVENTIVO TECNICO IN RETAIL & B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase tracking-tight">
            RICHIEDI UN PREVENTIVO
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Risposta entro <strong className="text-white">24 ore lavorative</strong></span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. ANAGRAFICA CLIENTE */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] border border-blue-500/40">01</span>
          <span>DATI DI CONTATTO</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Nome *</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Es. Mario"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Cognome *</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Es. Rossi"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Email aziendale o personale *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mario.rossi@azienda.it"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Telefono / WhatsApp *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 333 1234567"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-slate-400 mb-1">Azienda / Ragione Sociale (opzionale)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Es. Meccanica Industriale S.r.l."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. SPECIFICHE PROGETTO */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] border border-blue-500/40">02</span>
          <span>SPECIFICHE PRODUTTIVE</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Tipo di richiesta *</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as QuoteRequestType)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              {REQUEST_TYPES.map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Quantità desiderata *</label>
            <input
              type="number"
              min={1}
              max={10000}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Materiale desiderato *</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m} className="bg-slate-900 text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Descrivi il progetto *</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specifica requisiti funzionali, tolleranze, ambienti di utilizzo (es. temperatura, urti, esterno), preferenze di colore o finitura..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-y"
          />
        </div>
      </div>

      {/* 3. MULTI-FILE UPLOAD AREA */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] border border-blue-500/40">03</span>
            <span>ALLEGATI PROGETTO (CAD / DOCUMENTI)</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">STL, STEP, STP, OBJ, 3MF, PDF, JPG, PNG, ZIP</span>
        </div>

        {/* Drag & Drop Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-slate-800 hover:border-blue-500/60 transition-all rounded-xl p-6 text-center bg-slate-950/60 group cursor-pointer"
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <input
            id="file-upload-input"
            type="file"
            multiple
            accept=".stl,.step,.stp,.obj,.3mf,.pdf,.jpg,.png,.zip"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-slate-200">
            Trascina qui i tuoi file 3D o documenti oppure <span className="text-blue-400 underline underline-offset-4">sfoglia dal computer</span>
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            È possibile caricare più file contemporaneamente (Max 50MB ciascuno)
          </p>
        </div>

        {/* Uploaded File List */}
        {files.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400">FILE SELEZIONATI ({files.length}):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono"
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-slate-200 truncate">{file.name}</span>
                    <span className="text-slate-400 shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. PRIVACY CHECKBOX & SUBMIT */}
      <div className="pt-4 border-t border-slate-800/80 space-y-6">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
          />
          <span className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
            Ho letto e accetto la <a href="/privacy" className="text-blue-400 underline">Privacy Policy</a> ed autorizzo il trattamento dei dati personali per l&apos;elaborazione del preventivo tecnico.
          </span>
        </label>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>I file caricati sono protetti e riservati. Nessuna condivisione con terzi.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30 border border-blue-400/40 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>ELABORAZIONE IN CORSO...</span>
            ) : (
              <>
                <span>INVIA RICHIESTA PREVENTIVO</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
