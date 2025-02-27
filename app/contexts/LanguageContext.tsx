"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '../i18n/locales/en.json'
import id from '../i18n/locales/id.json'

type Translations = typeof en

const translations = {
  en,
  id,
}

interface LanguageContextType {
  language: string
  t: (key: string, params?: Record<string, string | number>, returnArray?: boolean) => string | string[]
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en'
    setLanguage(savedLang)
  }, [])

  const t = (key: string, params?: Record<string, string | number>, returnArray = false) => {
    const keys = key.split('.')
    let value = translations[language as keyof typeof translations]

    for (const k of keys) {
      value = value?.[k as keyof typeof value]
    }

    if (!value) {
      return key
    }

    // If returnArray is true and value is an array, return it as is
    if (returnArray && Array.isArray(value)) {
      return value
    }

    // If it's an array but returnArray is false, join with spaces
    if (Array.isArray(value)) {
      return value.join(' ')
    }

    // Handle string with parameters
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((acc, [key, val]) => {
        return acc.replace(`{${key}}`, String(val))
      }, value)
    }

    return value as string
  }

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 