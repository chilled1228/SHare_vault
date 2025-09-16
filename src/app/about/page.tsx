import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCanonicalUrl, getImageUrl, BASE_URL, SITE_EMAIL } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'About Us | ShareVault',
  description: 'Learn about ShareVault - your trusted destination for inspiring quotes, motivational stories, and life wisdom to fuel your personal growth journey.',
  keywords: ['about sharevault', 'inspiration', 'motivation', 'personal growth', 'life wisdom', 'quotes'],
  openGraph: {
    title: 'About Us | ShareVault',
    description: 'Learn about ShareVault - your trusted destination for inspiring quotes, motivational stories, and life wisdom.',
    type: 'website',
    url: getCanonicalUrl('about'),
    images: [
      {
        url: getImageUrl('og-about.jpg'),
        width: 1200,
        height: 630,
        alt: 'About ShareVault - Inspiration & Motivation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | ShareVault',
    description: 'Learn about ShareVault - your trusted destination for inspiring quotes, motivational stories, and life wisdom.',
    images: [getImageUrl('og-about.jpg')],
  },
  alternates: {
    canonical: getCanonicalUrl('about'),
  },
}

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl()
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": getCanonicalUrl('about')
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShareVault",
    "url": BASE_URL,
    "description": "Your trusted destination for inspiring quotes, motivational stories, and life wisdom to fuel your personal growth journey.",
    "sameAs": [
      
      
      
    ],
    "founder": {
      "@type": "Person",
      "name": "ShareVault Team"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%)' }}>
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Anton, sans-serif'}}>
                About ShareVault
              </h1>
              <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
                Empowering lives through wisdom, inspiration, and motivation
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                
                {/* Mission Section */}
                <div 
                  className="rounded-2xl p-8 md:p-12 mb-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                      Our Mission
                    </h2>
                    <p className="text-xl leading-relaxed" style={{color: 'var(--foreground)'}}>
                      At ShareVault, we believe that everyone deserves to live an inspired, motivated, and fulfilling life. 
                      Our mission is to curate and share the most powerful quotes, stories, and wisdom that can transform 
                      perspectives and ignite personal growth.
                    </p>
                  </div>
                </div>

                {/* What We Do Section */}
                <div 
                  className="rounded-2xl p-8 md:p-12 mb-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                    What We Do
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🔥</div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Motivational Content
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Carefully curated motivational quotes and stories to fuel your ambition and drive towards success.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-4">🧠</div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Life Wisdom
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Timeless wisdom and insights from great minds to help you navigate life&apos;s challenges with clarity.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-4">🌱</div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Personal Growth
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Stories and quotes focused on self-improvement, mindset development, and becoming your best self.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-4">✨</div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Daily Inspiration
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Uplifting content to brighten your day and provide the spark needed for creative thinking and positive action.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Our Values Section */}
                <div 
                  className="rounded-2xl p-8 md:p-12 mb-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                    Our Values
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 pl-6" style={{borderColor: 'var(--accent-pink)'}}>
                      <h3 className="text-xl font-bold mb-2" style={{color: 'var(--foreground)'}}>
                        Authenticity
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        We share genuine, meaningful content that resonates with real experiences and emotions.
                      </p>
                    </div>
                    
                    <div className="border-l-4 pl-6" style={{borderColor: 'var(--accent-blue)'}}>
                      <h3 className="text-xl font-bold mb-2" style={{color: 'var(--foreground)'}}>
                        Quality
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Every piece of content is carefully selected and crafted to provide maximum value and impact.
                      </p>
                    </div>
                    
                    <div className="border-l-4 pl-6" style={{borderColor: 'var(--accent-green)'}}>
                      <h3 className="text-xl font-bold mb-2" style={{color: 'var(--foreground)'}}>
                        Community
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        We foster a supportive community where people can find encouragement and share their journeys.
                      </p>
                    </div>
                    
                    <div className="border-l-4 pl-6" style={{borderColor: 'var(--accent-purple)'}}>
                      <h3 className="text-xl font-bold mb-2" style={{color: 'var(--foreground)'}}>
                        Growth
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        We believe in continuous learning and evolution, both for ourselves and our community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div 
                  className="rounded-2xl p-8 md:p-12 shadow-lg text-center"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                    Get in Touch
                  </h2>
                  <p className="text-lg mb-6" style={{color: 'var(--muted-foreground)'}}>
                    Have a question, suggestion, or just want to share your story? We&apos;d love to hear from you.
                  </p>
                  <a 
                    href={`mailto:${SITE_EMAIL}`} 
                    className="inline-block px-8 py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
                    style={{background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-purple) 100%)'}}
                  >
                    Contact Us
                  </a>
                </div>

              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}