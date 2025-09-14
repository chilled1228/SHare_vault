'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    // Register service worker only in production
    if (
      process.env.NODE_ENV === 'production' &&
      'serviceWorker' in navigator &&
      typeof window !== 'undefined'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                    console.log('New content available, please refresh.')
                  }
                }
              })
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return null
}