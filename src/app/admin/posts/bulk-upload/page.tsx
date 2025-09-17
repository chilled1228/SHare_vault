'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import BulkUpload from '@/components/admin/BulkUpload'

export default function BulkUploadPage() {
  return (
    <AdminRouteGuard>
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <BulkUpload />
        </div>
      </AdminLayout>
    </AdminRouteGuard>
  )
}