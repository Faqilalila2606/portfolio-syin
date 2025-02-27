"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, MessageSquare } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/alcateambot_", color: "hover:text-pink-500" },
    { icon: MessageSquare, href: "https://whatsapp.com/channel/0029Va9xchgDDmFNoKjsNJ2K", color: "hover:text-green-500" },
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-8 px-4 border-t border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Main content */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Made with
            </motion.span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 0, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-4 h-4 text-red-500 filter drop-shadow-glow" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              by
            </motion.span>
            <motion.a 
              href="https://www.instagram.com/alcateambot_"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgb(255,255,255)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Alcateambot.Corp
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 transition-colors ${social.color}`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p 
            className="text-xs text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            © {new Date().getFullYear()} Alcateambot.Corp. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-20"></div>
    </motion.footer>
  )
} 