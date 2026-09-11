import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ZeroLimit Lab — Dal Modello 3D al Pezzo Reale | Progettazione, Prototipazione, Produzione',
    template: '%s | ZeroLimit Lab',
  },
  description:
    'ZeroLimit Lab è l’hub tecnologico italiano specializzato in Progettazione CAD 3D, stampa 3D professionale, prototipazione rapida e produzione di componenti su misura a Pesaro, Marche.',
  keywords: [
    'stampa 3D',
    'stampa 3D professionale',
    'stampa 3D industriale',
    'progettazione CAD',
    'prototipazione 3D',
    'prototipi industriali',
    'ricambi 3D',
    'componenti personalizzati',
    'produzione piccole serie',
    'stampa 3D Pesaro',
    'stampa 3D Marche',
    'progettazione meccanica Pesaro',
  ],
  authors: [{ name: 'ZeroLimit Lab' }],
  creator: 'ZeroLimit Lab',
  openGraph: {
    title: 'ZeroLimit Lab — Dal Modello 3D al Pezzo Reale',
    description:
      'Progettiamo, prototipiamo e produciamo componenti su misura per industria, professionisti e privati.',
    url: 'https://www.zerolimitlab.it',
    siteName: 'ZeroLimit Lab',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroLimit Lab — Engineering & Digital Manufacturing',
    description: 'Dal modello 3D al pezzo reale.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ZeroLimit Lab',
  image: 'https://www.zerolimitlab.it/og-image.png',
  '@id': 'https://www.zerolimitlab.it',
  url: 'https://www.zerolimitlab.it',
  telephone: '+390721123456',
  email: 'info@zerolimitlab.it',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: "Via dell'Industria",
    addressLocality: 'Pesaro',
    addressRegion: 'PU',
    postalCode: '61121',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.9124,
    longitude: 12.9155,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '18:30',
  },
  sameAs: [
    'https://instagram.com',
    'https://linkedin.com',
    'https://facebook.com',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#07090E] text-slate-100 antialiased font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
