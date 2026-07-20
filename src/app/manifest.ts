import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bedroom Studios',
    short_name: 'Bedroom Studios',
    description: 'Small-batch, essentially handmade desk objects built in India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F9F7',
    theme_color: '#F9F9F7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
