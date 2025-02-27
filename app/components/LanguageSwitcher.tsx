"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' }
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    localStorage.setItem('language', langCode)
    setIsOpen(false)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-background/95 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-border"
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 bg-background/95 rounded-lg shadow-xl py-2 min-w-[160px] backdrop-blur-sm border border-border"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 