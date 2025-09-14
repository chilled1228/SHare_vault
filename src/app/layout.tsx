import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

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
  metadataBase: new URL('https://shairvault.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shairvault.com',
    title: 'Shair Vault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives',
    description: 'Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives. Get daily motivation, personal growth insights, and meaningful quotes for every situation.',
    siteName: 'Shair Vault',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
    creator: '@shairvault',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    "url": "https://shairvault.com",
    "logo": "https://shairvault.com/logo.png",
    "sameAs": [
      "https://twitter.com/shairvault",
      "https://instagram.com/shairvault"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@shairvault.com"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shair Vault",
    "url": "https://shairvault.com",
    "description": "Discover inspiring stories, life wisdom, and personal growth insights at Shair Vault.",
    "publisher": {
      "@type": "Organization",
      "name": "Shair Vault"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shairvault.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff3494" />
        <meta name="color-scheme" content="light" />
        
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
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
