export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
      {/* Header Skeleton */}
      <div className="border-b" style={{borderColor: 'var(--border)'}}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Breadcrumb Skeleton */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-1 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-1 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Article Skeleton */}
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <header className="text-center mb-8">
              <div className="mb-6">
                <div className="h-6 w-20 bg-gray-300 rounded-full mb-4 mx-auto animate-pulse"></div>
              </div>
              
              <div className="h-12 w-3/4 bg-gray-300 rounded mb-6 mx-auto animate-pulse"></div>
              
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-8 mx-auto animate-pulse"></div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-1 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-1 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </header>

            {/* Image Skeleton */}
            <div className="mb-12">
              <div className="w-full h-64 md:h-96 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              
              <div className="py-4">
                <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
              </div>
              
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer Skeleton */}
      <div className="border-t mt-16" style={{borderColor: 'var(--border)'}}>
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
}