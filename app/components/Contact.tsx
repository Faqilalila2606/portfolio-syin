"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Instagram, DollarSign, Send, Loader2, Calendar } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "../contexts/LanguageContext"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Reuse the same formatNumber function
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const formSchema = z.object({
  brand: z.string().min(2, "Brand name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  budget: z.string().min(1, "Please specify your budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [stats, setStats] = useState({ followers: 0, likes: 0 });
  const [loading, setLoading] = useState(true);
  const [successfulCollabs, setSuccessfulCollabs] = useState(50);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      email: "",
      budget: "",
      message: "",
    },
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tiktokResponse, collabsResponse] = await Promise.all([
          fetch('/api/tiktok-stats'),
          fetch('/api/send-collaboration')
        ]);

        if (tiktokResponse.ok) {
          const tiktokData = await tiktokResponse.json();
          setStats(tiktokData);
        }

        if (collabsResponse.ok) {
          const collabsData = await collabsResponse.json();
          setSuccessfulCollabs(collabsData.successfulCollabs);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
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

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your collaboration request has been sent successfully.",
          variant: "default",
        });
        form.reset();
      } else {
        throw new Error(result.error || 'Failed to send collaboration request');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error!",
        description: "Failed to send your collaboration request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-pink-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('contact.title')}
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400">
                Partnership Inquiries
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:syintyamustika@gmail.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  <Mail className="w-6 h-6 mr-3 text-pink-600" />
                  syintyamustika@gmail.com
                </a>
                <a
                  href="https://www.tiktok.com/@ssyinnnn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-pink-600">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                  @ssyinnnn
                </a>
                <a
                  href="https://www.instagram.com/syintyamustika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6 mr-3 text-pink-600" />
                  @syintyamustika
                </a>
              </div>

              <motion.div 
                className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-lg font-semibold mb-4 dark:text-white">Why Work With Me?</h4>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></span>
                    <span className="font-medium">{loading ? "..." : formatNumber(stats.followers)}</span>
                    <span>Engaged Followers</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></span>
                    <span className="font-medium">{loading ? "..." : formatNumber(stats.likes)}</span>
                    <span>Total Likes</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500"></span>
                    <span className="font-medium">{successfulCollabs}+</span>
                    <span>Successful Brand Collabs</span>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="w-6 h-6 text-pink-600" />
                  {t('contact.formTitle')}
                </CardTitle>
                <CardDescription className="text-lg">{t('contact.formDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Your brand name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <FormControl>
                            <Input placeholder="Your budget range" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                  type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700"
                  disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          {t('contact.form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
            </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
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

