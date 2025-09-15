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
          '/api/',
          '/private/',
          '/_next/',
          '/draft/',
          '/preview/',
          '/*?draft=*',
          '/*?preview=*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/draft/',
          '/preview/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}