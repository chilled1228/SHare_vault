import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth",
    template: "%s | Shair Vault"
  },
  description: "Discover inspiring stories, life wisdom, and personal growth insights at Shair Vault. Read thought-provoking articles on self-improvement, motivation, and life philosophy.",
  keywords: ["inspiration", "life wisdom", "personal growth", "motivation", "self-improvement", "stories", "philosophy", "mindfulness"],
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
    title: 'Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights at Shair Vault. Read thought-provoking articles on self-improvement, motivation, and life philosophy.',
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
    title: 'Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights at Shair Vault.',
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff3494" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema])
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
