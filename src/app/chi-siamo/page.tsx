'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Cpu, ShieldCheck, Factory, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-20">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            CHI SIAMO & VISIONE AZIENDALE
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight leading-tight">
            PRECISIONE, PROGETTAZIONE, INNOVAZIONE.
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ZeroLimit Lab nasce dall&apos;incontro tra progettazione meccanica, tecnologia e produzione digitale. Il nostro obiettivo è trasformare idee e necessità concrete in componenti reali, funzionali e progettati con precisione.
          </p>
        </section>

        {/* Company Philosophy Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white">PROGETTAZIONE 3D RIGOROSA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Non ci limitiamo a caricare file in uno slicer. Verificiamo spessori critici, direzioni di sollecitazione, tolleranze di accoppiamento ed orientamento delle fibre compositi per garantire stabilità meccanica.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white">HUB PRODUTTIVO DIGITALE</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ZeroLimit Lab integra macchine a controllo numerico, stampa addittiva FDM a camera calda fino a 300°C e sistemi MSLA UV 4K per soddisfare le esigenze di officine meccaniche, automazione ed industria 4.0.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white">AFFIDABILITÀ & RISERVATEZZA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tutti i file 3D ed i brevetti affidati a ZeroLimit Lab sono tutelati da accordi di riservatezza (NDA). Massima puntualità nei tempi di consegna concordati.
              </p>
            </div>
          </div>
        </section>

        {/* Scalability Future Note */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 font-bold uppercase">
              <Award className="w-4 h-4 text-blue-400" />
              <span>CRESCITA ED EXPANSION ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white">
              EVOLUZIONE VERSO SISTER SYSTEMS & CNC
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              ZeroLimit Lab nasce come piattaforma completa per la manifattura avanzata. La nostra roadmap tecnologica comprende l&apos;integrazione continua di lavorazioni CNC a 5 assi, taglio laser di precisione, scansione 3D ottica per collaudo metrologico e formatura digitale.
            </p>
            <div className="pt-2">
              <Link
                href="/preventivo"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30"
              >
                <span>PARLA CON UN NOSTRO INGEGNERE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
