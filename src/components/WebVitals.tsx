'use client'

import { useEffect } from 'react'

export default function WebVitals() {
  useEffect(() => {
    // Only load web vitals in production and when available
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      import('web-vitals').then((webVitals) => {
        function sendToAnalytics(metric: { name: string; value: number; id: string }) {
          // Log to console in development
          if (process.env.NODE_ENV !== 'production') {
            console.log('Web Vital:', metric)
          }

          // Send to other analytics services
          // Example: Send to Google Analytics 4
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: metric.name,
              value: metric.value,
              non_interaction: true,
            })
          }
        }

        // Measure and send Core Web Vitals
        const vitals = webVitals as any
        if (vitals.getCLS) vitals.getCLS(sendToAnalytics)
        if (vitals.getFID) vitals.getFID(sendToAnalytics)
        if (vitals.getFCP) vitals.getFCP(sendToAnalytics)
        if (vitals.getLCP) vitals.getLCP(sendToAnalytics)
        if (vitals.getTTFB) vitals.getTTFB(sendToAnalytics)
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error)
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}