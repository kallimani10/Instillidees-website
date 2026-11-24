import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { useMeta, useMediaQuery } from '../hooks'
import Img from '../components/Img'
import Button from '../components/Button'
import Marquee, { Star } from '../components/Marquee'
import SectionHeading from '../components/SectionHeading'
import { Reveal, SplitLines, MaskReveal, EASE } from '../components/Reveal'
import { ServiceCard, ProductCard } from '../components/Cards'
import { VideoSection, ProcessTimeline, CTASection, Counter } from '../components/Sections'
import { services } from '../data/services'
import { products } from '../data/products'
import { brandGroups, allBrands, clients } from '../data/brands'
import { facts } from '../data/site'
import { P, VIDEOS } from '../lib/img'

export default function Home() {
  useMeta(
    'Custom Printing, Corporate Gifting & Branded Merchandise',
    'Instill Idees transforms everyday products into powerful brand experiences through creative design, premium printing and customised corporate merchandise.'
  )
  return (
    <>
      <Hero />
      <BrandMarquee />
      <WhatWeDo />
      <ProductShowcase />
      <FeaturedBrands />
      <TrustedClients />
      <HowItWorks />
      <VideoSection
        src={VIDEOS.screenPrint}
        poster={P.screenIndustrial}
        eyebrow="Inside production"
        lines={['Your brand', <>deserves to be <span className="serif-i text-ember">experienced.</span></>]}
        text="Ink, screens, lasers and careful hands. Every piece we produce is checked, finished and packed to carry your brand with pride."
        cta={<Button to="/about" variant="primary" size="lg">See How We Work</Button>}
      />
      <CTASection
        lines={["Let's create", <>something <span className="serif-i">unforgettable.</span></>]}
        text="From custom merchandise to thoughtful corporate gifting, let's bring your brand vision to life."
      />
    </>
  )
}

