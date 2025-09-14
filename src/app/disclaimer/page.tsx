import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer | Shair Vault',
  description: 'Read Shair Vault\'s disclaimer regarding the content, accuracy, and usage of information provided on our website. Important legal information for users.',
  keywords: ['disclaimer', 'legal information', 'content accuracy', 'website terms', 'information usage'],
  openGraph: {
    title: 'Disclaimer | Shair Vault',
    description: 'Read Shair Vault\'s disclaimer regarding the content, accuracy, and usage of information provided on our website.',
    type: 'website',
    url: 'https://shairvault.com/disclaimer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | Shair Vault',
    description: 'Read Shair Vault\'s disclaimer regarding the content, accuracy, and usage of information provided on our website.',
  },
  alternates: {
    canonical: 'https://shairvault.com/disclaimer',
  },
}

export default function DisclaimerPage() {
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
        "name": "Disclaimer",
        "item": "https://shairvault.com/disclaimer"
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
                Disclaimer
              </h1>
              <p className="text-xl text-white/80 mb-6">
                Important legal information about our content and services
              </p>
              <div className="text-white/70">
                <p className="text-sm">Last updated: September 14, 2025</p>
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

                    <h2>1. General Information</h2>
                    <p>The information on this website - https://shairvault.com - is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company:</p>
                    <ul>
                      <li>Excludes all representations and warranties relating to this website and its contents</li>
                      <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                    </ul>

                    <h2>2. Content Accuracy</h2>
                    <p>While we strive to provide accurate and up-to-date information, Shair Vault makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content, services, software, text, graphics, and links provided on this website.</p>

                    <h3>2.1 Inspirational Content</h3>
                    <p>The quotes, stories, and motivational content shared on this website are for inspirational and educational purposes only. While we make every effort to verify the accuracy of attributions, some quotes may be misattributed or paraphrased over time.</p>

                    <h3>2.2 Personal Growth Advice</h3>
                    <p>Any advice, tips, or strategies mentioned in our content are based on research and common wisdom but should not be considered as professional counseling, therapy, or medical advice.</p>

                    <h2>3. No Professional Advice</h2>
                    <p>The content on Shair Vault is not intended to be a substitute for professional advice, diagnosis, or treatment. Always seek the advice of qualified professionals with any questions you may have regarding:</p>
                    <ul>
                      <li>Medical or mental health concerns</li>
                      <li>Financial decisions</li>
                      <li>Legal matters</li>
                      <li>Career or business decisions</li>
                    </ul>

                    <h2>4. External Links</h2>
                    <p>Our website may contain links to external websites that are not provided or maintained by Shair Vault. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                    <p>The inclusion of any link does not imply endorsement by Shair Vault of the site. Use of any such linked website is at the user&apos;s own risk.</p>

                    <h2>5. Copyright and Attribution</h2>
                    <p>We make every effort to properly attribute quotes and content to their original authors. However, due to the nature of inspirational content and its widespread sharing across various platforms:</p>
                    <ul>
                      <li>Some attributions may be incorrect or disputed</li>
                      <li>Some quotes may have evolved from their original form</li>
                      <li>Public domain quotes may not always be clearly identified</li>
                    </ul>
                    <p>If you believe any content has been incorrectly attributed or infringes on copyright, please <a href="/contact" style={{color: 'var(--primary)'}}>contact us</a> immediately.</p>

                    <h2>6. User-Generated Content</h2>
                    <p>Shair Vault may allow users to submit quotes, stories, or other content. By submitting content, users represent that:</p>
                    <ul>
                      <li>They have the right to share the content</li>
                      <li>The content does not infringe on any third-party rights</li>
                      <li>The content is accurate to the best of their knowledge</li>
                    </ul>

                    <h2>7. Advertising and Affiliates</h2>
                    <p>This website may contain advertising and affiliate links. Shair Vault may earn commission from purchases made through affiliate links at no additional cost to you. All advertising and affiliate relationships are disclosed in accordance with applicable laws and regulations.</p>

                    <h2>8. Personal Responsibility</h2>
                    <p>Users of this website are encouraged to:</p>
                    <ul>
                      <li>Exercise personal judgment when applying any advice or inspiration</li>
                      <li>Verify information from multiple sources before making important decisions</li>
                      <li>Seek professional advice when appropriate</li>
                      <li>Use the content as motivation and guidance, not absolute truth</li>
                    </ul>

                    <h2>9. Website Availability</h2>
                    <p>Shair Vault makes no warranty that:</p>
                    <ul>
                      <li>The website will be constantly available or available at all</li>
                      <li>The information on this website is complete, true, accurate, or non-misleading</li>
                      <li>The website will be free from errors or viruses</li>
                    </ul>

                    <h2>10. Limitation of Liability</h2>
                    <p>Shair Vault and its owners, employees, agents, and affiliates will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:</p>
                    <ul>
                      <li>Use or inability to use the website</li>
                      <li>Reliance on any information provided on the website</li>
                      <li>Any errors or omissions in the content</li>
                      <li>Any interruption or cessation of transmission to or from the website</li>
                    </ul>

                    <h2>11. Indemnification</h2>
                    <p>By using this website, you agree to indemnify and hold harmless Shair Vault and its affiliates from any claims, damages, losses, or expenses (including legal fees) arising from your use of the website or violation of these terms.</p>

                    <h2>12. Modifications</h2>
                    <p>This disclaimer may be updated from time to time without notice. It is your responsibility to review this page periodically for changes. Continued use of the website after modifications constitutes acceptance of the updated disclaimer.</p>

                    <h2>13. Governing Law</h2>
                    <p>This disclaimer is governed by the laws of the jurisdiction in which Shair Vault operates, without regard to conflict of law principles.</p>

                    <h2>14. Contact Information</h2>
                    <p>If you have any questions about this disclaimer or need clarification on any content, please contact us at:</p>
                    <p>Email: <a href="mailto:hello@shairvault.com" style={{color: 'var(--primary)'}}>hello@shairvault.com</a></p>

                    <div 
                      className="mt-8 p-4 rounded-lg"
                      style={{backgroundColor: 'var(--accent-blue-soft)', color: 'var(--primary)'}}
                    >
                      <p className="text-sm mb-0">
                        <strong>Remember:</strong> The content on Shair Vault is meant to inspire and motivate. Always use your best judgment and seek professional advice when making important life decisions.
                      </p>
                    </div>

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