'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioGrid from '@/components/PortfolioGrid';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-12">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            CASE HISTORIES & REALIZZAZIONI
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            PROGETTI REALIZZATI
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Esplora la nostra galleria di componenti industriali, prototipi funzionali, ricambi introvabili e creazioni ad alta precisione.
          </p>
        </section>

        {/* Portfolio Grid Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGrid />
        </section>

      </main>

      <Footer />
    </div>
  );
}
