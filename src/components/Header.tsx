'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BlogService } from '@/lib/blog-service'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await BlogService.getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Helper function to convert category name to slug
  const categoryToSlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-')
  }

  // Helper function to format category display name
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
  }

  // Helper function to get category emoji
  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'motivation': '🔥',
      'life-wisdom': '🧠',
      'personal-growth': '🌱',
      'inspiration': '✨',
      'success': '🏆',
      'mindset': '💭',
      'happiness': '😊',
      'quotes': '💬'
    }
    return emojiMap[category.toLowerCase()] || '📝'
  }

  // Fallback categories if none loaded from database
  const fallbackCategories = ['motivation', 'life-wisdom', 'personal-growth', 'inspiration']
  const displayCategories = categories.length > 0 ? categories : fallbackCategories

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="flex justify-between items-center py-12 relative">
          
          
          {/* Center - Logo */}
          <Link href="/">
            <div className="text-6xl text-center mb-0 absolute left-1/2 transform -translate-x-1/2 hover:opacity-80 transition-opacity cursor-pointer" style={{fontFamily: 'Anton, sans-serif', color: 'var(--foreground)'}}>
              ShareVault
            </div>
          </Link>
          
          
        </header>

        {/* Navigation Section */}
        <nav className="border-t-4 pt-4 pb-4" style={{borderColor: 'var(--primary)'}}>
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center space-x-8">
            <div className="relative group">
              <Link href="/blog" className="text-xl flex items-center hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
                STORIES <ChevronDown className="ml-1 w-4 h-4" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{backgroundColor: 'var(--card)', border: '1px solid var(--border)'}}>
                <div className="p-2">
                  {displayCategories.map((category) => (
                    <Link 
                      key={category}
                      href={`/category/${categoryToSlug(category)}`} 
                      className="block px-4 py-2 rounded transition-colors hover:opacity-80" 
                      style={{color: 'var(--foreground)', backgroundColor: 'transparent'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {getCategoryEmoji(category)} {formatCategoryName(category)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {displayCategories.slice(0, 4).map((category) => (
              <Link 
                key={category}
                href={`/category/${categoryToSlug(category)}`} 
                className="text-xl hover:opacity-80 transition-colors" 
                style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
              >
                {formatCategoryName(category).toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex justify-center">
            <button
              onClick={toggleMenu}
              className="p-2 transition-colors hover:opacity-80"
              style={{color: 'var(--primary)'}}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t" style={{borderColor: 'var(--primary)'}}>
              <nav className="flex flex-col space-y-4 items-center">
                <Link 
                  href="/blog" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                >
                  ALL STORIES
                </Link>
                {displayCategories.map((category) => (
                  <Link 
                    key={category}
                    href={`/category/${categoryToSlug(category)}`} 
                    className="text-xl hover:opacity-80 transition-colors"
                    style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  >
                    {getCategoryEmoji(category)} {formatCategoryName(category).toUpperCase()}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}