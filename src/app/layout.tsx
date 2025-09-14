import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BASE_URL, SITE_EMAIL, getCanonicalUrl, getRobotsMeta, getImageUrl } from "@/lib/seo-utils";
import ClientProviders from "@/components/ClientProviders";
import WebVitals from "@/components/WebVitals";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Shair Vault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives",
    template: "%s | Shair Vault"
  },
  description: "Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives. Get daily motivation, personal growth insights, and meaningful quotes for every situation.",
  keywords: ["inspiring quotes", "life wisdom quotes", "motivational stories", "personal growth", "daily inspiration", "meaningful quotes", "life philosophy", "wisdom stories", "inspirational content", "uplifting quotes"],
  authors: [{ name: "Shair Vault Team" }],
  creator: "Shair Vault",
  publisher: "Shair Vault",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: getCanonicalUrl(),
    languages: {
      'en-US': getCanonicalUrl(),
      'en-GB': getCanonicalUrl('en-GB'),
      'en-CA': getCanonicalUrl('en-CA'),
      'en-AU': getCanonicalUrl('en-AU'),
    },
  },
  robots: getRobotsMeta('/'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getCanonicalUrl(),
    title: 'Shair Vault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives',
    description: 'Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives. Get daily motivation, personal growth insights, and meaningful quotes for every situation.',
    siteName: 'Shair Vault',
    images: [
      {
        url: getImageUrl('og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Shair Vault - Inspiring Stories and Life Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shair Vault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives',
    description: 'Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives.',
    images: [getImageUrl('og-image.jpg')],
    creator: '@shairvault',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shair Vault",
    "url": getCanonicalUrl(),
    "logo": getImageUrl('logo.png'),
    "sameAs": [
      "https://twitter.com/shairvault",
      "https://instagram.com/shairvault"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": SITE_EMAIL
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shair Vault",
    "url": getCanonicalUrl(),
    "description": "Discover inspiring stories, life wisdom, and personal growth insights at Shair Vault.",
    "publisher": {
      "@type": "Organization",
      "name": "Shair Vault"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${getCanonicalUrl('search')}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff3494" />
        <meta name="color-scheme" content="light" />
        
        {/* Internationalization and hreflang tags */}
        <link rel="alternate" hrefLang="en-US" href={getCanonicalUrl()} />
        <link rel="alternate" hrefLang="en-GB" href={getCanonicalUrl('en-GB')} />
        <link rel="alternate" hrefLang="en-CA" href={getCanonicalUrl('en-CA')} />
        <link rel="alternate" hrefLang="en-AU" href={getCanonicalUrl('en-AU')} />
        <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl()} />
        
        {/* Critical resource preloading */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://firebase.googleapis.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
