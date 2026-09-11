'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Wrench, 
  RefreshCw, 
  Boxes, 
  Sliders, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Factory, 
  User, 
  FileText, 
  Sparkles,
  ChevronRight,
  Truck,
  Ticket,
  Zap,
  Activity
} from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'PROGETTAZIONE CAD',
    desc: 'Trasformiamo idee, schizzi, foto o componenti esistenti in modelli 3D professionali pronti per la produzione.',
    href: '/servizi#cad',
    icon: Cpu,
  },
  {
    num: '02',
    title: 'STAMPA 3D',
    desc: 'Produzione di componenti funzionali, prototipi, supporti e prodotti personalizzati ad elevata precisione.',
    href: '/servizi#stampa3d',
    icon: Layers,
  },
  {
    num: '03',
    title: 'PROTOTIPAZIONE',
    desc: 'Dal primo concept al prototipo fisico per verificare forma, dimensioni e funzionalità con ciclo iterativo rapido.',
    href: '/prototipazione',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'RICAMBI SU MISURA',
    desc: 'Ricostruzione e produzione di componenti non più disponibili sul mercato o difficili da reperire.',
    href: '/servizi#ricambi',
    icon: RefreshCw,
  },
  {
    num: '05',
    title: 'PICCOLE SERIE',
    desc: 'Produzione di più pezzi identici senza la necessità o i costi di investimento dei grandi quantitativi.',
    href: '/servizi#piccole-serie',
    icon: Boxes,
  },
  {
    num: '06',
    title: 'PRODOTTI PERSONALIZZATI',
    desc: 'Realizzazione di oggetti e componenti su misura progettati e calibrati sulle esigenze specifiche del cliente.',
    href: '/prodotti',
    icon: Sliders,
  },
];

const INDUSTRIAL_TAGS = [
  'Staffe', 'Supporti', 'Carter', 'Gusci', 'Distanziali', 
  'Guide', 'Dime', 'Maschere', 'Attrezzature', 'Componenti funzionali', 
  'Ricambi', 'Prototipi', 'Componenti personalizzati'
];

const PRIVATE_TAGS = [
  'Organizer', 'Supporti', 'Accessori', 'Componenti personalizzati', 
  'Pezzi di ricambio', 'Oggetti su misura', 'Piccoli prodotti', 'Modifiche a prodotti esistenti'
];

