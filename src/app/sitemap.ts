import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zerolimitlab.it';

  const routes = [
    '',
    '/servizi',
    '/industriale',
    '/prototipazione',
    '/prodotti',
    '/portfolio',
    '/materiali',
    '/chi-siamo',
    '/contatti',
    '/preventivo',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
