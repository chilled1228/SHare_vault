import { Mail, Twitter, Github, Linkedin, Rss } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-light-neutral text-primary-text border-t border-primary-text/10">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-primary-text">ShareVault</h3>
              <p className="text-secondary-text mb-6 max-w-md">
                Your go-to destination for insightful articles on web development, design, and technology. 
                Join our community of passionate developers and designers.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-2 bg-warm-orange/20 text-warm-orange hover:bg-warm-orange/30 rounded-lg transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-warm-orange/20 text-warm-orange hover:bg-warm-orange/30 rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-warm-orange/20 text-warm-orange hover:bg-warm-orange/30 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-warm-orange/20 text-warm-orange hover:bg-warm-orange/30 rounded-lg transition-colors"
                  aria-label="RSS Feed"
                >
                  <Rss className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-primary-text">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    All Posts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4 text-primary-text">Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    React
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    TypeScript
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-text hover:text-bold-red-orange transition-colors">
                    Performance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-primary-text/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-primary-text">Stay Updated</h4>
              <p className="text-secondary-text text-sm">
                Subscribe to our newsletter for the latest articles and updates.
              </p>
            </div>
            <div className="flex-1 md:max-w-md">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/80 border border-primary-text/20 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-transparent text-primary-text placeholder-secondary-text"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-text" />
                </div>
                <button className="btn bg-bold-red-orange text-white px-6 py-3 whitespace-nowrap hover:bg-opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-text/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-secondary-text text-sm">
            © 2023 ShareVault. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-secondary-text hover:text-bold-red-orange text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-text hover:text-bold-red-orange text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-text hover:text-bold-red-orange text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}