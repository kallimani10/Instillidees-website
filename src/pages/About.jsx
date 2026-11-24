import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Lightbulb, SlidersHorizontal, ShieldCheck, LayoutGrid, Layers, Gift, Target, Eye } from 'lucide-react'
import { useMeta } from '../hooks'
import Img from '../components/Img'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { Reveal, SplitLines, SplitWords, MaskReveal, EASE } from '../components/Reveal'
import { ProcessTimeline, CTASection, TextBand, VideoSection } from '../components/Sections'
import { services } from '../data/services'
import { P, VIDEOS } from '../lib/img'

const differentiators = [
  { icon: Lightbulb, title: 'Creative Approach', text: 'Every project starts with an idea, not a catalogue. We think about how your brand should feel in someone’s hands.' },
  { icon: SlidersHorizontal, title: 'Customized Solutions', text: 'Products, techniques, packaging and quantities shaped around your brief, your audience and your budget.' },
  { icon: ShieldCheck, title: 'Quality-Focused Production', text: 'Careful material selection, colour checks and finishing so every piece meets the standard your brand deserves.' },
  { icon: LayoutGrid, title: 'Diverse Merchandise Options', text: 'Bottles, bags, electronics, apparel, stationery and gift combos from brands people already trust.' },
  { icon: Layers, title: 'End-to-End Branding Support', text: 'From artwork and mockups through production and packing — one partner for the whole journey.' },
  { icon: Gift, title: 'Corporate Gifting Solutions', text: 'Welcome kits, festive hampers and client gifts that are curated, branded and ready to delight.' },
]

const philosophy = ['Creativity', 'Quality', 'Customization', 'Precision', 'Brand identity', 'Customer experience']

export default function About() {
  useMeta('About Us', 'Instill Idees is a creative branding and custom merchandise studio that turns ideas into brand experiences through printing, engraving and corporate gifting.')
  return (
    <>
      <AboutHero />
      <Story />
      <MissionVision />
      <Philosophy />
      <Different />
      <ServicesOverview />
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="Our process" lines={['Consultation → Design', <>→ Production → <span className="serif-i text-ember">Delivery.</span></>]} />
          <ProcessTimeline />
        </div>
      </section>
      <Gallery />
      <CTASection
        lines={["Let's make your brand", <span key="f" className="serif-i">impossible to forget.</span>]}
        text="Tell us about your brand, your audience and the moment you want to create. We'll take it from there."
        primary="Work With Us"
        secondary="Email Us"
      />
    </>
  )
}

function AboutHero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pt-32 sm:pt-40">
      <div className="container-site">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="eyebrow text-stone-600">About Instill Idees</motion.span>
        <h1 className="display mt-6 text-huge">
          <SplitLines animateOnMount delay={0.5} lines={['We turn ideas', <>into brand <span className="serif-i text-ember">experiences.</span></>]} />
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl lg:col-span-6 lg:col-start-7">
            “We believe every brand deserves to be experienced, not just seen.”
          </motion.p>
        </div>
      </div>
      <div className="container-site mt-14">
        <MaskReveal className="relative h-[52vh] overflow-hidden rounded-[32px] sm:h-[70vh]" delay={0.6}>
          <motion.div className="absolute inset-0" style={reduce ? {} : { y: imgY, scale }}>
            <Img id={P.giftLuxury} alt="Premium branded gift boxes with gold logos" w={1800} eager />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 sm:bottom-10 sm:left-10">
            {['Custom printing', 'Corporate gifting', 'Branded merchandise', 'Creative design'].map((t) => (
              <span key={t} className="rounded-full bg-paper/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">{t}</span>
            ))}
          </div>
        </MaskReveal>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Our story" lines={['Brands you can', <span key="h" className="serif-i text-ember">hold.</span>]} />
          <div className="mt-10 grid grid-cols-2 gap-4">
            <MaskReveal className="aspect-[3/4] overflow-hidden rounded-3xl"><Img id={P.screenHand} alt="Screen printing frame held up to the light" w={600} sizes="20vw" /></MaskReveal>
            <MaskReveal className="mt-12 aspect-[3/4] overflow-hidden rounded-3xl" delay={0.15}><Img id={P.penGold} alt="Engraved gold fountain pen nib" w={600} sizes="20vw" /></MaskReveal>
          </div>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-stone-600 lg:col-span-6 lg:col-start-7 lg:pt-24">
          <p className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
            <SplitWords text="Instill Idees is a creative branding and custom merchandise studio. We help businesses turn their identity into products people genuinely love to use." />
          </p>
          <Reveal><p>Our work spans custom printing, corporate gifting and branded merchandise — from t-shirts, hoodies and bottles to diaries, tech accessories and complete gift kits. Whatever the product, our goal is the same: make your brand feel as good in someone’s hands as it looks on screen.</p></Reveal>
          <Reveal><p>We approach every project with creative thinking first. We consider who will receive the product, how they will use it and what it should say about you — then choose the materials and techniques that bring that idea to life, whether it’s UV printing, screen printing, embroidery or laser engraving.</p></Reveal>
          <Reveal><p>Quality is non-negotiable. From the first mockup to the final pack, we pay attention to colour, placement and finish, because the smallest details are what make a brand memorable. The result is merchandise that communicates for you — on desks, in bags, at events and long after the first impression.</p></Reveal>
        </div>
      </div>
    </section>
  )
}

