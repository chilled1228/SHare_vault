import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BASE_URL, SITE_EMAIL, getCanonicalUrl, getRobotsMeta, getImageUrl } from "@/lib/seo-utils";
import ClientProviders from "@/components/ClientProviders";
import WebVitals from "@/components/WebVitals";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "ShareVault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives",
    template: "%s | ShareVault"
  },
  description: "Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives. Get daily motivation, personal growth insights, and meaningful quotes for every situation.",
  keywords: ["inspiring quotes", "life wisdom quotes", "motivational stories", "personal growth", "daily inspiration", "meaningful quotes", "life philosophy", "wisdom stories", "inspirational content", "uplifting quotes"],
  authors: [{ name: "ShareVault Team" }],
  creator: "ShareVault",
  publisher: "ShareVault",
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
    title: 'ShareVault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives',
    description: 'Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives. Get daily motivation, personal growth insights, and meaningful quotes for every situation.',
    siteName: 'ShareVault',
    images: [
      {
        url: getImageUrl('og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'ShareVault - Inspiring Stories and Life Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareVault - 1000+ Inspiring Stories & Life Wisdom Quotes That Transform Lives',
    description: 'Discover 1000+ inspiring stories, powerful quotes, and life wisdom that transforms lives.',
    images: [getImageUrl('og-image.jpg')],
    creator: '@sharevault',
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
    "name": "ShareVault",
    "url": getCanonicalUrl(),
    "logo": getImageUrl('logo.svg'),
    "sameAs": [
      "https://twitter.com/sharevault",
      "https://instagram.com/sharevault"
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
    "name": "ShareVault",
    "url": getCanonicalUrl(),
    "description": "Discover inspiring stories, life wisdom, and personal growth insights at ShareVault.",
    "publisher": {
      "@type": "Organization",
      "name": "ShareVault"
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
        <meta name="p:domain_verify" content="71bd64919a32b7a70a990f19faaa7719" />
        
        {/* Internationalization and hreflang tags */}
        <link rel="alternate" hrefLang="en-US" href={getCanonicalUrl()} />
        <link rel="alternate" hrefLang="en-GB" href={getCanonicalUrl('en-GB')} />
        <link rel="alternate" hrefLang="en-CA" href={getCanonicalUrl('en-CA')} />
        <link rel="alternate" hrefLang="en-AU" href={getCanonicalUrl('en-AU')} />
        <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl()} />
        
        {/* Critical resource preloading */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://firebase.googleapis.com" />
        <link rel="preconnect" href="https://shair-vault.firebaseapp.com" />
        
        {/* Preload critical CSS and fonts */}
        
        {/* Optimize CSS loading */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        {/* Inline minimal critical styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Crimson Text';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400&display=swap);
              }
              body { 
                background: #faf9f7; 
                font-family: "Crimson Text", serif; 
                font-display: swap;
              }
              .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
              @media (min-width: 768px) { .container { padding: 0 2rem; } }
              .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            `,
          }}
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preload Google Fonts for LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
