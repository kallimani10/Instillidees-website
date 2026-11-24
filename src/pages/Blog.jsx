import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, Clock, Search } from 'lucide-react'
import { useMeta } from '../hooks'
import Img from '../components/Img'
import Button from '../components/Button'
import { BlogCard } from '../components/Cards'
import { SplitLines, Reveal, MaskReveal, EASE } from '../components/Reveal'
import { CTASection } from '../components/Sections'
import { posts, categories, formatDate } from '../data/blogPosts'

export default function Blog() {
  useMeta('Blog — Ideas, Inspiration & Brand Stories', 'Insights on corporate gifting, branding, custom printing and merchandise trends from the Instill Idees editorial team.')
  const [active, setActive] = useState('All Articles')
  const [query, setQuery] = useState('')
  const featured = posts.find((p) => p.featured) || posts[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (active === 'All Articles' || p.category === active) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    )
  }, [active, query])

  return (
    <>
      <section className="relative overflow-hidden bg-paper pb-16 pt-32 sm:pt-40">
        <div className="container-site">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="eyebrow text-stone-600">The Instill Journal</motion.span>
          <h1 className="display mt-6 text-huge">
            <SplitLines animateOnMount delay={0.5} lines={['Ideas, inspiration', <>& brand <span className="serif-i text-ember">stories.</span></>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600">
            Explore insights, creative inspiration, branding strategies, and the latest trends in customized merchandise and corporate gifting.
          </motion.p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-paper pb-20">
        <div className="container-site">
          <Link to={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[32px] bg-ink text-paper lg:grid-cols-12" data-cursor="hover">
            <MaskReveal className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[520px]" delay={0.7}>
              <Img id={featured.image} alt={featured.title} w={1400} eager sizes="(min-width:1024px) 58vw, 100vw" className="transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
              <span className="absolute left-5 top-5 rounded-full bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink">Featured</span>
            </MaskReveal>
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12 lg:col-span-5">
              <div>
                <span className="rounded-full border border-paper/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider">{featured.category}</span>
                <h2 className="display mt-6 text-3xl leading-[1] sm:text-4xl xl:text-5xl">{featured.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-paper/70">{featured.excerpt}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-xs text-paper/60">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-paper/40" />
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime} min read</span>
                </div>
                <span className="inline-flex items-center gap-3 rounded-full bg-paper py-2 pl-5 pr-2 text-sm font-semibold text-ink transition-colors duration-500 group-hover:bg-ember">
                  Read Article
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper"><ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" /></span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-paper pb-24 sm:pb-32">
        <div className="container-site">
          <div className="sticky top-[72px] z-20 -mx-4 mb-12 border-y border-ink/10 bg-paper/90 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <LayoutGroup>
                <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Blog categories">
                  {categories.map((c) => (
                    <button
                      key={c}
                      role="tab"
                      aria-selected={active === c}
                      onClick={() => setActive(c)}
                      className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${active === c ? 'text-paper' : 'text-ink/70 hover:text-ink'}`}
                    >
                      {active === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span className="relative">{c}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
              <label className="relative flex items-center lg:w-72">
                <span className="sr-only">Search articles</span>
                <Search className="pointer-events-none absolute left-4 h-4 w-4 text-stone-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  className="h-11 w-full rounded-full border border-ink/15 bg-paper pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-stone-500 focus:border-ink"
                />
              </label>
            </div>
          </div>

          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="display text-2xl sm:text-3xl">{active}</h2>
            <span className="text-sm text-stone-500">{filtered.length} article{filtered.length === 1 ? '' : 's'}</span>
          </div>

          <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <Reveal className="rounded-3xl border border-dashed border-ink/20 p-12 text-center">
              <p className="font-display text-2xl font-bold">No articles found.</p>
              <p className="mt-2 text-stone-600">Try another category or search term.</p>
              <button onClick={() => { setActive('All Articles'); setQuery('') }} className="mt-6 text-sm font-semibold underline underline-offset-4">Reset filters</button>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        lines={['Have a brand', <>idea <span className="serif-i">brewing?</span></>]}
        text="Turn the inspiration into something tangible. Tell us what you're planning and we'll help you bring it to life."
      />
    </>
  )
}
