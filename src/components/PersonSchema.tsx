'use client'

interface PersonSchemaProps {
  name: string
  description?: string
  url?: string
  image?: string
  jobTitle?: string
  worksFor?: string
  sameAs?: string[]
  email?: string
}

export default function PersonSchema({
  name,
  description,
  url,
  image,
  jobTitle,
  worksFor,
  sameAs,
  email
}: PersonSchemaProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    url,
    image,
    jobTitle,
    worksFor: worksFor ? {
      "@type": "Organization",
      name: worksFor
    } : undefined,
    sameAs,
    email: email ? `mailto:${email}` : undefined
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema)
      }}
    />
  )
}