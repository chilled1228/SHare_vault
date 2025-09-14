'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="flex justify-between items-center py-12 relative">
          
          
          {/* Center - Logo */}
          <Link href="/">
            <h1 className="text-6xl text-center mb-0 absolute left-1/2 transform -translate-x-1/2 hover:opacity-80 transition-opacity cursor-pointer" style={{fontFamily: 'Anton, sans-serif', color: 'var(--foreground)'}}>
              ShareVault
            </h1>
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
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{backgroundColor: 'var(--card)', border: '1px solid var(--border)'}}>
                <div className="p-2">
                  <Link href="/category/motivation" className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors" style={{color: 'var(--foreground)'}}>
                    🔥 Motivation
                  </Link>
                  <Link href="/category/life-wisdom" className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors" style={{color: 'var(--foreground)'}}>
                    🧠 Life Wisdom
                  </Link>
                  <Link href="/category/personal-growth" className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors" style={{color: 'var(--foreground)'}}>
                    🌱 Personal Growth
                  </Link>
                  <Link href="/category/inspiration" className="block px-4 py-2 rounded hover:bg-gray-50 transition-colors" style={{color: 'var(--foreground)'}}>
                    ✨ Inspiration
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/category/motivation" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              MOTIVATION
            </Link>
            <Link href="/category/life-wisdom" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              LIFE WISDOM
            </Link>
            <Link href="/category/personal-growth" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              PERSONAL GROWTH
            </Link>
            <Link href="/category/inspiration" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              INSPIRATION
            </Link>
                        
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
                <Link 
                  href="/category/motivation" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                >
                  🔥 MOTIVATION
                </Link>
                <Link 
                  href="/category/life-wisdom" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                >
                  🧠 LIFE WISDOM
                </Link>
                <Link 
                  href="/category/personal-growth" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                >
                  🌱 PERSONAL GROWTH
                </Link>
                <Link 
                  href="/category/inspiration" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                >
                  ✨ INSPIRATION
                </Link>
                              </nav>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}