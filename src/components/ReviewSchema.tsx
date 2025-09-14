'use client'

interface ReviewSchemaProps {
  itemName: string
  itemDescription?: string
  reviewRating: number // 1-5
  reviewBody?: string
  author: string
  datePublished?: string
  itemUrl?: string
  itemImage?: string
}

export default function ReviewSchema({
  itemName,
  itemDescription,
  reviewRating,
  reviewBody,
  author,
  datePublished,
  itemUrl,
  itemImage
}: ReviewSchemaProps) {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Thing",
      name: itemName,
      description: itemDescription,
      url: itemUrl,
      image: itemImage
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      "@type": "Person",
      name: author
    },
    datePublished,
    reviewBody
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewSchema)
      }}
    />
  )
}