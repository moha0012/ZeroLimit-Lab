'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { ShieldCheck, Lock, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      // 1. If Supabase credentials exist, authenticate directly with Supabase Auth
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) {
          setErrorMsg(`Errore Supabase: ${error.message}`);
          setLoading(false);
          return;
        }

        if (data.session) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('zerolimit_admin_authenticated', 'true');
          }
          router.push('/admin/dashboard');
          return;
        }
      }

      // 2. Fallback check for local development if Supabase env vars are not set yet
      const ALLOWED_EMAIL = 'admin@zerolimitlab.it';
      const ALLOWED_PASSWORDS = ['admin', 'zerolimit2026'];

      if (
        cleanEmail.toLowerCase() === ALLOWED_EMAIL.toLowerCase() &&
        ALLOWED_PASSWORDS.includes(cleanPassword)
      ) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('zerolimit_admin_authenticated', 'true');
        }
        router.push('/admin/dashboard');
      } else {
        setErrorMsg('Credenziali errate! Controlla email e password o l’utente configurato su Supabase.');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setErrorMsg('Si è verificato un errore durante l’autenticazione.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 bg-tech-grid bg-radial-glow relative overflow-hidden">
      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-wider font-mono">
              ZeroLimit <span className="text-blue-500 text-sm px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">LAB</span>
            </span>
          </Link>

          <div>
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-tight">
              PORTALE OPERATORI & MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Accesso riservato tramite autenticazione Supabase Auth
            </p>
          </div>
        </div>

        {/* Login Box */}
        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Email operatore (Supabase User)</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua-email@zerolimitlab.it"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Password Supabase</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci password Supabase..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>AUTENTICAZIONE IN CORSO...</span>
            ) : (
              <>
                <span>ACCEDI CON SUPABASE AUTH</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white transition-colors">
            ← Torna al sito principale ZeroLimit Lab
          </Link>
        </div>

      </div>
    </div>
  );
}
