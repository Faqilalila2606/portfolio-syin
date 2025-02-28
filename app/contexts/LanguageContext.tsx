"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '../i18n/locales/en.json'
import id from '../i18n/locales/id.json'

type Translations = typeof en

const translations = {
  en,
  id,
}

// Define the structure of your language content
interface LanguageContent {
  hero: { title: string; description: string; viewWork: string; followers: string; likes: string; };
  about: { title: string; description1: string; description2: string; };
  services: { title: string; /* other properties */ };
  contact: { /* properties */ };
  documentation: { /* properties */ };
  // Add other types as necessary
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
    const keys = key.split('.'); // Split the key if you are using nested keys
    let value: any = translations[language as keyof typeof translations]; // Use 'any' for initial value

    for (const k of keys) {
      value = value?.[k as keyof typeof value]; // Access the value using the key
    }

    if (!value) {
      return key; // Return the key if no value found
    }

    // If returnArray is true and value is an array, return it as is
    if (returnArray && Array.isArray(value)) {
      return value;
    }

    // If it's an array but returnArray is false, join with spaces
    if (Array.isArray(value)) {
      return value.join(' ');
    }

    // Handle string with parameters
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((acc, [key, val]) => {
        return acc.replace(`{${key}}`, String(val));
      }, value);
    }

    return value as string; // Return the value as string
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