'use client';

import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '@/lib/quotesStore';
import { ProductItem } from '@/types';
import { ShoppingBag, Sliders, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [cartModalProduct, setCartModalProduct] = useState<ProductItem | null>(null);

  const categories = ['Tutti', ...Array.from(new Set(INITIAL_PRODUCTS.map((p) => p.category)))];

  const filteredProducts = selectedCategory === 'Tutti'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
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

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Product Image Box */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex flex-col space-y-1">
                  <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-blue-400 text-[10px] font-mono font-bold">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {product.availabilityStatus === 'disponibile' && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                      Disponibile
                    </span>
                  )}
                  {product.availabilityStatus === 'su_ordinazione' && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold">
                      Su Ordinazione
                    </span>
                  )}
                  {product.availabilityStatus === 'in_sviluppo' && (
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-mono font-bold">
                      In Sviluppo
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-white font-mono group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Available Material Options */}
                <div className="pt-2 flex items-center space-x-1 flex-wrap gap-y-1">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">Materiali:</span>
                  {product.materialOptions.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="p-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Prezzo base</span>
                <span className="text-xl font-mono font-black text-white">
                  €{product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href={`/preventivo?product=${encodeURIComponent(product.name)}`}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-md shadow-blue-600/30 flex items-center space-x-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ordina / Personalizza</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
