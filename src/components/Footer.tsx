'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, Ticket } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <span className="font-mono text-lg font-black italic">Z</span>
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white font-mono">
                ZeroLimit <span className="text-blue-500 text-sm px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">LAB</span>
              </span>
            </Link>
            <p className="text-xs font-mono tracking-wider text-blue-400 uppercase font-semibold">
              Engineering • Prototyping • Manufacturing
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Dal modello 3D al pezzo reale. Soluzioni ingegnerizzate per la progettazione CAD, prototipazione rapida e produzione di componenti tecnici su misura per l’industria ed i privati.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold">ZeroLimit LAB</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/servizi" className="hover:text-blue-400 transition-colors">Servizi di Progettazione</Link>
              </li>
              <li>
                <Link href="/industriale" className="hover:text-blue-400 transition-colors">Soluzioni Industriali B2B</Link>
              </li>
              <li>
                <Link href="/prototipazione" className="hover:text-blue-400 transition-colors">Prototipazione Rapida</Link>
              </li>
              <li>
                <Link href="/prodotti" className="hover:text-blue-400 transition-colors">Catalogo Prodotti</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio Progetti</Link>
              </li>
              <li>
                <Link href="/materiali" className="hover:text-blue-400 transition-colors">Guida ai Materiali</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold">INFORMAZIONI</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ticket" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center space-x-1">
                  <Ticket className="w-3.5 h-3.5 inline" />
                  <span>Consulta Stato Ticket</span>
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="hover:text-blue-400 transition-colors">Chi Siamo & Missione</Link>
              </li>
              <li>
                <Link href="/preventivo" className="hover:text-blue-400 transition-colors">Richiedi Preventivo</Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-blue-400 transition-colors">Contattaci</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/termini" className="hover:text-blue-400 transition-colors">Termini e Condizioni</Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold">SEDE & CONTATTI</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Via dell&apos;Industria, Pesaro (PU) • Marche, Italia</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@zerolimitlab.it" className="hover:text-white transition-colors">info@zerolimitlab.it</a>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+390721123456" className="hover:text-white transition-colors">+39 0721 123456</a>
              </div>

              <div className="pt-2">
                <Link
                  href="/preventivo"
                  className="inline-flex items-center space-x-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <span>PARLACI DEL TUO PROGETTO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} ZeroLimit LAB — Tutti i diritti riservati. P.IVA IT01234567890.</p>
          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-400">
            <span>PESARO • MARCHE • ITALY</span>
            <span>|</span>
            <Link href="/admin/login" className="hover:text-blue-400">PORTALE OPERATORI</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
