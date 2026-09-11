'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

export default function PreventivoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-12">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            VALUTAZIONE FATTIBILITÀ & PREVENTIVO GRATUITO
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            RICHIEDI UN PREVENTIVO
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Carica i tuoi file CAD 3D o descrivi l&apos;idea. I nostri ingegneri analizzeranno il progetto entro 24 ore fornendo quotazione e tempi certi.
          </p>
        </section>

        {/* Form Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
