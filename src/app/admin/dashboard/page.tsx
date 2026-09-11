'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllQuoteRequests, updateQuoteStatusAndDetails, deleteQuoteRequest } from '@/lib/quotesStore';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { QuoteRequest, QuoteRequestStatus } from '@/types';
import { 
  Cpu, 
  Search, 
  Filter, 
  FileCode, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  LogOut, 
  Layers, 
  Package, 
  DollarSign, 
  FileText,
  UserCheck,
  X,
  MailCheck,
  Building,
  Phone,
  RefreshCw,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

const STATUS_OPTIONS: QuoteRequestStatus[] = [
  'NUOVA',
  'IN_ANALISI',
  'PREVENTIVO_INVIATO',
  'ACCETTATA',
  'IN_PRODUZIONE',
  'COMPLETATA',
  'ANNULLATA'
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('TUTTE');
  
  // Selected Request Detail Modal State
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [editLeadTime, setEditLeadTime] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editStatus, setEditStatus] = useState<QuoteRequestStatus>('NUOVA');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllQuoteRequests();
    setQuotes(data);
    setLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          loadData();
          return;
        }
      }

      if (typeof window !== 'undefined') {
        const isAuth = sessionStorage.getItem('zerolimit_admin_authenticated');
        if (isAuth === 'true') {
          setIsAuthenticated(true);
          loadData();
          return;
        }
      }

      router.push('/admin/login');
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center font-mono text-xs">
        <span>VERIFICA AUTENTICAZIONE OPERATORE SUPABASE IN CORSO...</span>
      </div>
    );
  }

  const handleOpenDetail = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setEditPrice(quote.quotedPrice ? quote.quotedPrice.toString() : '');
    setEditLeadTime(quote.estimatedLeadTimeDays ? quote.estimatedLeadTimeDays.toString() : '');
    setEditNotes(quote.internalNotes || '');
    setEditStatus(quote.status);
    setSaveSuccessMsg('');
  };

  const handleSaveDetails = async () => {
    if (!selectedQuote) return;

    const priceNum = editPrice ? parseFloat(editPrice) : undefined;
    const leadTimeNum = editLeadTime ? parseInt(editLeadTime) : undefined;

    const updated = await updateQuoteStatusAndDetails(selectedQuote.id, {
      status: editStatus,
      quotedPrice: priceNum,
      estimatedLeadTimeDays: leadTimeNum,
      internalNotes: editNotes,
    });

    if (updated) {
      setSaveSuccessMsg('Dati aggiornati ed eventuale notifica cliente predisposta!');
      loadData();
      setTimeout(() => {
        setSelectedQuote(null);
      }, 1200);
    }
  };

  const handleDeleteRequest = async (id: string, requestCode: string) => {
    if (window.confirm(`Sei sicuro di voler eliminare definitivamente la richiesta ${requestCode}? Questa azione non è reversibile.`)) {
      await deleteQuoteRequest(id);
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(null);
      }
      loadData();
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('zerolimit_admin_authenticated');
    }
    router.push('/admin/login');
  };

  // Filtering
  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = selectedStatusFilter === 'TUTTE' || q.status === selectedStatusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      q.requestCode.toLowerCase().includes(searchLower) ||
      q.firstName.toLowerCase().includes(searchLower) ||
      q.lastName.toLowerCase().includes(searchLower) ||
      q.email.toLowerCase().includes(searchLower) ||
      (q.company && q.company.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  // Metrics
  const totalCount = quotes.length;
  const newCount = quotes.filter((q) => q.status === 'NUOVA').length;
  const inProgressCount = quotes.filter((q) => q.status === 'IN_PRODUZIONE' || q.status === 'IN_ANALISI').length;
  const completedCount = quotes.filter((q) => q.status === 'COMPLETATA').length;

  const getStatusBadge = (status: QuoteRequestStatus) => {
    switch (status) {
      case 'NUOVA':
        return <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-mono font-bold">NUOVA</span>;
      case 'IN_ANALISI':
        return <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-mono font-bold">IN ANALISI</span>;
      case 'PREVENTIVO_INVIATO':
        return <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold">PREVENTIVO INVIATO</span>;
      case 'ACCETTATA':
        return <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">ACCETTATA</span>;
      case 'IN_PRODUZIONE':
        return <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-[10px] font-mono font-bold">IN PRODUZIONE</span>;
      case 'COMPLETATA':
        return <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[10px] font-mono font-bold">COMPLETATA</span>;
      case 'ANNULLATA':
        return <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono font-bold">ANNULLATA</span>;
      default:
        return <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-wider font-mono">
              ZeroLimit <span className="text-blue-500 text-xs px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">ADMIN</span>
            </span>
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">GESTIONE RICHIESTE PREVENTIVO E PRODUZIONE</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Aggiorna Dati"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Esci</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-mono uppercase text-white tracking-tight">
              PANNELLO DI CONTROLLO OPERATORI
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Visualizza le geometrie, assegna prezzi di preventivo, gestisci i file 3D ed elimina le richieste non desiderate.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Totale Richieste</span>
            <div className="text-2xl font-mono font-black text-white">{totalCount}</div>
            <span className="text-[11px] text-slate-400">Registrate a sistema</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-blue-500/30 bg-blue-950/10 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase">Nuove da Analizzare</span>
            <div className="text-2xl font-mono font-black text-blue-400">{newCount}</div>
            <span className="text-[11px] text-blue-400/80">In attesa di valutazione</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-purple-500/30 bg-purple-950/10 space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase">In Lavorazione</span>
            <div className="text-2xl font-mono font-black text-purple-400">{inProgressCount}</div>
            <span className="text-[11px] text-purple-400/80">Analisi / Produzione</span>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Completate</span>
            <div className="text-2xl font-mono font-black text-emerald-400">{completedCount}</div>
            <span className="text-[11px] text-emerald-400/80">Pezzi consegnati</span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status filter tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedStatusFilter('TUTTE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                selectedStatusFilter === 'TUTTE'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              TUTTE ({totalCount})
            </button>
            {STATUS_OPTIONS.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                  selectedStatusFilter === st
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca codice, cliente, mail..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Requests Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-semibold">
                <tr>
                  <th className="px-4 py-3.5">Codice / Data</th>
                  <th className="px-4 py-3.5">Cliente</th>
                  <th className="px-4 py-3.5">Tipo / Q.tà</th>
                  <th className="px-4 py-3.5">Materiale</th>
                  <th className="px-4 py-3.5">Preventivo</th>
                  <th className="px-4 py-3.5">Stato</th>
                  <th className="px-4 py-3.5 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      Nessuna richiesta trovata per i filtri selezionati.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="text-blue-400 font-bold block">{q.requestCode}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(q.createdAt).toLocaleDateString('it-IT')}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-white font-semibold block">{q.firstName} {q.lastName}</span>
                        <span className="text-[10px] text-slate-400 block">{q.email}</span>
                        {q.company && (
                          <span className="text-[10px] text-slate-500 block italic">{q.company}</span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-slate-200 block">{q.requestType}</span>
                        <span className="text-[10px] text-slate-400">Q.tà: {q.quantity} pezzi</span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                          {q.material}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {q.quotedPrice ? (
                          <span className="text-emerald-400 font-bold">€{q.quotedPrice.toFixed(2)}</span>
                        ) : (
                          <span className="text-slate-600">Da quotare</span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {getStatusBadge(q.status)}
                      </td>

                      <td className="px-4 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenDetail(q)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 text-xs font-bold transition-all"
                        >
                          Gestisci
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(q.id, q.requestCode)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 text-xs transition-all inline-flex items-center"
                          title="Elimina Definitivamente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* REQUEST DETAIL INSPECTOR MODAL */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-mono font-black text-blue-400">{selectedQuote.requestCode}</span>
                  {getStatusBadge(selectedQuote.status)}
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Richiesta pervenuta il {new Date(selectedQuote.createdAt).toLocaleString('it-IT')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteRequest(selectedQuote.id, selectedQuote.requestCode)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-mono font-bold flex items-center space-x-1 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Elimina</span>
                </button>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* Customer Details & Tech Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Customer Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                <h4 className="text-blue-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <span>ANAGRAFICA CLIENTE</span>
                </h4>
                <div className="space-y-1 text-slate-300">
                  <p><strong className="text-white">Nome:</strong> {selectedQuote.firstName} {selectedQuote.lastName}</p>
                  <p><strong className="text-white">Email:</strong> {selectedQuote.email}</p>
                  <p><strong className="text-white">Telefono:</strong> {selectedQuote.phone}</p>
                  <p><strong className="text-white">Azienda:</strong> {selectedQuote.company || 'Privato'}</p>
                </div>
              </div>

              {/* Specs Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                <h4 className="text-blue-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>PARAMETRI RICHIESTI</span>
                </h4>
                <div className="space-y-1 text-slate-300">
                  <p><strong className="text-white">Tipo Progetto:</strong> {selectedQuote.requestType}</p>
                  <p><strong className="text-white">Quantità:</strong> {selectedQuote.quantity} pezzi</p>
                  <p><strong className="text-white">Materiale:</strong> {selectedQuote.material}</p>
                </div>
              </div>

            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                DESCRIZIONE E REQUISITI CLIENTE
              </h4>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                {selectedQuote.description}
              </div>
            </div>

            {/* File Allegati */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                FILE E GEOMETRIE ALLEGATE ({selectedQuote.files?.length || 0})
              </h4>
              {!selectedQuote.files || selectedQuote.files.length === 0 ? (
                <p className="text-xs font-mono text-slate-500 italic">Nessun file 3D allegato per questa richiesta.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedQuote.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="text-slate-200 truncate">{file.name}</span>
                      </div>
                      <a
                        href={file.publicUrl || '#'}
                        download={file.name}
                        onClick={(e) => {
                          if (file.publicUrl === '#') {
                            e.preventDefault();
                            alert(`Download simulato per il file "${file.name}". In ambiente di produzione Supabase questo link scarica direttamente dall'object storage.`);
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/40 text-[11px] transition-colors shrink-0 flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EDITING WORKFLOW FORM */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-4 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-blue-400" />
                <span>AGGIORNA STATO & VALUTAZIONE PREVENTIVO</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Stato Lavorazione</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as QuoteRequestStatus)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Prezzo Preventivato (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    placeholder="Es. 250.00"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tempi Stimati (giorni)</label>
                  <input
                    type="number"
                    value={editLeadTime}
                    onChange={(e) => setEditLeadTime(e.target.value)}
                    placeholder="Es. 3"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Note Interne Operatore / Comunicazioni</label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Annotazioni per la produzione o messaggio per il cliente..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500 resize-y"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveDetails}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-600/30"
                >
                  SALVA MODIFICHE E NOTIFICA
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
