'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/industriale', label: 'Industriale' },
  { href: '/prototipazione', label: 'Prototipazione' },
  { href: '/prodotti', label: 'Prodotti' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/materiali', label: 'Materiali' },
  { href: '/ticket', label: 'Consulta Ticket' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3'
          : 'bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <span className="font-mono text-lg font-black italic">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-white font-mono flex items-center">
                ZeroLimit
                <span className="text-blue-500 ml-1 font-mono text-sm font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                  LAB
                </span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 hidden sm:block">
                ENGINEERING & MANUFACTURING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admin/login"
              className="text-xs font-mono text-slate-400 hover:text-slate-200 px-3 py-2 transition-colors flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin</span>
            </Link>

            <Link
              href="/preventivo"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-95 border border-blue-400/40 uppercase font-mono"
            >
              <span>RICHIEDI PREVENTIVO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center space-x-2 xl:hidden">
            <Link
              href="/preventivo"
              className="px-3 py-1.5 rounded bg-blue-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider"
            >
              Preventivo
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                      : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <Link
              href="/preventivo"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-2"
            >
              <span>RICHIEDI UN PREVENTIVO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/login"
              className="w-full py-2 text-center text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Accesso Riservato Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
