'use client';

import React, { useState } from 'react';
import { INITIAL_PORTFOLIO } from '@/lib/quotesStore';
import { PortfolioItem } from '@/types';
import { ArrowUpRight, CheckCircle, Clock, Cpu, Layers, Maximize2, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['Tutti', 'Industriale', 'Prototipi', 'Ricambi', 'Personalizzati', 'Design'];

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory === 'Tutti'
    ? INITIAL_PORTFOLIO
    : INITIAL_PORTFOLIO.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image Box */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-blue-400 text-[10px] font-mono font-bold uppercase">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-mono">
                    {item.clientType}
                  </span>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 flex items-center justify-center transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white font-mono group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {item.shortDescription}
                </p>
              </div>
            </div>

            {/* Bottom Tech Details Pill */}
            <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-blue-400 font-semibold">{item.techDetails.material}</span>
              <span className="flex items-center space-x-1 hover:text-white">
                <span>Dettagli tecnici</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Inspector Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative h-64 sm:h-80 bg-slate-950">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-mono font-bold uppercase">
                    {activeModalItem.category}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                    {activeModalItem.clientType}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {activeModalItem.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                  DESCRIZIONE PROGETTO
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalItem.fullDescription}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span>SPECIFICHE E TOLLERANZE PRODUTTIVE</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">MATERIALE:</span>
                    <strong className="text-white">{activeModalItem.techDetails.material}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">TEMPO DI PRODUZIONE:</span>
                    <strong className="text-white">{activeModalItem.techDetails.productionTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">PRECISIONE CAD:</span>
                    <strong className="text-white">{activeModalItem.techDetails.precision}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">QUANTITÀ PRODOTTA:</span>
                    <strong className="text-white">{activeModalItem.techDetails.quantity}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">PROCESSO:</span>
                    <strong className="text-white">{activeModalItem.techDetails.process}</strong>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Hai un componente simile da realizzare?
                </span>
                <Link
                  href="/preventivo"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider text-center"
                  onClick={() => setActiveModalItem(null)}
                >
                  RICHIEDI PREVENTIVO ANALOGO
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
