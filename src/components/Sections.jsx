import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion, animate, AnimatePresence } from 'framer-motion'
import { Plus, Volume2, VolumeX, Pause, Play } from 'lucide-react'
import Img from './Img'
import Button from './Button'
import { SplitLines, Reveal, EASE } from './Reveal'
import { img } from '../lib/img'
import { process as steps } from '../data/site'
import Marquee, { Star } from './Marquee'

/* ---------- Video section with poster + graceful fallback ---------- */
export function VideoSection({ src, poster, eyebrow, lines, text, cta, height = 'min-h-[88vh]' }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(true)
  const inView = useInView(ref, { margin: '200px' })
  const [load, setLoad] = useState(false)
  useEffect(() => { if (inView) setLoad(true) }, [inView])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.18, 1])
  const radius = useTransform(scrollYProgress, [0, 0.4], [48, 0])

  useEffect(() => {
    const v = videoRef.current
    if (!v || failed) return
    if (inView && playing && !reduce) v.play().catch(() => {})
    else v.pause()
  }, [inView, playing, reduce, failed])

  return (
    <section ref={ref} className={`relative flex ${height} items-end overflow-hidden bg-ink text-paper`}>
      <motion.div className="absolute inset-0 overflow-hidden" style={reduce ? {} : { scale, borderRadius: radius }}>
        {!failed && !reduce ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={load ? src : undefined}
            poster={img(poster, 1600)}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setFailed(true)}
            aria-hidden="true"
          />
        ) : (
          <Img id={poster} alt="" w={1600} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      </motion.div>
      <div className="container-site relative z-10 pb-14 pt-40 sm:pb-20">
        {eyebrow && <span className="eyebrow text-paper/70">{eyebrow}</span>}
        <h2 className="display mt-5 max-w-5xl text-huge">
          <SplitLines lines={lines} />
        </h2>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          {text && <Reveal delay={0.2}><p className="max-w-lg text-base leading-relaxed text-paper/75 sm:text-lg">{text}</p></Reveal>}
          <div className="flex items-center gap-3">
            {cta}
            {!failed && !reduce && (
              <button onClick={() => setPlaying((p) => !p)} className="grid h-12 w-12 place-items-center rounded-full border border-paper/30 backdrop-blur hover:bg-paper hover:text-ink" aria-label={playing ? 'Pause video' : 'Play video'}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Process timeline with scroll-driven progress ---------- */
export function ProcessTimeline({ dark = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div ref={ref} className="relative mt-16">
      {/* desktop horizontal line */}
      <div className={`absolute left-0 right-0 top-7 hidden h-px lg:block ${dark ? 'bg-paper/15' : 'bg-ink/15'}`}>
        <motion.div className="h-full origin-left bg-ember" style={{ scaleX: progress }} />
      </div>
      {/* mobile vertical line */}
      <div className={`absolute bottom-0 left-7 top-0 w-px lg:hidden ${dark ? 'bg-paper/15' : 'bg-ink/15'}`}>
        <motion.div className="h-full origin-top bg-ember" style={{ scaleY: progress }} />
      </div>
      <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="relative pl-20 lg:pl-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
          >
            <span className={`absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border font-display text-sm font-bold lg:relative ${dark ? 'border-paper/20 bg-ink text-paper' : 'border-ink/15 bg-paper text-ink'}`}>
              {s.n}
              <motion.span className="absolute inset-0 rounded-full bg-ember" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-30% 0px' }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.15 }} style={{ zIndex: -1 }} />
            </span>
            <div className="group mt-0 overflow-hidden rounded-2xl lg:mt-8">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Img id={s.image} alt={`${s.title} stage`} w={700} sizes="(min-width:1024px) 25vw, 90vw" className="transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
              </div>
            </div>
            <h3 className={`display mt-6 text-2xl [overflow-wrap:anywhere] lg:text-xl xl:text-2xl ${dark ? 'text-paper' : 'text-ink'}`}>{s.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-paper/65' : 'text-stone-600'}`}>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Big closing CTA ---------- */
export function CTASection({ lines, text, primary = 'Start Your Project', secondary = 'Get in Touch' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20])
  return (
    <section ref={ref} className="relative overflow-hidden bg-ember py-24 text-ink sm:py-32">
      <motion.div style={{ rotate }} className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] opacity-20 sm:h-[40rem] sm:w-[40rem]" aria-hidden="true">
        <Star className="h-full w-full text-ink spin-slow" />
      </motion.div>
      <div className="container-site relative">
        <span className="eyebrow text-ink/70 [&::before]:bg-ink">Let's talk</span>
        <h2 className="display mt-6 text-huge">
          <SplitLines lines={lines} />
        </h2>
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.2}><p className="max-w-lg text-lg leading-relaxed text-ink/80">{text}</p></Reveal>
          <Reveal delay={0.3} className="flex flex-wrap gap-3">
            <Button to="/contact" variant="dark" size="lg">{primary}</Button>
            {secondary && <Button href="mailto:instillidees@gmail.com" variant="outline" size="lg" icon={false}>{secondary}</Button>}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ accordion ---------- */
export function FAQ({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-btn-${i}`}
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-display text-xs font-bold text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-display text-lg font-bold leading-snug tracking-tight transition-colors sm:text-2xl ${isOpen ? 'text-ink' : 'text-ink/80'}`}>{f.q}</span>
                </span>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-ember text-ink' : 'bg-ink/5 text-ink'}`}>
                  <Plus className={`h-4 w-4 transition-transform duration-500 ease-expo ${isOpen ? 'rotate-45' : ''}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-9 text-base leading-relaxed text-stone-600 sm:pl-12">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Animated counter (only for figures sourced from the official site) ---------- */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value, reduce])
  return <span ref={ref}>{display.toLocaleString('en-IN')}{suffix}</span>
}

/* ---------- Large scrolling text band ---------- */
export function TextBand({ items, dark = false, reverse = false }) {
  return (
    <div className={`overflow-hidden py-6 sm:py-8 ${dark ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}>
      <Marquee
        items={items}
        reverse={reverse}
        speed={45}
        itemClassName="px-6 font-display text-5xl font-extrabold uppercase tracking-tight sm:px-10 sm:text-7xl lg:text-8xl"
        separator={<Star className="h-8 w-8 text-ember sm:h-12 sm:w-12" />}
        className="items-center"
      />
    </div>
  )
}
