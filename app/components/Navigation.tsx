"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, X, Home, User, Briefcase, Layout, Mail, Book } from "lucide-react"
import { useDocumentation } from "../contexts/DocumentationContext"

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "services", label: "Services", icon: Layout },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setIsOpen: setIsDocumentationOpen } = useDocumentation()

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrolling) {
          requestAnimationFrame(() => {
            setActiveSection(entry.target.id)
          })
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.2, 0.5, 0.8],
      rootMargin: "-10% 0px -10% 0px"
    })

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    const handleScroll = () => {
      if (!isScrolling) {
        const currentPosition = window.scrollY + window.innerHeight / 2

        let closestSection = sections[0].id
        let closestDistance = Infinity

        sections.forEach(({ id }) => {
          const element = document.getElementById(id)
          if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
            
            if (distance < closestDistance) {
              closestDistance = distance
              closestSection = id
            }
          }
        })

        setActiveSection(closestSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolling])

  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true)
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      setTimeout(() => {
        setActiveSection(sectionId)
        setIsScrolling(false)
      }, 1000)
    }
  }

  const handleDocumentationClick = () => {
    setIsMobileMenuOpen(false)
    setIsDocumentationOpen(true)
  }

  return (
    <>
      {/* Desktop Topbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />
        
        {/* Glassmorphism Effect */}
        <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/20 dark:border-gray-800/20 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-16 gap-8">
              {sections.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`group px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden ${
                    activeSection === id
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      activeSection === id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400"
                    }`} />
                    <span className="relative z-10">{label}</span>
                  </div>
                  
                  {/* Hover Effect Background */}
                  <motion.div
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-md -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Active Indicator */}
                  {activeSection === id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600"
                      layoutId="activeSection"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Documentation Button */}
              <motion.button
                onClick={handleDocumentationClick}
                className="group px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 transition-colors duration-300 text-gray-400 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400" />
                  <span className="relative z-10">Docs</span>
                </div>
                
                {/* Hover Effect Background */}
                <motion.div
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-md -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Special Highlight Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-500/10 dark:to-purple-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Toggle Button */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="fixed top-4 left-4 z-[55]"
        >
          <motion.button
            className="p-3 rounded-full bg-blue-500/90 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-400/20 hover:bg-blue-600/90 dark:bg-blue-600/90 dark:hover:bg-blue-700/90 dark:border-blue-500/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            animate={isMobileMenuOpen ? {
              rotate: 90,
              transition: { duration: 0.3 }
            } : {
              rotate: 0,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={isMobileMenuOpen ? { 
                rotate: 360,
                transition: {
                  duration: 0.6,
                  ease: "anticipate"
                }
              } : { 
                rotate: 0,
                transition: {
                  duration: 0.6,
                  ease: "anticipate"
                }
              }}
              className="relative"
            >
              {isMobileMenuOpen ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Settings className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[45] bg-background/80 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }
                }}
                exit={{ 
                  x: "-100%",
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }
                }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-background shadow-xl p-6 border-r border-border z-[46]"
                onClick={e => e.stopPropagation()}
              >
                <motion.div 
                  className="flex flex-col space-y-4 mt-16"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  {sections.map(({ id, label, icon: Icon }) => (
                    <motion.button
                      key={id}
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 }
                          }
                        },
                        closed: {
                          y: 50,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 }
                          }
                        }
                      }}
                      onClick={() => scrollToSection(id)}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                        activeSection === id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                      {activeSection === id && (
                        <motion.div
                          className="absolute left-0 w-1 h-12 bg-primary rounded-r-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                  
                  {/* Documentation Button */}
                  <motion.button
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 }
                        }
                      },
                      closed: {
                        y: 50,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 }
                        }
                      }
                    }}
                    onClick={handleDocumentationClick}
                    className="flex items-center space-x-4 p-4 rounded-lg transition-colors hover:bg-muted"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Book className="w-5 h-5" />
                    <span className="font-medium">Documentation</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
} 