'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, RefreshCw, Boxes, Sliders, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ServiziPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-20">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            SOLUZIONI INGEGNERISTICHE INTEGRATE
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            I NOSTRI SERVIZI PRODUTTIVI
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Dalla modellazione CAD 3D avanzata alla prototipazione rapida ed alla produzione in piccole serie di componenti ad elevate prestazioni.
          </p>
        </section>

        {/* Detailed Service Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 1. Progettazione CAD */}
          <div id="cad" className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">PROGETTAZIONE CAD 3D</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trasformiamo schizzi su carta, concetti, foto o campioni fisici usurati in modelli matematici 3D nativi (STEP, IGES, SolidWorks/Autodesk). Il nostro approccio considera fin dall’inizio i vincoli del processo produttivo (Design for Additive Manufacturing) per garantire geometrie ottimali, leggerezza e massima resistenza strutturale.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Reverse Engineering 3D</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Ottimizzazione topologica</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Modellazione di assiemi con tolleranze</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Messa in tavola 2D e quote PDF</span></li>
              </ul>
            </div>
            <div className="lg:col-span-5 text-right space-y-4">
              <Link
                href="/preventivo?type=Progettazione CAD"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Richiedi Progettazione CAD</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Stampa 3D Professionale */}
          <div id="stampa3d" className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">STAMPA 3D PROFESSIONALE</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Utilizziamo parchi macchine industriali a camera calda e tecnologia MSLA ad alta risoluzione 4K per la realizzazione di pezzi plastici e compositi con stabilità dimensionale garantita. Dalla resistenza termica dei polimeri ASA e PA12-CF alla trasparenza delle resine tecniche.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Tecnologie FDM & MSLA/SLA</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Polimeri tecnici & compositi carbonio</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Alte temperature (fino a 155°C)</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /><span>Inserti metallici filettati annegati</span></li>
              </ul>
            </div>
            <div className="lg:col-span-5 text-right space-y-4">
              <Link
                href="/preventivo?type=Stampa 3D"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Richiedi Stampa 3D</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. Ricambi su misura & Piccole Serie */}
          <div id="ricambi" className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">RICAMBI SU MISURA & PICCOLE SERIE</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Produciamo lotti da 10 a 500 pezzi senza la necessità di costi fissi per stampi ad iniezione. Inoltre risolviamo il blocco di macchinari industriali riproducendo parti di ricambio introvabili o fuori produzione.
              </p>
            </div>
            <div className="lg:col-span-5 text-right space-y-4">
              <Link
                href="/preventivo?type=Piccola serie"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Richiedi Preventivo Serie</span>
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
