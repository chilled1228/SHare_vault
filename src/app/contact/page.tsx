import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us | Shair Vault',
  description: 'Get in touch with Shair Vault. We love hearing from our community and are always here to help with questions, suggestions, or collaborations.',
  keywords: ['contact shair vault', 'get in touch', 'feedback', 'collaboration', 'support'],
  openGraph: {
    title: 'Contact Us | Shair Vault',
    description: 'Get in touch with Shair Vault. We love hearing from our community and are always here to help.',
    type: 'website',
    url: 'https://shairvault.com/contact',
    images: [
      {
        url: 'https://shairvault.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Shair Vault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Shair Vault',
    description: 'Get in touch with Shair Vault. We love hearing from our community and are always here to help.',
    images: ['https://shairvault.com/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://shairvault.com/contact',
  },
}

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://shairvault.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://shairvault.com/contact"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-purple) 100%)' }}>
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Anton, sans-serif'}}>
                Contact Us
              </h1>
              <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
                We&apos;d love to hear from you! Reach out with questions, suggestions, or just to say hello.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                
                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  
                  {/* Email */}
                  <div 
                    className="rounded-2xl p-8 shadow-lg text-center"
                    style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  >
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                      Email Us
                    </h3>
                    <p className="mb-6" style={{color: 'var(--muted-foreground)'}}>
                      For general inquiries, feedback, or collaboration opportunities
                    </p>
                    <a 
                      href="mailto:hello@shairvault.com" 
                      className="inline-block px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                      style={{backgroundColor: 'var(--accent-blue-soft)', color: 'var(--primary)'}}
                    >
                      hello@shairvault.com
                    </a>
                  </div>

                  {/* Social Media */}
                  <div 
                    className="rounded-2xl p-8 shadow-lg text-center"
                    style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  >
                    <div className="text-4xl mb-4">🌐</div>
                    <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                      Follow Us
                    </h3>
                    <p className="mb-6" style={{color: 'var(--muted-foreground)'}}>
                      Stay connected and join our growing community
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a 
                        href="https://twitter.com/shairvault" 
                        className="p-3 rounded-lg transition-colors hover:scale-110"
                        style={{backgroundColor: 'var(--accent-blue-soft)', color: 'var(--primary)'}}
                        aria-label="Twitter"
                      >
                        🐦
                      </a>
                      <a 
                        href="https://linkedin.com/company/shairvault" 
                        className="p-3 rounded-lg transition-colors hover:scale-110"
                        style={{backgroundColor: 'var(--accent-green-soft)', color: 'var(--primary)'}}
                        aria-label="LinkedIn"
                      >
                        💼
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div 
                  className="rounded-2xl p-8 md:p-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                    Send Us a Message
                  </h2>
                  
                  <form className="max-w-2xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-lg transition-colors focus:ring-2"
                          style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)'
                          }}
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg transition-colors focus:ring-2"
                          style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)'
                          }}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-lg transition-colors focus:ring-2"
                        style={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
                        }}
                        placeholder="What is this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg transition-colors focus:ring-2 resize-vertical"
                        style={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
                        }}
                        placeholder="Tell us what's on your mind..."
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button 
                        type="submit"
                        className="px-8 py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
                        style={{background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-purple) 100%)'}}
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>

                {/* FAQ Section */}
                <div 
                  className="rounded-2xl p-8 md:p-12 mt-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                    Frequently Asked Questions
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Can I submit my own quotes or stories?
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Absolutely! We love featuring original content from our community. Please email us your submissions 
                        with proper attribution, and we&apos;ll review them for publication.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        How often do you publish new content?
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        We publish new inspirational content regularly throughout the week. Subscribe to our newsletter 
                        to stay updated with our latest posts and never miss daily inspiration.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Can I use your quotes for my own projects?
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Many of our quotes are from public domain sources or well-known figures. For specific usage rights, 
                        please contact us with details about your intended use, and we&apos;ll be happy to help clarify permissions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{color: 'var(--foreground)'}}>
                        Do you offer collaboration opportunities?
                      </h3>
                      <p style={{color: 'var(--muted-foreground)'}}>
                        Yes! We&apos;re always open to collaborating with like-minded creators, authors, and brands that share 
                        our passion for inspiration and personal growth. Reach out to discuss partnership opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time Notice */}
                <div className="text-center mt-12">
                  <div 
                    className="inline-block px-6 py-3 rounded-lg"
                    style={{backgroundColor: 'var(--accent-green-soft)', color: 'var(--primary)'}}
                  >
                    <p className="text-sm">
                      ⏰ We typically respond within 24-48 hours during business days
                    </p>
                  </div>
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