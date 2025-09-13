'use client'

import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="flex justify-between items-center py-12 relative">
          
          
          {/* Center - Logo */}
          <h1 className="text-6xl text-center mb-0 absolute left-1/2 transform -translate-x-1/2" style={{fontFamily: 'Anton, sans-serif', color: 'var(--foreground)'}}>
            ShareVault
          </h1>
          
          
        </header>

        {/* Navigation Section */}
        <nav className="border-t-4 pt-4 pb-4" style={{borderColor: 'var(--primary)'}}>
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center space-x-8">
            <div className="relative group">
              <a href="#" className="text-xl flex items-center hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
                QUOTES <ChevronDown className="ml-1 w-4 h-4" />
              </a>
            </div>
            <a href="#" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              SELF-CARE
            </a>
            <a href="#" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              PERSONAL GROWTH
            </a>
            <a href="#" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              PRODUCTIVITY
            </a>
            <a href="#" className="text-xl hover:opacity-80 transition-colors" style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}>
              QUOTE OF THE DAY GENERATOR
            </a>
            
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
                <a 
                  href="#" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  QUOTES
                </a>
                <a 
                  href="#" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  SELF-CARE
                </a>
                <a 
                  href="#" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  PERSONAL GROWTH
                </a>
                <a 
                  href="#" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  PRODUCTIVITY
                </a>
                <a 
                  href="#" 
                  className="text-xl hover:opacity-80 transition-colors"
                  style={{fontFamily: 'Anton, sans-serif', color: 'var(--primary)'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  QUOTE OF THE DAY GENERATOR
                </a>
              </nav>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}