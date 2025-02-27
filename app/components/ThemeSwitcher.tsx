"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Monitor },
  ]

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-background border border-border rounded-full p-1 shadow-lg flex">
        {themes.map(({ name, icon: Icon }) => (
          <motion.button
            key={name}
            className={`p-2 rounded-full ${
              theme === name 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            }`}
            onClick={() => setTheme(name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}