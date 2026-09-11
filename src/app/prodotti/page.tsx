'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCatalog from '@/components/ProductCatalog';

export default function ProdottiPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-12">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            E-COMMERCE READY CATALOG
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            CATALOGO PRODOTTI TECNICI
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Scopri le nostre soluzioni standard per l&apos;industria, accessori per automazione, organizer tecnici e componenti predisposti per personalizzazione.
          </p>
        </section>

        {/* Product Catalog Component */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCatalog />
        </section>

      </main>

      <Footer />
    </div>
  );
}
