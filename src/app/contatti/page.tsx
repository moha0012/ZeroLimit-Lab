'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function ContattiPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 space-y-16">
        
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase">
            CONTATTO DIRETTO & REPARTO TECNICO
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
            PARLIAMO DEL TUO PROGETTO.
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Siamo a tua disposizione per consulenze CAD, quotazioni industriali e fattibilità produttiva.
          </p>
        </section>

        {/* Contact Info & Form Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold font-mono text-white border-b border-slate-800 pb-3">
                  RECAPITI DIRETTO LAB
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-start space-x-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Sede & Laboratorio:</strong>
                      <span>Via dell&apos;Industria, Pesaro (PU) • Marche, Italia</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-300">
                    <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Email Ingegneria & Preventivi:</strong>
                      <a href="mailto:info@zerolimitlab.it" className="text-blue-400 hover:underline">info@zerolimitlab.it</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-300">
                    <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Telefono Ufficio:</strong>
                      <a href="tel:+390721123456" className="hover:text-white">+39 0721 123456</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-300">
                    <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">WhatsApp Diretto Tecnico:</strong>
                      <a href="https://wa.me/393331234567" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">+39 333 1234567</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-300">
                    <Globe className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Area Geografica Servita:</strong>
                      <span>Pesaro, Urbino, Ancona, Marche & Spedizioni in tutta Italia/Europa.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400">
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400">
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-slate-800">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-mono text-white">Messaggio Inviato!</h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Grazie per averci contattato. Risponderemo al tuo messaggio entro poche ore lavorative.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold uppercase"
                    >
                      INVIA UN ALTRO MESSAGGIO
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold font-mono text-white border-b border-slate-800 pb-3">
                      INVIA UN MESSAGGIO AL TEAM
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Nome e Cognome *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Mario Rossi"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mario@azienda.it"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Telefono (opzionale)</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+39 0721..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Oggetto *</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Richiesta informazioni / fattibilità"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Messaggio *</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Come possiamo aiutarti? Descrivi la tua esigenza..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
                    >
                      <span>INVIA MESSAGGIO</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
