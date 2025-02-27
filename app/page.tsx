import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Services from "./components/Services"
import Contact from "./components/Contact"

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Services />
      <Contact />
    </main>
  )
}

