"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface DocumentationContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const DocumentationContext = createContext<DocumentationContextType | undefined>(undefined)

export function DocumentationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DocumentationContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DocumentationContext.Provider>
  )
}

export function useDocumentation() {
  const context = useContext(DocumentationContext)
  if (context === undefined) {
    throw new Error('useDocumentation must be used within a DocumentationProvider')
  }
  return context
} 