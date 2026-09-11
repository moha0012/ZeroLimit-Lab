'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getQuoteByCode } from '@/lib/quotesStore';
import { QuoteRequest, QuoteRequestStatus } from '@/types';
import { Search, Ticket, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function TicketTrackerPage() {
  return (
    <Suspense fallback={<TicketPageFallback />}>
      <TicketTrackerContent />
    </Suspense>
  );
}

function TicketPageFallback() {
  return <div className="min-h-screen bg-slate-950" />;
}

function TicketTrackerContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [requestCode, setRequestCode] = useState(initialCode);
  const [ticketData, setTicketData] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!requestCode.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await getQuoteByCode(requestCode.trim());
      if (res) {
        setTicketData(res);
      } else {
        setTicketData(null);
        setErrorMsg(`Nessun ticket trovato con il codice "${requestCode.trim().toUpperCase()}". Verifica il codice inserito.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Si è verificato un errore nella ricerca del ticket.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: QuoteRequestStatus) => {
    switch (status) {
      case 'NUOVA':
        return <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-mono font-bold">NUOVA</span>;
      case 'IN_ANALISI':
        return <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs font-mono font-bold">IN ANALISI TECNICA</span>;
      case 'PREVENTIVO_INVIATO':
        return <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold">PREVENTIVO PRONTO</span>;
      case 'ACCETTATA':
        return <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">PREVENTIVO ACCETTATO</span>;
      case 'IN_PRODUZIONE':
        return <span className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-xs font-mono font-bold">IN PRODUZIONE DIGITALE</span>;
      case 'COMPLETATA':
        return <span className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-mono font-bold">COMPLETATA & SPEDITA</span>;
      case 'ANNULLATA':
        return <span className="px-3 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-mono font-bold">ANNULLATA</span>;
      default:
        return <span className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-12">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            <Ticket className="w-4 h-4" />
            <span>PORTALE TRACCIAMENTO RICHIESTE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            CONSULTA IL TUO TICKET
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Inserisci il codice unico ricevuto al momento della richiesta di preventivo (es. <code className="text-blue-400 font-mono">ZLM-2026-0891</code>) per verificare lo stato di avanzamento, il costo ed i tempi di consegna.
          </p>
        </section>

        {/* Search Bar Container */}
        <section className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSearch} className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <label className="block text-xs font-mono text-slate-400 uppercase font-bold">
              Codice Ticket Preventivo
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  required
                  value={requestCode}
                  onChange={(e) => setRequestCode(e.target.value)}
                  placeholder="Es. ZLM-2026-0891"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm uppercase tracking-wider focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 shrink-0 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>RICERCA IN CORSO...</span>
                ) : (
                  <>
                    <span>CERCA TICKET</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Error message */}
        {errorMsg && (
          <section className="max-w-3xl mx-auto px-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </section>
        )}

        {/* Result Card */}
        {ticketData && (
          <section className="max-w-3xl mx-auto px-4 animate-in fade-in duration-300">
            <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-6">
              
              {/* Ticket Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">CODICE IDENTIFICATIVO:</span>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono text-blue-400 tracking-wider">
                    {ticketData.requestCode}
                  </h2>
                </div>
                <div>
                  {getStatusBadge(ticketData.status)}
                </div>
              </div>

              {/* Pricing & Delivery Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Costo Preventivato</span>
                  <div className="text-2xl font-mono font-black text-emerald-400">
                    {ticketData.quotedPrice ? `€${ticketData.quotedPrice.toFixed(2)}` : 'In fase di calcolo...'}
                  </div>
                  <span className="text-[11px] text-slate-400">IVA esclusa dove applicabile</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Tempi Stimati di Lavorazione</span>
                  <div className="text-xl font-mono font-bold text-white flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>{ticketData.estimatedLeadTimeDays ? `${ticketData.estimatedLeadTimeDays} giorni lavorativi` : 'In valutazione'}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Dalla conferma del preventivo</span>
                </div>
              </div>

              {/* Technical Details Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                  SPECIFICHE DELLA RICHIESTA
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">SERVIZIO:</span>
                    <strong className="text-white">{ticketData.requestType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">QUANTITÀ:</span>
                    <strong className="text-white">{ticketData.quantity} pz</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">MATERIALE:</span>
                    <strong className="text-white">{ticketData.material}</strong>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                  DESCRIZIONE PROGETTO
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  {ticketData.description}
                </p>
              </div>

            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
