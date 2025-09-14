import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | ShareVault',
  description: 'Read ShareVault\'s Terms of Service that govern your use of our website and services. Understand your rights and responsibilities.',
  keywords: ['terms of service', 'terms and conditions', 'website terms', 'user agreement', 'legal terms'],
  openGraph: {
    title: 'Terms of Service | ShareVault',
    description: 'Read ShareVault\'s Terms of Service that govern your use of our website and services.',
    type: 'website',
    url: 'https://shairvault.com/terms-of-service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ShareVault',
    description: 'Read ShareVault\'s Terms of Service that govern your use of our website and services.',
  },
  alternates: {
    canonical: 'https://shairvault.com/terms-of-service',
  },
}

export default function TermsOfServicePage() {
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
        "name": "Terms of Service",
        "item": "https://shairvault.com/terms-of-service"
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
          <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)' }}>
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Anton, sans-serif'}}>
                Terms of Service
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Clear guidelines for using our service
              </p>
              <div className="text-white/70">
                <p className="text-sm">Last updated: September 13, 2025</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="rounded-2xl p-8 md:p-12 shadow-lg"
                  style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <div className="prose prose-lg max-w-none" style={{color: 'var(--foreground)'}}>
                  <h2>1. Acceptance of Terms</h2>
                  <p>By accessing and using ShareVault's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

                  <h2>2. Website Usage</h2>
                  <p>ShareVault provides a platform for sharing and discovering inspiring stories, life wisdom, and personal growth content. By using our website, you agree to:</p>
                  <ul>
                    <li>Use the website for lawful purposes only</li>
                    <li>Respect the intellectual property rights of others</li>
                    <li>Not engage in activities that disrupt our services</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>

                  <h2>3. Content and Intellectual Property</h2>
                  <h3>3.1 Our Content</h3>
                  <p>All content on ShareVault, including but not limited to articles, images, graphics, and design elements, is owned by or licensed to ShareVault and is protected by copyright, trademark, and other intellectual property laws.</p>

                  <h3>3.2 User Content</h3>
                  <p>By submitting content to ShareVault, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your content on our platform.</p>

                  <h3>3.3 Content Restrictions</h3>
                  <p>You agree not to post content that:</p>
                  <ul>
                    <li>Is illegal, harmful, or offensive</li>
                    <li>Infringes on others' intellectual property rights</li>
                    <li>Contains spam or false information</li>
                    <li>Violates any applicable laws</li>
                  </ul>

                  <h2>4. User Accounts</h2>
                  <p>If you create an account on ShareVault, you are responsible for:</p>
                  <ul>
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate and complete information</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>

                  <h2>5. User Conduct</h2>
                  <p>When using ShareVault, you agree not to:</p>
                  <ul>
                    <li>Harass, abuse, or intimidate other users</li>
                    <li>Post false or misleading information</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with the proper functioning of our website</li>
                    <li>Collect or store personal data about other users</li>
                  </ul>

                  <h2>6. Disclaimers</h2>
                  <p>ShareVault provides content "as is" and makes no warranties, express or implied, regarding:</p>
                  <ul>
                    <li>The accuracy, reliability, or completeness of our content</li>
                    <li>The availability or functionality of our website</li>
                    <li>That our services will be uninterrupted or error-free</li>
                    <li>That any defects will be corrected</li>
                  </ul>

                  <h2>7. Limitation of Liability</h2>
                  <p>To the fullest extent permitted by law, ShareVault shall not be liable for:</p>
                  <ul>
                    <li>Any indirect, incidental, special, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Any damages arising from your use of our services</li>
                    <li>Any third-party content or websites linked from our site</li>
                  </ul>

                  <h2>8. Indemnification</h2>
                  <p>You agree to indemnify and hold harmless ShareVault, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:</p>
                  <ul>
                    <li>Your use of our website</li>
                    <li>Your violation of these terms</li>
                    <li>Your infringement of third-party rights</li>
                    <li>Your violation of applicable laws</li>
                  </ul>

                  <h2>9. Privacy Policy</h2>
                  <p>Your use of ShareVault is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.</p>

                  <h2>10. Third-Party Links</h2>
                  <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites.</p>

                  <h2>11. Modifications to Terms</h2>
                  <p>We reserve the right to modify these Terms of Service at any time. The updated terms will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified terms.</p>

                  <h2>12. Termination</h2>
                  <p>We reserve the right to suspend or terminate your access to ShareVault at any time, with or without notice, for any reason, including violation of these terms.</p>

                  <h2>13. Governing Law</h2>
                  <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ShareVault operates, without regard to its conflict of law principles.</p>

                  <h2>14. Dispute Resolution</h2>
                  <p>Any disputes arising from these terms or your use of ShareVault shall be resolved through good faith negotiations. If resolution cannot be reached, the dispute shall be resolved through binding arbitration.</p>

                  <h2>15. Severability</h2>
                  <p>If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>

                  <h2>16. Entire Agreement</h2>
                  <p>These Terms of Service constitute the entire agreement between you and ShareVault regarding your use of our website and services, superseding all prior agreements and understandings.</p>

                  <h2>17. Contact Information</h2>
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <p>Email: <a href="mailto:hello@shairvault.com" style={{color: 'var(--primary)'}}>hello@shairvault.com</a></p>
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