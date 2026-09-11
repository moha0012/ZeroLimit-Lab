'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Factory, ShieldCheck, CheckCircle2, Cpu, ArrowRight, Wrench, Layers } from 'lucide-react';

const INDUSTRIAL_SPECS = [
  { title: 'Tolleranze Dimensionali', desc: 'Precisione nominale fino a ±0.05 mm su geometrie controllate' },
  { title: 'Resistenza Meccanica', desc: 'Sostituzione dell’alluminio con PA12 caricato al carbonio (140 MPa)' },
  { title: 'Resistenza Termica', desc: 'Polimeri operativi fino a 155°C senza rammollimento' },
  { title: 'Resistenza Chimica', desc: 'Resistenza certificata ad oli idraulici, lubrificanti e solventi' },
];

export default function IndustrialePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-20">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase">
            <Factory className="w-4 h-4" />
            <span>SOLUZIONI MANUFATTURIERE B2B</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            COMPONENTI TECNICI PER L&apos;INDUSTRIA
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Produciamo staffe, gusci, dime di assemblaggio, carter e ricambi meccanici progettati per integrarsi perfettamente nelle tue linee produttive.
          </p>
        </section>

        {/* Tech Specs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIAL_SPECS.map((spec, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className="text-base font-bold font-mono text-white">{spec.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-white">
              HAI UN COMPONENTE INDUSTRIALE DA REALIZZARE?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Inviaci i file 3D STEP/IGES oppure richiedi un sopralluogo tecnico per il rilevamento delle quote direttamente in officina.
            </p>
            <Link
              href="/preventivo?type=Industriale"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-600/20"
            >
              <span>RICHIEDI VALUTAZIONE INDUSTRIALE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
