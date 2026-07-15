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
import GuideTeaser from '@/components/sections/GuideTeaser'
import Research from '@/components/sections/Research'
import Caution from '@/components/sections/Caution'
import Wholesale from '@/components/sections/Wholesale'
import StoresBanner from '@/components/sections/StoresBanner'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import ScrollObserver from '@/components/ui/ScrollObserver'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KUMANUKE スプレー | 植物由来 エリア散布型 野生動物対策',
  description: 'KUMANUKEは植物由来成分を使用したエリア散布型の野生動物対策スプレーです。熊との遭遇予防を目的とした事前散布型対策として、キャンプ・登山・農業・ゴミ置き場管理等に。OCガス・カプサイシン不使用。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/products/kumanuke' },
}

export default function ProductPage() {
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
        <GuideTeaser />
        <Research />
        <Caution />
        <Wholesale />
        <StoresBanner />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
