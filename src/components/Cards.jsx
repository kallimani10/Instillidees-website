import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus, Clock } from 'lucide-react'
import Img from './Img'
import { EASE } from './Reveal'
import { formatDate } from '../data/blogPosts'

/* ---------- Service card ---------- */
export function ServiceCard({ service, index, className = '', tall = false }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-ink text-paper ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: EASE, delay: (index % 3) * 0.08 }}
      data-cursor="hover"
    >
      <div className={`absolute inset-0 ${tall ? '' : ''}`}>
        <Img id={service.image} alt={`${service.title} — Instill Idees`} w={1100} sizes="(min-width:1024px) 50vw, 100vw" className="scale-105 transition-transform duration-[1.4s] ease-expo group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10 transition-opacity duration-700 group-hover:opacity-90" />
      </div>
      <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
        <span className="font-display text-sm font-bold text-paper/70">/{String(index + 1).padStart(2, '0')}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {service.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-paper/25 bg-ink/30 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">{t}</span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-auto p-6 sm:p-8">
        <h3 className="display text-[1.7rem] leading-[0.95] tracking-tight sm:text-3xl xl:text-[2.6rem]">{service.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/75 sm:text-base">{service.short}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-md overflow-hidden text-sm leading-relaxed text-paper/90"
            >
              <span className="block pt-3">{service.long}</span>
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-3 text-sm font-semibold"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ember text-ink transition-transform duration-500 ease-expo group-hover:scale-110">
            <Plus className={`h-4 w-4 transition-transform duration-500 ${open ? 'rotate-45' : ''}`} />
          </span>
          <span className="link-underline">{open ? 'Show less' : 'Learn more'}</span>
        </button>
      </div>
    </motion.article>
  )
}

/* ---------- Product card (3D tilt) ---------- */
export function ProductCard({ product, index, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative shrink-0 overflow-hidden rounded-[26px] bg-sand ${className}`}
      data-cursor="hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Img id={product.image} alt={`Custom branded ${product.name.toLowerCase()}`} w={800} sizes="(min-width:1024px) 380px, 80vw" className="transition-transform duration-[1.2s] ease-expo group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: useTransform(glareX, (g) => `radial-gradient(circle at ${g} 30%, rgba(255,255,255,0.22), transparent 55%)`) }} />
        <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 font-display text-[11px] font-bold text-ink backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
        <span className="absolute right-5 top-5 grid h-11 w-11 -translate-y-2 place-items-center rounded-full bg-ember text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-paper sm:p-6">
          <h3 className="display text-xl leading-[1.02] [overflow-wrap:anywhere] sm:text-[1.4rem]">{product.name}</h3>
          <div className="grid grid-rows-[0fr] transition-all duration-700 ease-expo group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-3 text-sm leading-relaxed text-paper/80">{product.desc}</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ember">
                Enquire <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ---------- Blog card ---------- */
export function BlogCard({ post, index = 0, large = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block" data-cursor="hover">
        <div className={`relative overflow-hidden rounded-[24px] bg-sand ${large ? 'aspect-[16/11]' : 'aspect-[4/3]'}`}>
          <Img id={post.image} alt={post.title} w={900} sizes="(min-width:1024px) 33vw, 100vw" className="transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink">{post.category}</span>
          <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-ember text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-5 flex items-center gap-3 text-xs font-medium text-stone-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-stone-400" />
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime} min read</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-ember-dark sm:text-2xl">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          <span className="link-underline">Read more</span> <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.article>
  )
}
