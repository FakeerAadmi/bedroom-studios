import { MetadataRoute } from 'next';
import { productCategories, fandomCollections } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bedroomstudios.vercel.app';

  // Static routes
  const staticRoutes = [
    '',
    '/shop',
    '/fandoms',
    '/commissions',
    '/about',
    '/track',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Standard Product Routes
  const standardProductRoutes = productCategories.flatMap((category) =>
    category.products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // Fandom Product Routes
  const fandomProductRoutes = fandomCollections.flatMap((collection) =>
    collection.products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // Info pages routes
  const infoRoutes = [
    '/shipping',
    '/returns',
    '/faq',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...standardProductRoutes, ...fandomProductRoutes, ...infoRoutes];
}
