import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShareVault - Inspiring Stories, Life Wisdom & Personal Growth',
    short_name: 'ShareVault',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f7',
    theme_color: '#ff3494',
    icons: [
      {
        src: '/logo.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['lifestyle', 'education', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}