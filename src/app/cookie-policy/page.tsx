import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | ShareVault',
  description: 'Learn how ShareVault uses cookies and similar technologies to enhance your browsing experience. Understand your cookie preferences and options.',
  keywords: ['cookie policy', 'cookies', 'browser cookies', 'tracking technologies', 'privacy preferences'],
  openGraph: {
    title: 'Cookie Policy | ShareVault',
    description: 'Learn how ShareVault uses cookies and similar technologies to enhance your browsing experience.',
    type: 'website',
    url: 'https://shairvault.com/cookie-policy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | ShareVault',
    description: 'Learn how ShareVault uses cookies and similar technologies to enhance your browsing experience.',
  },
  alternates: {
    canonical: 'https://shairvault.com/cookie-policy',
  },
}

export default function CookiePolicyPage() {
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
        "name": "Cookie Policy",
        "item": "https://shairvault.com/cookie-policy"
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
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-center" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
                Cookie Policy
              </h1>
              
              <div className="text-center mb-12" style={{color: 'var(--foreground-muted)'}}>
                <p className="text-sm">Last updated: September 13, 2025</p>
              </div>

              <div className="prose prose-lg max-w-none" style={{color: 'var(--foreground)'}}>
                  <h2>1. What Are Cookies?</h2>
                  <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.</p>

                  <h2>2. How We Use Cookies</h2>
                  <p>ShareVault uses cookies for the following purposes:</p>
                  <ul>
                    <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be disabled in our systems.</li>
                    <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                    <li><strong>Functional Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your preferences.</li>
                    <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
                  </ul>

                  <h2>3. Types of Cookies We Use</h2>
                  <h3>3.1 Essential Cookies</h3>
                  <p>These cookies are essential for the basic functionality of our website. They enable:</p>
                  <ul>
                    <li>Session management and user authentication</li>
                    <li>Security and fraud prevention</li>
                    <li>Basic site functionality</li>
                    <li>Shopping cart functionality (if applicable)</li>
                  </ul>

                  <h3>3.2 Performance Cookies</h3>
                  <p>These cookies collect information about how visitors use our website:</p>
                  <ul>
                    <li>Pages visited and time spent on each page</li>
                    <li>Navigation patterns and user behavior</li>
                    <li>Website performance and loading speed</li>
                    <li>Error reporting and debugging</li>
                  </ul>

                  <h3>3.3 Functional Cookies</h3>
                  <p>These cookies enhance your experience on our website:</p>
                  <ul>
                    <li>Remembering your preferences and settings</li>
                    <li>Customizing content based on your interests</li>
                    <li>Language preferences</li>
                    <li>Font size and display preferences</li>
                  </ul>

                  <h3>3.4 Targeting Cookies</h3>
                  <p>These cookies are used for advertising and marketing purposes:</p>
                  <ul>
                    <li>Delivering relevant advertisements</li>
                    <li>Tracking ad campaign performance</li>
                    <li>Building user interest profiles</li>
                    <li>Personalizing marketing messages</li>
                  </ul>

                  <h2>4. Third-Party Cookies</h2>
                  <p>ShareVault may use third-party services that set their own cookies on your device when you visit our website. These third parties may include:</p>
                  <ul>
                    <li>Analytics providers (e.g., Google Analytics)</li>
                    <li>Social media platforms (e.g., Facebook, Twitter)</li>
                    <li>Advertising networks</li>
                    <li>Content delivery networks</li>
                  </ul>

                  <p>Please note that we have no control over these third-party cookies. You should review the privacy policies of these third parties for more information about their cookie practices.</p>

                  <h2>5. Managing Cookie Preferences</h2>
                  <p>You have several options for managing cookies:</p>
                  
                  <h3>5.1 Browser Settings</h3>
                  <p>Most web browsers allow you to control cookies through their settings. You can typically:</p>
                  <ul>
                    <li>Block all cookies</li>
                    <li>Delete all cookies</li>
                    <li>Block third-party cookies</li>
                    <li>Clear cookies when you close your browser</li>
                    <li>Allow cookies from specific websites</li>
                  </ul>

                  <h3>5.2 Cookie Consent Banner</h3>
                  <p>When you first visit ShareVault, you may see a cookie consent banner that allows you to:</p>
                  <ul>
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your cookie preferences</li>
                    <li>Change your preferences at any time</li>
                  </ul>

                  <h2>6. How to Disable Cookies</h2>
                  <p>The method for disabling cookies varies by browser. Here are general instructions for popular browsers:</p>
                  
                  <h3>6.1 Chrome</h3>
                  <ul>
                    <li>Click on the three dots in the top right corner</li>
                    <li>Go to Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                    <li>Choose your preferred cookie settings</li>
                  </ul>

                  <h3>6.2 Firefox</h3>
                  <ul>
                    <li>Click on the three lines in the top right corner</li>
                    <li>Go to Settings &gt; Privacy & Security</li>
                    <li>Under "Cookies and Site Data," choose your preference</li>
                  </ul>

                  <h3>6.3 Safari</h3>
                  <ul>
                    <li>Click on Safari in the menu bar</li>
                    <li>Go to Preferences &gt; Privacy</li>
                    <li>Choose your cookie settings under "Block all cookies"</li>
                  </ul>

                  <h3>6.4 Edge</h3>
                  <ul>
                    <li>Click on the three dots in the top right corner</li>
                    <li>Go to Settings &gt; Privacy, search, and services</li>
                    <li>Under "Cookies and site permissions," choose your preference</li>
                  </ul>

                  <h2>7. Impact of Disabling Cookies</h2>
                  <p>Please be aware that disabling cookies may affect your experience on ShareVault:</p>
                  <ul>
                    <li>Some features may not work properly</li>
                    <li>You may need to log in more frequently</li>
                    <li>Your preferences may not be saved</li>
                    <li>Some content may not display correctly</li>
                  </ul>

                  <h2>8. Changes to This Cookie Policy</h2>
                  <p>We may update this Cookie Policy from time to time to reflect changes in our use of cookies or changes in relevant laws. The updated policy will be effective immediately upon posting to our website.</p>

                  <h2>9. Links to Other Policies</h2>
                  <p>This Cookie Policy should be read in conjunction with our:</p>
                  <ul>
                    <li><a href="/privacy-policy">Privacy Policy</a> - How we collect and use your personal information</li>
                    <li><a href="/terms-of-service">Terms of Service</a> - The terms governing your use of our website</li>
                  </ul>

                  <h2>10. Contact Information</h2>
                  <p>If you have any questions about this Cookie Policy or our use of cookies, please contact us at:</p>
                  <p>Email: <a href="mailto:hello@shairvault.com">hello@shairvault.com</a></p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}