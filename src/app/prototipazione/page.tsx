'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Cpu, Layers } from 'lucide-react';

export default function PrototipazionePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-20">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>SPEED TO MARKET & AGILITY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            PROTOTIPAZIONE RAPIDA 3D
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Passa dall&apos;idea al prototipo fisico toccabile con mano in meno di 24-48 ore. Riduci i tempi ed azzera i rischi di errore prima dell&apos;industrializzazione.
          </p>
        </section>

        {/* Workflow */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400">FASE 01</span>
              <h3 className="text-xl font-bold font-mono text-white">PROTOTIPO CONCETTUALE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stampa veloce in PLA per verificare ingombri, volume, estetica e maneggevolezza a costi contenuti.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400">FASE 02</span>
              <h3 className="text-xl font-bold font-mono text-white">PROTOTIPO FUNZIONALE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stampa in PETG o ABS per testare accoppiamenti meccanici, sollecitazioni ed inserimento cuscinetti/viti.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400">FASE 03</span>
              <h3 className="text-xl font-bold font-mono text-white">PRE-SERIE PRE-STAMPO</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Produzione in PA12 Carbon per prove sul campo, test termici e validazione finale con i clienti.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-blue-500/30 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-white">
              PRONTO A CREARE IL TUO PROTOTIPO?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Inviaci i tuoi file 3D e ricevi l&apos;analisi di fattibilità con proposta economica entro 24 ore.
            </p>
            <Link
              href="/preventivo?type=Prototipo"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30"
            >
              <span>INVIA IL TUO CAD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
