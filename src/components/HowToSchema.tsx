'use client'

interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
  supply?: string[]
  tool?: string[]
}

export default function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool
}: HowToSchemaProps) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    estimatedCost,
    supply: supply?.map(s => ({ "@type": "HowToSupply", name: s })),
    tool: tool?.map(t => ({ "@type": "HowToTool", name: t })),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
      position: index + 1
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema)
      }}
    />
  )
}