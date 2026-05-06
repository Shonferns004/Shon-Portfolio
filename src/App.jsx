import './styles/globals.css'
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

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Works />
        <About />
        <Timeline />
        <Quote />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
