import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | ShareVault',
  description: 'Learn how ShareVault collects, uses, and protects your personal information. Our privacy policy explains our commitment to data privacy and security.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'privacy rights', 'data security'],
  openGraph: {
    title: 'Privacy Policy | ShareVault',
    description: 'Learn how ShareVault collects, uses, and protects your personal information.',
    type: 'website',
    url: 'https://shairvault.com/privacy-policy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ShareVault',
    description: 'Learn how ShareVault collects, uses, and protects your personal information.',
  },
  alternates: {
    canonical: 'https://shairvault.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
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
        "name": "Privacy Policy",
        "item": "https://shairvault.com/privacy-policy"
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
          <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-pink) 100%)' }}>
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Anton, sans-serif'}}>
                Privacy Policy
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Your privacy matters to us
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
                  <h2>1. Information We Collect</h2>
                  <p>At ShareVault, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                  <h3>1.1 Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us, including:</p>
                  <ul>
                    <li>Email address when subscribing to our newsletter</li>
                    <li>Name and contact information when you communicate with us</li>
                    <li>Information provided through contact forms</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3>1.2 Automatically Collected Information</h3>
                  <p>When you visit our website, we may automatically collect certain information, including:</p>
                  <ul>
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring websites and search terms</li>
                  </ul>

                  <h2>2. How We Use Your Information</h2>
                  <p>We use the information we collect for the following purposes:</p>
                  <ul>
                    <li>To provide and maintain our website</li>
                    <li>To send newsletters and updates (with your consent)</li>
                    <li>To respond to your inquiries and communications</li>
                    <li>To improve our website and user experience</li>
                    <li>To analyze usage patterns and website performance</li>
                    <li>To comply with legal obligations</li>
                  </ul>

                  <h2>3. Information Sharing and Disclosure</h2>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                  <ul>
                    <li>To service providers who assist us in operating our website</li>
                    <li>As required by law or legal process</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>

                  <h2>4. Data Security</h2>
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

                  <h2>5. Your Privacy Rights</h2>
                  <p>You have certain rights regarding your personal information, including:</p>
                  <ul>
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to restrict or object to processing</li>
                    <li>The right to data portability</li>
                  </ul>

                  <h2>6. Cookies and Tracking Technologies</h2>
                  <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>

                  <h2>7. Third-Party Links</h2>
                  <p>Our website may contain links to third-party websites. This Privacy Policy applies only to our website, and we are not responsible for the privacy practices of these external sites.</p>

                  <h2>8. Children's Privacy</h2>
                  <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

                  <h2>9. Changes to This Privacy Policy</h2>
                  <p>We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last Updated" date and will take effect immediately upon posting.</p>

                  <h2>10. Contact Information</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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