/* ================= HERO ================= */
function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -260])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const float = (d = 0) => (reduce ? {} : { y: [0, -14, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: d } })

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-10">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-ember/20 blur-[120px]"
          animate={reduce ? {} : { scale: [1, 1.15, 1], x: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sand blur-[100px]" />
      </div>

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <motion.div className="relative z-10 lg:col-span-7" style={reduce ? {} : { y: textY }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="eyebrow text-stone-600">
            Premium printing · Corporate gifting · Merchandise
          </motion.span>
          <h1 className="display mt-6 text-mega">
            <SplitLines animateOnMount delay={0.55} lines={['Ideas that', 'make an', <span key="i" className="serif-i text-ember">impression.</span>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease: EASE }} className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            We transform everyday products into powerful brand experiences through creative design, premium printing, and customized merchandise.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" variant="primary" size="lg">Let's Create Something</Button>
            <Button to="/#products" variant="outline" size="lg" icon={false}>Explore Our Work</Button>
          </motion.div>
        </motion.div>

        {/* layered product composition */}
        <div className="relative h-[460px] sm:h-[600px] lg:col-span-5 lg:h-[720px]">
          <motion.div style={reduce ? {} : { y: y1 }} className="absolute right-0 top-0 h-[78%] w-[72%]">
            <MaskReveal className="h-full w-full overflow-hidden rounded-[32px] shadow-2xl shadow-ink/20" delay={0.4}>
              <Img id={P.giftOrange} alt="Hands opening a bright orange branded gift box" w={1000} eager sizes="(min-width:1024px) 30vw, 70vw" />
            </MaskReveal>
          </motion.div>

          <motion.div style={reduce ? {} : { y: y2 }} className="absolute bottom-[4%] left-0 h-[46%] w-[46%]">
            <motion.div animate={float(0)} className="h-full w-full">
              <MaskReveal className="h-full w-full overflow-hidden rounded-[26px] border-[6px] border-paper shadow-xl shadow-ink/20" delay={0.7} direction="left">
                <Img id={P.tumblerBlue} alt="Custom branded insulated tumbler" w={600} eager sizes="25vw" />
              </MaskReveal>
            </motion.div>
          </motion.div>

          <motion.div style={reduce ? {} : { y: y3 }} className="absolute bottom-0 right-[6%] h-[34%] w-[38%]">
            <motion.div animate={float(1.5)} className="h-full w-full">
              <MaskReveal className="h-full w-full overflow-hidden rounded-[22px] border-[6px] border-paper shadow-xl shadow-ink/20" delay={0.9}>
                <Img id={P.mugLogo} alt="Branded ceramic mug with logo" w={500} eager sizes="20vw" />
              </MaskReveal>
            </motion.div>
          </motion.div>

          {/* rotating badge */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
            className="absolute left-[4%] top-[8%] grid h-28 w-28 place-items-center rounded-full bg-ink text-paper sm:h-32 sm:w-32"
          >
            <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full p-1.5" aria-hidden="true">
              <defs><path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text className="fill-paper font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em]">
                <textPath href="#circle">Made to impress • Your brand •</textPath>
              </text>
            </svg>
            <Star className="h-7 w-7 text-ember" />
          </motion.div>

          {/* floating label */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
            className="absolute right-[-2%] top-[46%] hidden items-center gap-2 rounded-full bg-paper/90 px-4 py-2.5 text-xs font-semibold shadow-lg backdrop-blur sm:flex"
          >
            <Sparkles className="h-4 w-4 text-ember" /> Custom-branded, end to end
          </motion.div>
        </div>
      </div>

      {/* facts strip — figures as listed on instillidees.in */}
      <div className="container-site relative mt-12 lg:mt-4">
        <div className="grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08} y={20} className="flex items-baseline gap-4">
              <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"><Counter value={f.value} suffix={f.suffix} /></span>
              <span className="max-w-[12rem] text-sm leading-snug text-stone-600">{f.label}</span>
            </Reveal>
          ))}
        </div>
        <a href="#marquee" className="absolute -top-2 right-4 hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-600 lg:flex sm:right-8 lg:right-12">
          Scroll <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

/* ================= MARQUEE ================= */
function BrandMarquee() {
  const words = ['Custom Printing', 'Corporate Gifts', 'Branded Merchandise', 'Creative Design', 'Made to Impress', 'Your Brand, Your Way']
  return (
    <section id="marquee" className="relative -rotate-[1.5deg] scale-[1.03] bg-ink py-5 text-paper sm:py-7" aria-label="What we do">
      <Marquee
        items={words}
        speed={38}
        itemClassName="px-6 font-display text-3xl font-extrabold uppercase tracking-tight sm:px-10 sm:text-5xl lg:text-6xl"
        separator={<Star className="h-6 w-6 text-ember sm:h-9 sm:w-9" />}
        className="items-center"
      />
    </section>
  )
}

/* ================= WHAT WE DO ================= */
function WhatWeDo() {
  const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6']
  return (
    <section className="relative bg-paper py-24 sm:py-32" id="services">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="What we do" lines={["We don't just print.", <>We <span className="serif-i text-ember">install</span> ideas.</>]} />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
              Your brand lives in more than pixels. We translate it into products people hold, wear, gift and use every day — combining creative thinking, the right print technique and careful finishing so every piece feels unmistakably yours.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} className={`min-h-[440px] lg:min-h-[520px] ${spans[i]}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= PRODUCT SHOWCASE (pinned horizontal scroll) ================= */
function ProductShowcase() {
  const target = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 700px)')
  const reduce = useReducedMotion()
  const pinned = isDesktop && !reduce

  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="products" ref={target} className="relative bg-ink text-paper" style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24 sm:py-28'}>
        <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow text-paper/60">The collection</span>
            <h2 className="display mt-4 text-big">
              <SplitLines lines={['Branded to be', <span key="r" className="serif-i text-ember">remembered.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-sm leading-relaxed text-paper/65 sm:text-base">
              Explore the products we customise — curated from trusted brands and finished with your identity. Hover a card to discover more.
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={`mt-10 flex gap-5 px-4 sm:px-8 lg:mt-12 lg:px-12 ${pinned ? 'w-max' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4'}`}
        >
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} className={`snap-start ${pinned ? 'w-[min(21rem,40vh)]' : 'w-[78vw] max-w-[22rem]'}`} />
          ))}
          <div className={`flex shrink-0 snap-start flex-col justify-between rounded-[26px] border border-paper/15 p-8 ${pinned ? 'w-[min(21rem,40vh)]' : 'w-[78vw] max-w-[22rem]'}`}>
            <span className="display text-3xl leading-none">Don't see it here?</span>
            <div>
              <p className="mb-6 text-sm text-paper/65">If it can be printed, engraved or packed, we can probably brand it. Tell us what you have in mind.</p>
              <Button to="/contact" variant="primary">Ask Us</Button>
            </div>
          </div>
        </motion.div>

        {pinned && (
          <div className="container-site mt-10">
            <div className="h-px w-full bg-paper/15">
              <motion.div className="h-full origin-left bg-ember" style={{ scaleX: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ================= FEATURED BRANDS ================= */
function FeaturedBrands() {
  const half = Math.ceil(allBrands.length / 2)
  const row = (list) =>
    list.map((b) => (
      <span key={b.name} className="group mx-2 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-paper px-6 py-4 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper sm:px-8 sm:py-5">
        <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">{b.name}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 group-hover:text-ember">{b.category}</span>
      </span>
    ))
  return (
    <section className="overflow-hidden bg-paper-warm py-24 sm:py-32">
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionHeading eyebrow="Brands we offer" lines={['Premium brands.', <span key="e" className="serif-i text-ember">Endless possibilities.</span>]} />
        </div>
        <Reveal className="lg:col-span-4" delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {brandGroups.map((g) => (
              <span key={g.category} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper">
                {g.category} <span className="text-ember">{g.brands.length}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="mt-14 space-y-4">
        <Marquee items={row(allBrands.slice(0, half))} speed={55} />
        <Marquee items={row(allBrands.slice(half))} speed={55} reverse />
      </div>
      <p className="container-site mt-8 text-xs text-stone-500">Brand names are trademarks of their respective owners and are shown to indicate products available for customisation.</p>
    </section>
  )
}

/* ================= TRUSTED CLIENTS ================= */
function TrustedClients() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="Brands we've worked with" lines={['Trusted by brands', <>that <span className="serif-i text-ember">lead.</span></>]} intro="A selection of organisations featured in our portfolio of custom merchandise and corporate gifting projects." />
        <ul className="mt-16 grid grid-cols-2 border-l border-t border-ink/10 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06 }}
              className="group relative flex h-28 items-center justify-center overflow-hidden border-b border-r border-ink/10 px-4 text-center sm:h-36"
            >
              <span className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-expo group-hover:translate-y-0" aria-hidden="true" />
              <span className="relative font-display text-base font-bold tracking-tight text-ink/80 transition-colors duration-300 group-hover:text-paper sm:text-xl">{c}</span>
            </motion.li>
          ))}
          <li className="flex h-28 items-center justify-center border-b border-r border-ink/10 bg-ember sm:h-36">
            <Link to="/contact" className="inline-flex items-center gap-2 font-display text-base font-bold text-ink sm:text-lg">
              Your brand next <ArrowUpRight className="h-5 w-5" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

/* ================= HOW IT WORKS ================= */
function HowItWorks() {
  return (
    <section className="bg-paper-warm py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="How it works" lines={['From idea', <>to <span className="serif-i text-ember">impact.</span></>]} />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="text-base leading-relaxed text-stone-600 sm:text-lg">A clear, collaborative process — so you always know what's happening, from the first brief to the final delivery.</p>
          </Reveal>
        </div>
        <ProcessTimeline />
      </div>
    </section>
  )
}
