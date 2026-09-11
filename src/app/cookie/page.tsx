'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 space-y-8 font-sans">
        <h1 className="text-3xl font-bold font-mono text-white">COOKIE POLICY — ZeroLimit Lab</h1>
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed font-mono">
          <p>Questo sito utilizza esclusivamente cookie tecnici essenziali per garantire il funzionamento del carrello, della navigazione e della gestione sessioni admin.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
