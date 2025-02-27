"use client"

import { motion } from "framer-motion"
import { Music, Video, Sparkles, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "../contexts/LanguageContext"
import { useState, useEffect } from "react"

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default function About() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({ followers: 0, likes: 0 });
  const [loading, setLoading] = useState(true);

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
        setStats({
          followers: 1200000,
          likes: 25000000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    { 
      icon: <Video className="w-8 h-8 text-pink-500" />, 
      title: "Content Creation", 
      description: "Short-form videos, Storytelling, Transitions" 
    },
    { 
      icon: <Music className="w-8 h-8 text-purple-500" />, 
      title: "Trending Audio", 
      description: "Music Selection, Sound Effects, Voice-overs" 
    },
    { 
      icon: <Sparkles className="w-8 h-8 text-blue-500" />, 
      title: "Visual Effects", 
      description: "Filters, Effects, Video Editing" 
    },
    { 
      icon: <TrendingUp className="w-8 h-8 text-red-500" />, 
      title: "Analytics", 
      description: "Engagement Rate, Growth Strategy" 
    },
  ]

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-pink-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('about.title')}
          </motion.h2>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description2')}
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="max-w-2xl mx-auto grid grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
              {loading ? "..." : formatNumber(stats.followers)}
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('hero.followers')}</p>
          </motion.div>
          <motion.div 
            className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
              {loading ? "..." : formatNumber(stats.likes)}
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('hero.likes')}</p>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-3 rounded-xl inline-block mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-400 rounded-full filter blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  )
}

