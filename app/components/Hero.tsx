"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Instagram, Mail, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

// Custom TikTok icon component
const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-6 h-6 text-gray-700 dark:text-gray-300"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const SocialPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <pattern
      id="pattern-circles"
      x="0"
      y="0"
      width="50"
      height="50"
      patternUnits="userSpaceOnUse"
      patternContentUnits="userSpaceOnUse"
    >
      <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000"></circle>
    </pattern>
    <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
  </svg>
)

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default function Hero() {
  const [stats, setStats] = useState({ followers: 0, likes: 0 });
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/tiktok-stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching TikTok stats:', error);
        // Use fallback data if fetch fails
        setStats({
          followers: 1200000, // 1.2M followers
          likes: 25000000    // 25M likes
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 300000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <SocialPattern />
      </div>

      {/* Animated Gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 animate-gradient-x"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400">
              {t('hero.title')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              TikTok Creator & Content Creator
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.description', {
                followers: formatNumber(stats.followers),
                likes: formatNumber(stats.likes)
              })}
            </p>

            {/* Stats Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center lg:justify-start gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
                  {loading ? "..." : formatNumber(stats.followers)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('hero.followers')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  {loading ? "..." : formatNumber(stats.likes)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('hero.likes')}
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <a
                href="https://www.tiktok.com/@ssyinnnn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="TikTok Profile"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.instagram.com/syintyamustika"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="mailto:syintyamustika@gmail.com"
                className="p-3 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="group hover:scale-105 transition-transform"
                onClick={scrollToServices}
              >
                {t('hero.viewWork')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 dark:from-pink-600 dark:to-blue-600 rounded-3xl transform rotate-6 opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 dark:from-blue-600 dark:to-pink-600 rounded-3xl transform -rotate-6 opacity-50"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/syintya-mustika.jpg"
                  alt="Syintya Mustika"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onClick={scrollToServices}
      >
        <div className="w-1 h-12 bg-gradient-to-b from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400 rounded-full animate-pulse"></div>
        <ArrowDown className="w-6 h-6 mt-2 text-gray-600 dark:text-gray-400 animate-bounce" />
      </motion.div>
    </section>
  )
}