const TIMELINE_STEPS = [
  {
    num: '01',
    title: 'INVIACI IL PROGETTO',
    desc: 'Carica i tuoi file STL, STEP, STP, OBJ, 3MF, PDF, immagini oppure semplicemente descrivi la tua idea.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'ANALIZZIAMO IL PROGETTO',
    desc: 'I nostri ingegneri verificano la geometria 3D, le dimensioni, le tolleranze, il materiale ed la fattibilità tecnica.',
    icon: Cpu,
  },
  {
    num: '03',
    title: 'PREVENTIVO CHIARO',
    desc: 'Ricevi una proposta dettagliata con prezzo trasparente e tempi di consegna stimati.',
    icon: Award,
  },
  {
    num: '04',
    title: 'PRODUZIONE DIGITALE',
    desc: 'Realizziamo il componente utilizzando le migliori tecnologie addittive e materiali ad alte prestazioni.',
    icon: Factory,
  },
  {
    num: '05',
    title: 'CONTROLLO & CONSEGNA',
    desc: 'Il pezzo subisce il controllo dimensionale, viene preparato e consegnato direttamente presso la tua sede.',
    icon: Truck,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 space-y-24 sm:space-y-32">
        
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 overflow-hidden bg-tech-grid bg-radial-glow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>HUB DI INGEGNERIA & PRODUZIONE DIGITALE</span>
                </div>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-mono tracking-tight text-white leading-[1.05]">
                  DAL MODELLO 3D<br />
                  <span className="text-gradient-blue">AL PEZZO REALE.</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                  Progettiamo, prototipiamo e produciamo componenti su misura per industria, professionisti e privati con tolleranze millesimali e materiali avanzati.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/preventivo"
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30 border border-blue-400/40 flex items-center justify-center space-x-3 active:scale-95"
                  >
                    <span>Richiedi un preventivo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/ticket"
                    className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 font-mono font-bold text-xs uppercase tracking-wider transition-all border border-blue-500/30 flex items-center justify-center space-x-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Consulta ticket</span>
                  </Link>
                </div>

                {/* Micro Badges */}
                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Tolleranza ±0.05mm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>File 3D Protetti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Factory className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Produzione Marche</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek Technical Engineering Showcase Box */}
              <div className="lg:col-span-5 relative">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
                  
                  {/* Top HUD badge */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <strong className="text-white">ZeroLimit LAB // SPECS</strong>
                    </div>
                    <span className="text-blue-400 font-semibold">PA12-CF / PETG / ASA</span>
                  </div>

                  {/* Feature Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">PRECISIONE NOMINALE</span>
                      <span className="text-xl font-mono font-black text-white">±0.05 mm</span>
                      <span className="text-[10px] text-emerald-400 font-mono block">Controllo Metrologico</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">RESISTENZA TERMICA</span>
                      <span className="text-xl font-mono font-black text-amber-400">fino a 155°C</span>
                      <span className="text-[10px] text-slate-400 font-mono block">Nylon Carbon PA12</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">PROTOTIPAZIONE</span>
                      <span className="text-xl font-mono font-black text-blue-400">24-48 Ore</span>
                      <span className="text-[10px] text-slate-400 font-mono block">Consegna Rapida</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">SERIE & PROTOTIPI</span>
                      <span className="text-xl font-mono font-black text-purple-400">1 - 500 Pz</span>
                      <span className="text-[10px] text-slate-400 font-mono block">Senza Costi Stampo</span>
                    </div>
                  </div>

                  {/* Fast Ticket Consultation Box */}
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase flex items-center space-x-1.5">
                        <Ticket className="w-4 h-4 text-blue-400" />
                        <span>Hai già inviato una richiesta?</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Controlla lo stato di lavorazione ed il prezzo del tuo preventivo inserendo il codice del ticket.
                    </p>
                    <Link
                      href="/ticket"
                      className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-blue-400 hover:text-blue-300 pt-1"
                    >
                      <span>VAI AL PORTALE TRACCIAMENTO TICKET</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SEZIONE NUMERI & VALORI */}
        <section className="border-y border-slate-800/80 bg-slate-950/80 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
                METODOLOGIA INTEGRATA
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-mono text-white tracking-wider mt-1">
                PROGETTAZIONE → PROTOTIPO → PRODUZIONE
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Progettazione CAD', desc: 'Modellazione 3D da zero o reverse engineering' },
                { num: '02', title: 'Prototipazione rapida', desc: 'Validazione di forma, fit e funzione in 24h' },
                { num: '03', title: 'Produzione su misura', desc: 'Componenti ad alta resistenza meccanica' },
                { num: '04', title: 'Piccole serie', desc: 'Lotti da 10 a 500 pezzi senza costi di stampo' },
              ].map((val) => (
                <div
                  key={val.num}
                  className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2 relative group hover:border-blue-500/40 transition-all"
                >
                  <span className="text-3xl font-black font-mono text-blue-500/40 group-hover:text-blue-400 transition-colors">
                    {val.num}
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SEZIONE SERVIZI */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
                CAPABILITÀ TECNICHE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight mt-1">
                SOLUZIONI PER OGNI ESIGENZA
              </h2>
            </div>
            <Link
              href="/servizi"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 font-bold flex items-center space-x-1"
            >
              <span>MOSTRA TUTTI I SERVIZI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.num}
                  className="glass-panel p-8 rounded-2xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                        {srv.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 flex items-center justify-center transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-mono text-white group-hover:text-blue-400 transition-colors">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <Link
                    href={srv.href}
                    className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-slate-300 group-hover:text-blue-400 transition-colors"
                  >
                    <span>Scopri di più</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>


        {/* SEZIONE INDUSTRIALE B2B */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-16 border-y border-slate-800/80 bg-radial-industrial">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
                  <Factory className="w-4 h-4" />
                  <span>B2B & MANUFATTURIERO</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight">
                  SOLUZIONI PER L&apos;INDUSTRIA
                </h2>

                <p className="text-base text-slate-300 leading-relaxed">
                  Produciamo componenti tecnici e funzionali pensati per risolvere esigenze reali di produzione, manutenzione e progettazione con tempi di risposta immediati.
                </p>

                {/* Industrial Tags Cloud */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {INDUSTRIAL_TAGS.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs font-medium hover:border-amber-500/40 hover:text-amber-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/preventivo?type=Industriale"
                    className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/20"
                  >
                    <span>Hai un componente industriale da realizzare?</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Industrial Card Box */}
              <div className="lg:col-span-5 glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-lg font-mono font-bold text-white border-b border-slate-800 pb-3">
                  PERCHÉ LE AZIENDE SCELGONO ZEROLIMIT LAB
                </h3>
                <ul className="space-y-4 text-xs font-mono text-slate-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Nessun costo fisso di attrezzaggio o matrice di stampaggio.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Materiali tecnici certificati (PA12 Carbon, PETG, ASA UV-Guard).</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Reverse engineering per ricambi ed ingranaggi introvabili.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Consegna rapida per fermi macchina e linee automatiche.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>


        {/* SEZIONE PRIVATI */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase">
                <User className="w-4 h-4" />
                <span>PRIVATI & MAKER PRO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                ANCHE PER PROGETTI PERSONALI
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Non soltanto grandi aziende: realizziamo pezzi unici, modifiche a prodotti esistenti e componenti personalizzati per appassionati, professionisti e privati.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {PRIVATE_TAGS.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 text-left lg:text-right space-y-4">
              <span className="text-xs font-mono text-slate-400 block">
                Hai un schizzo o un pezzo rotto da ricostruire?
              </span>
              <Link
                href="/preventivo"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30"
              >
                <span>Raccontaci il tuo progetto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>


        {/* SEZIONE "COME FUNZIONA" (5 TIMELINE STEPS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
              WORKFLOW SEMPLICE E TRASPARENTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              COME FUNZIONA IN 5 PASSAGGI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {TIMELINE_STEPS.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.num}
                  className="glass-panel p-6 rounded-2xl border border-slate-800 relative space-y-4 flex flex-col justify-between group hover:border-blue-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-blue-500/40 group-hover:text-blue-400 transition-colors">
                        {step.num}
                      </span>
                      <IconComponent className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </div>

                    <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                      {step.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SEZIONE PREVENTIVO FORM */}
        <section id="preventivo-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
