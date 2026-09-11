'use client';

import React, { useState } from 'react';
import { INITIAL_MATERIALS } from '@/lib/quotesStore';
import { MaterialSpec } from '@/types';
import { Thermometer, Zap, ShieldAlert, Cpu, Check, Layers, Sparkles } from 'lucide-react';

export default function MaterialExplorer() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(INITIAL_MATERIALS[1]); // PETG default

  return (
    <div className="space-y-8">
      {/* Material Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {INITIAL_MATERIALS.map((mat) => {
          const isSelected = selectedMaterial.code === mat.code;
          return (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{mat.code}</span>
              {mat.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {mat.badge.split(' ')[0]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Material Deep Technical Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 font-mono text-xs font-bold">
                {selectedMaterial.code}
              </span>
              {selectedMaterial.badge && (
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs">
                  {selectedMaterial.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {selectedMaterial.name}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {selectedMaterial.description}
            </p>
          </div>

          <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-left lg:text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Resistenza Termica</span>
              <span className="text-xl font-mono font-black text-amber-400 flex items-center space-x-1 lg:justify-end">
                <Thermometer className="w-4 h-4 text-amber-400 inline" />
                <span>fino a {selectedMaterial.heatResistanceC}°C</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Carico di Rottura</span>
              <span className="text-base font-mono font-bold text-blue-400">
                {selectedMaterial.tensileStrength}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Flessibilità */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-xs font-mono text-slate-400 block">FLESSIBILITÀ MECCANICA</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step <= selectedMaterial.flexibilityRating ? 'bg-blue-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block pt-1">
              {selectedMaterial.flexibilityRating === 1 && 'Rigido / Frattura fragile'}
              {selectedMaterial.flexibilityRating === 2 && 'Semi-rigido con tenacità'}
              {selectedMaterial.flexibilityRating === 3 && 'Bilanciato con flessione controllata'}
              {selectedMaterial.flexibilityRating === 4 && 'Flessibile ad memoria di forma'}
              {selectedMaterial.flexibilityRating === 5 && 'Altamente elastico / Gommato'}
            </span>
          </div>

          {/* Difficoltà di stampa */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-xs font-mono text-slate-400 block">DIFFICOLTÀ PRODUTTIVA</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step <= selectedMaterial.printDifficulty ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-400 block pt-1">
              Livello {selectedMaterial.printDifficulty}/5 (Parametri e camera controllata)
            </span>
          </div>

          {/* Impieghi Consigliati */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1 md:col-span-2">
            <span className="text-xs font-mono text-blue-400 block uppercase font-bold flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5" />
              <span>UTILIZZO CONSIGLIATO</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMaterial.recommendedUsage}
            </p>
          </div>
        </div>

        {/* Industrial Application & Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>APPLICAZIONI INDUSTRIALI B2B</span>
            </h4>
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-200 leading-relaxed">
              {selectedMaterial.industrialUsage}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>CARATTERISTICHE CHIAVE</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedMaterial.characteristics.map((char, i) => (
                <li key={i} className="flex items-center space-x-2 text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800/60">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
