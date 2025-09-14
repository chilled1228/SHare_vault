'use client'

import dynamic from 'next/dynamic'

// Lazy load performance components only on client side
const WebVitals = dynamic(() => import('./WebVitals'), { 
  ssr: false 
})

const ServiceWorker = dynamic(() => import('./ServiceWorker'), { 
  ssr: false 
})

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      
      {/* Only render performance components in production */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <WebVitals />
          <ServiceWorker />
        </>
      )}
    </>
  )
}