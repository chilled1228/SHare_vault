'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface AdminRouteGuardProps {
  children: React.ReactNode
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Allow access to login page without authentication
      if (pathname === '/admin/login') {
        if (user) {
          router.push('/admin')
        }
        return
      }

      // For all other admin routes, require authentication and admin access
      if (!user) {
        router.push('/admin/login')
      } else if (!user.isAdmin) {
        // User is authenticated but not an admin
        // Allow access to seed page for setup
        if (pathname !== '/admin/seed') {
          router.push('/')
        }
      }
    }
  }, [user, isLoading, router, pathname])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If on login page and authenticated, redirect to admin
  if (pathname === '/admin/login' && user) {
    return null
  }

  // If not on login page and not authenticated, redirect will happen in useEffect
  if (!user && pathname !== '/admin/login') {
    return null
  }

  return <>{children}</>
}