import type { ReactNode } from "react"

interface PageTemplateProps {
  title: string
  children: ReactNode
}

export default function PageTemplate({ title, children }: PageTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      {children}
    </div>
  )
}
