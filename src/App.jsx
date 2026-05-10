import './styles/globals.css'
import { useEffect, useState } from 'react'
import { LenisProvider } from './context/LenisContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Works from './components/Works'
import About from './components/About'
import Timeline from './components/Timeline'
import Quote from './components/Quote'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectsPage from './components/ProjectsPage'

function HomePage() {
  return (
    <>
      <Ticker />
      <Services />
      <Works />
      <About />
      <Timeline />
      <Quote />
      <FAQ />
      <Contact />
    </>
  )
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const isProjectsPage = pathname === '/projects'

  return (
    <LenisProvider>
      <Cursor />
      <Navbar isProjectsPage={isProjectsPage} />
      <main>
        {isProjectsPage ? (
          <ProjectsPage />
        ) : (
          <>
            <Hero />
            <HomePage />
          </>
        )}
      </main>
      <Footer />
    </LenisProvider>
  )
}
