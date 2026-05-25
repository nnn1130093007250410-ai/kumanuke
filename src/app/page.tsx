import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import WhatIs from '@/components/sections/WhatIs'
import Features from '@/components/sections/Features'
import Scenes from '@/components/sections/Scenes'
import Ingredients from '@/components/sections/Ingredients'
import Comparison from '@/components/sections/Comparison'
import HowToUse from '@/components/sections/HowToUse'
import FAQ from '@/components/sections/FAQ'
import Caution from '@/components/sections/Caution'
import Wholesale from '@/components/sections/Wholesale'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import ScrollObserver from '@/components/ui/ScrollObserver'

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhatIs />
        <Features />
        <Scenes />
        <Ingredients />
        <Comparison />
        <HowToUse />
        <FAQ />
        <Caution />
        <Wholesale />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
