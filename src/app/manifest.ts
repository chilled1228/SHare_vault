import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth',
    short_name: 'Shair Vault',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f7',
    theme_color: '#ff3494',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['lifestyle', 'education', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}