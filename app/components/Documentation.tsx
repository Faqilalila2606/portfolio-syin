"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Book, ChevronRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useDocumentation } from "../contexts/DocumentationContext"
import { useEffect, useState } from "react"

interface Section {
  title: string;
  content: string[];
}

export default function Documentation() {
  const { t } = useLanguage()
  const { isOpen, setIsOpen } = useDocumentation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get sections from translations and ensure content is array
  const sections: Section[] = [
    {
      title: t('documentation.sections.gettingStarted.title') as string,
      content: t('documentation.sections.gettingStarted.content', undefined, true) as string[]
    },
    {
      title: t('documentation.sections.navigation.title') as string,
      content: t('documentation.sections.navigation.content', undefined, true) as string[]
    },
    {
      title: t('documentation.sections.collaboration.title') as string,
      content: t('documentation.sections.collaboration.content', undefined, true) as string[]
    },
    {
      title: t('documentation.sections.features.title') as string,
      content: t('documentation.sections.features.content', undefined, true) as string[]
    }
  ]

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Documentation Panel */}
          <motion.div
            initial={isMobile ? { x: "-100%" } : { x: "100%" }}
            animate={{ x: 0 }}
            exit={isMobile ? { x: "-100%" } : { x: "100%" }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 300
            }}
            className={`fixed top-0 ${isMobile ? 'left-0' : 'right-0'} bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[61] overflow-hidden flex flex-col`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('documentation.title')}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close documentation"
              >
                {isMobile ? (
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="flex-1 overflow-y-auto px-6 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: isMobile ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-1" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    <div className="space-y-3 pl-7">
                      {section.content.map((item, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 + idx * 0.05 }}
                          className="text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                          {item}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Help Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + sections.length * 0.1 }}
                  className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-800"
                >
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                    {t('documentation.sections.help.needHelp')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 