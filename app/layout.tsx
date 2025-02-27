import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageProvider } from "./contexts/LanguageContext"
import { DocumentationProvider } from "./contexts/DocumentationContext"
import LanguageSwitcher from "./components/LanguageSwitcher"
import Documentation from "./components/Documentation"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata, Viewport } from "next"
import ScrollProgress from "./components/ScrollProgress"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Portfolio Website",
  other: {
    'google-fonts': 'preconnect'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <DocumentationProvider>
              {/* Background Effects */}
              <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-blue-50/50 to-purple-50/50 dark:from-pink-950/50 dark:via-blue-950/50 dark:to-purple-950/50 animate-gradient-x"></div>
                <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              </div>

              {/* Animated Orbs */}
              <div className="fixed inset-0 -z-5 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }}></div>
              </div>

              <div className="relative flex flex-col min-h-screen">
                <ScrollProgress />
                <Navigation />
                <div className="fixed top-4 right-4 z-[40] flex items-center gap-4 md:z-50">
                  <LanguageSwitcher />
            <ModeToggle />
          </div>
                <main className="flex-grow">
          {children}
                </main>
                <Footer />
                <Documentation />
                <Toaster />
              </div>
            </DocumentationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'