'use client'

import { useEffect } from 'react'

export default function WebVitals() {
  useEffect(() => {
    // Load web vitals in both development and production for monitoring
    if (typeof window !== 'undefined') {
      import('web-vitals').then((webVitals) => {
        function sendToAnalytics(metric: { 
          name: string; 
          value: number; 
          id: string; 
          delta: number;
          entries: any[];
        }) {
          // Log to console in development
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[Web Vitals] ${metric.name}:`, {
              value: metric.value,
              delta: metric.delta,
              id: metric.id,
              entries: metric.entries
            })
          }

          // Performance monitoring and optimization suggestions
          providePerformanceRecommendations(metric)

          // Send to analytics services
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', metric.name, {
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
              event_category: 'Web Vitals',
              non_interaction: true,
            })
          }

          // Send to custom analytics endpoint
          if (process.env.NODE_ENV === 'production') {
            sendToCustomAnalytics(metric)
          }
        }

        function providePerformanceRecommendations(metric: any) {
          const recommendations: Record<string, string[]> = {
            LCP: [
              'Optimize hero images and above-the-fold content',
              'Reduce server response times',
              'Eliminate render-blocking resources',
              'Use CDN for static assets'
            ],
            FID: [
              'Reduce JavaScript execution time',
              'Break up long tasks',
              'Use web workers for heavy computations'
            ],
            CLS: [
              'Include size attributes for images and videos',
              'Avoid dynamically injected content above existing content',
              'Use CSS aspect-ratio for media containers'
            ],
            TTFB: [
              'Optimize server performance',
              'Use CDN and caching',
              'Reduce backend processing time'
            ],
            INP: [
              'Reduce JavaScript execution time',
              'Avoid long tasks',
              'Optimize event handlers'
            ]
          }

          const thresholds: Record<string, number> = {
            LCP: 2500,
            FID: 100,
            CLS: 0.1,
            TTFB: 600,
            INP: 200,
            FCP: 1800
          }

          if (thresholds[metric.name] && metric.value > thresholds[metric.name]) {
            console.warn(`⚠️ [Performance] ${metric.name} is slow (${metric.value.toFixed(2)}ms). Recommendations:`)
            recommendations[metric.name]?.forEach(rec => {
              console.warn(`  - ${rec}`)
            })
          }
        }

        function sendToCustomAnalytics(metric: any) {
          // Send to custom analytics endpoint for advanced monitoring
          if (navigator.sendBeacon) {
            const data = new Blob([JSON.stringify({
              metric: metric.name,
              value: metric.value,
              delta: metric.delta,
              id: metric.id,
              timestamp: Date.now(),
              url: window.location.href,
              userAgent: navigator.userAgent
            })], { type: 'application/json' })
            
            navigator.sendBeacon('/api/analytics/web-vitals', data)
          }
        }

        // Measure and send Core Web Vitals (including newer metrics)
        const vitals = webVitals as any
        if (vitals.getCLS) vitals.getCLS(sendToAnalytics)
        if (vitals.getFID) vitals.getFID(sendToAnalytics)
        if (vitals.getFCP) vitals.getFCP(sendToAnalytics)
        if (vitals.getLCP) vitals.getLCP(sendToAnalytics)
        if (vitals.getTTFB) vitals.getTTFB(sendToAnalytics)
        if (vitals.getINP) vitals.getINP(sendToAnalytics) // Interaction to Next Paint
        if (vitals.getTBT) vitals.getTBT(sendToAnalytics) // Total Blocking Time
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error)
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, event: string, params: any) => void
  }
}