import { MetadataRoute } from 'next'
import { getCanonicalUrl } from '@/lib/seo-utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
