'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 space-y-8 font-sans">
        <h1 className="text-3xl font-bold font-mono text-white">PRIVACY POLICY — ZeroLimit Lab</h1>
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed font-mono">
          <p>Ai sensi del Regolamento UE 2016/679 (GDPR), ZeroLimit Lab garantisce la massima riservatezza ed il trattamento sicuro dei dati personali e dei file di progetto (STL, STEP, STP, OBJ, PDF) inviati dagli utenti per la richiesta di preventivo.</p>
          <h3 className="text-sm font-bold text-white pt-2">1. Titolarità del trattamento</h3>
          <p>Il titolare del trattamento è ZeroLimit Lab S.r.l. con sede a Pesaro (PU), Italia. Email: info@zerolimitlab.it.</p>
          <h3 className="text-sm font-bold text-white pt-2">2. Finalità e Protezione File CAD</h3>
          <p>I dati e i file 3D caricati vengono utilizzati unicamente al fine di elaborare la proposta tecnica ed economica e produrre i pezzi ordinati. I file non vengono ceduti né diffusi a terze parti.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
