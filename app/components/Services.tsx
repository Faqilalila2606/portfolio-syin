"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, TrendingUp, Users, Sparkles } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Video,
      title: t('services.contentCreation.title'),
      description: t('services.contentCreation.description'),
    },
    {
      icon: TrendingUp,
      title: t('services.brandGrowth.title'),
      description: t('services.brandGrowth.description'),
    },
    {
      icon: Users,
      title: t('services.communityEngagement.title'),
      description: t('services.communityEngagement.description'),
    },
    {
      icon: Sparkles,
      title: t('services.viralContent.title'),
      description: t('services.viralContent.description'),
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('services.subtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <service.icon className="w-10 h-10 mb-4 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