function MissionVision() {
  return (
    <section className="bg-paper pb-24 sm:pb-32">
      <div className="container-site grid gap-5 lg:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-paper sm:p-12 lg:min-h-[480px]">
          <Target className="h-10 w-10 text-ember" strokeWidth={1.5} />
          <span className="eyebrow mt-10 block text-paper/60">Our mission</span>
          <p className="display mt-5 text-3xl leading-[1.02] sm:text-4xl lg:text-5xl">To transform creative ideas into meaningful, high-quality branded products and memorable customer experiences.</p>
          <span className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[10rem] font-extrabold leading-none text-paper/5" aria-hidden="true">01</span>
        </Reveal>
        <Reveal delay={0.12} className="relative overflow-hidden rounded-[32px] bg-ember p-8 text-ink sm:p-12 lg:min-h-[480px]">
          <Eye className="h-10 w-10" strokeWidth={1.5} />
          <span className="eyebrow mt-10 block text-ink/60 [&::before]:bg-ink">Our vision</span>
          <p className="display mt-5 text-3xl leading-[1.02] sm:text-4xl lg:text-5xl">To become a trusted creative partner for businesses expressing their identity through innovative merchandise.</p>
          <span className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[10rem] font-extrabold leading-none text-ink/10" aria-hidden="true">02</span>
        </Reveal>
      </div>
    </section>
  )
}

function Philosophy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-30%'])
  const reduce = useReducedMotion()
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <motion.p style={reduce ? {} : { x }} className="pointer-events-none whitespace-nowrap font-display text-[22vw] font-extrabold uppercase leading-none text-paper/[0.04]" aria-hidden="true">
        Every detail
      </motion.p>
      <div className="container-site relative -mt-[12vw] grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading dark eyebrow="Our philosophy" lines={['Every detail tells', <>your brand <span className="serif-i text-ember">story.</span></>]} />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/70">
              A stitch, a shade of orange, the weight of a box lid — people notice more than they realise. We obsess over these details so your merchandise communicates care, consistency and confidence.
            </p>
          </Reveal>
        </div>
        <ul className="lg:col-span-5 lg:col-start-8">
          {philosophy.map((w, i) => (
            <motion.li
              key={w}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
              className="group flex items-center justify-between border-b border-paper/15 py-5"
            >
              <span className="font-display text-2xl font-bold tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-ember sm:text-4xl">{w}</span>
              <span className="font-display text-xs text-paper/40">0{i + 1}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Different() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="What makes us different" lines={['Built for brands', <>that care about <span className="serif-i text-ember">details.</span></>]} />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden bg-paper p-8 sm:p-10"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-expo group-hover:scale-y-100" aria-hidden="true" />
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sand text-ink transition-colors duration-500 group-hover:bg-ember">
                  <d.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="display mt-8 text-2xl transition-colors duration-500 group-hover:text-paper">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 transition-colors duration-500 group-hover:text-paper/70">{d.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesOverview() {
  return (
    <section id="services" className="bg-paper-warm py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="Our services" lines={['What we bring', <>to the <span className="serif-i text-ember">table.</span></>]} />
        <div className="mt-16 space-y-20 sm:space-y-28">
          {services.map((s, i) => (
            <div key={s.id} className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <MaskReveal className="group aspect-[4/3] overflow-hidden rounded-[28px] lg:col-span-7" direction={i % 2 ? 'right' : 'left'}>
                <Img id={s.image} alt={`${s.title} by Instill Idees`} w={1200} sizes="(min-width:1024px) 55vw, 100vw" className="transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
              </MaskReveal>
              <div className="lg:col-span-5">
                <Reveal y={20}><span className="font-display text-sm font-bold text-ember">/{String(i + 1).padStart(2, '0')}</span></Reveal>
                <h3 className="display mt-4 text-4xl leading-[0.95] sm:text-5xl"><SplitLines lines={[s.title]} /></h3>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-lg leading-relaxed text-stone-600">{s.long}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium">{t}</span>)}
                  </div>
                  <div className="mt-8"><Button to="/contact" variant="dark">Discuss This Service</Button></div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const shots = [
    { id: P.screenRed, alt: 'Screen printing with red ink', cls: 'col-span-2 row-span-2' },
    { id: P.embroidery, alt: 'Embroidery machine stitching a design', cls: '' },
    { id: P.boxColour, alt: 'Custom coloured packaging boxes', cls: '' },
    { id: P.engravedMetal, alt: 'Laser-engraved metal surface', cls: '' },
    { id: P.giftRibbon, alt: 'Corporate gift boxes with ribbons', cls: 'row-span-2' },
    { id: P.teeBlack, alt: 'Finished branded t-shirt', cls: '' },
    { id: P.notebookGreen, alt: 'Custom notebook on a desk', cls: 'col-span-2' },
  ]
  return (
    <>
      <TextBand items={['Customise', 'Print', 'Engrave', 'Pack', 'Deliver']} dark />
      <section className="bg-ink pb-24 text-paper sm:pb-32">
        <div className="container-site">
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
            {shots.map((s, i) => (
              <MaskReveal key={s.id} delay={(i % 4) * 0.08} className={`group overflow-hidden rounded-2xl sm:rounded-3xl ${s.cls}`}>
                <Img id={s.id} alt={s.alt} w={900} sizes="(min-width:1024px) 40vw, 50vw" className="transition-transform duration-[1.4s] ease-expo group-hover:scale-110" />
              </MaskReveal>
            ))}
          </div>
        </div>
      </section>
      <VideoSection
        src={VIDEOS.screenPrint}
        poster={P.screenYellow}
        eyebrow="Visual story"
        lines={['Made with', <span key="c" className="serif-i text-ember">care, at every step.</span>]}
        text="Customisation, printing, finishing and packaging — the craft behind every branded piece we deliver."
        height="min-h-[75vh]"
      />
    </>
  )
}
