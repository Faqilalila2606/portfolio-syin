"use client"

import { ShoppingBag, Calendar, TrendingUp, Award } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function Experience() {
  const experiences = [
    {
      brand: "Fashion Brand",
      campaign: "Summer Collection Launch",
      period: "June 2024",
      role: "Brand Ambassador",
      achievements: [
        "Generated 2M+ views across campaign videos",
        "Achieved 15% engagement rate on promotional content",
        "Drove 10K+ clicks to brand website",
        "Created 5 viral TikTok videos with branded hashtag",
        "Increased brand followers by 25K during campaign",
      ],
    },
    {
      brand: "Beauty Brand",
      campaign: "Skincare Product Line",
      period: "March 2024 - May 2025",
      role: "Content Creator",
      achievements: [
        "Produced 12 product review videos",
        "Reached 5M+ unique viewers",
        "Achieved 20% average engagement rate",
        "Generated 15K+ product link clicks",
        "Featured in brand's official marketing materials",
      ],
    },
    {
      brand: "Application Brand",
      campaign: "App Launch Campaign",
      period: "January 2025",
      role: "Content Creator",
      achievements: [
        "Created viral app tutorial videos",
        "Generated 100K+ app downloads",
        "Achieved 5M+ views on launch content",
        "25% engagement rate on promotional posts",
        "Featured as top creator on platform",
      ],
    },
  ]

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-pink-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Brand Collaborations" />
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group backdrop-blur-sm"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-700 dark:to-blue-700 rounded-bl-full z-0 opacity-50 
                transition-transform duration-300 group-hover:scale-110"
              ></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 dark:text-white flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2 text-pink-500" />
                  {exp.brand}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {exp.campaign}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {exp.period}
                </p>
                <p className="text-xl font-medium mb-4 dark:text-gray-200 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-500" />
                  {exp.role}
                </p>
                <ul className="list-none space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        {/* <Image
          src="/images/decorative-background.jpg"
          alt="Decorative background"
          width={256}
          height={256}
        /> */}
      </div>
    </section>
  )
}

