import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, PenLine } from 'lucide-react'
import { useMeta } from '../hooks'
import Img from '../components/Img'
import Button from '../components/Button'
import { BlogCard } from '../components/Cards'
import { SplitLines, Reveal, MaskReveal, EASE } from '../components/Reveal'
import { posts, formatDate, AUTHOR } from '../data/blogPosts'
import NotFound from './NotFound'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />
  return <Article post={post} />
}

function Article({ post }) {
  useMeta(post.title, post.excerpt)
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const articleRef = useRef(null)
  const { scrollYProgress: readProgress } = useScroll({ target: articleRef, offset: ['start 30%', 'end 70%'] })

  const related = [...posts.filter((p) => p.slug !== post.slug && p.category === post.category), ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3)

  return (
    <>
      <section className="bg-paper pb-12 pt-32 sm:pt-40">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-ink">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
            </Link>
          </motion.div>
          <div className="mt-8 max-w-5xl">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="inline-block rounded-full bg-ember px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              {post.category}
            </motion.span>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              <SplitLines animateOnMount delay={0.55} lines={[post.title]} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease: EASE }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600">
              <span className="inline-flex items-center gap-2"><PenLine className="h-4 w-4 text-ember" />{AUTHOR}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-ember" /><time dateTime={post.date}>{formatDate(post.date)}</time></span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-ember" />{post.readTime} min read</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={ref} className="bg-paper">
        <div className="container-site">
          <MaskReveal className="relative aspect-[16/9] overflow-hidden rounded-[32px] sm:aspect-[21/9]" delay={0.6}>
            <motion.div className="absolute inset-0" style={reduce ? {} : { y, scale: 1.1 }}>
              <Img id={post.image} alt={post.title} w={1800} eager />
            </motion.div>
          </MaskReveal>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Reading progress</span>
              <div className="mt-4 h-40 w-px bg-ink/10">
                <motion.div className="h-full w-full origin-top bg-ember" style={{ scaleY: readProgress }} />
              </div>
              <p className="mt-6 max-w-[14rem] text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
            </div>
          </aside>

          <article ref={articleRef} className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {post.content.map((b, i) => {
              if (b.h) return <Reveal key={i} y={20}><h2 className="mb-5 mt-14 font-display text-3xl font-bold tracking-tight sm:text-4xl">{b.h}</h2></Reveal>
              if (b.quote)
                return (
                  <Reveal key={i}>
                    <blockquote className="my-12 border-l-4 border-ember pl-6 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">“{b.quote}”</blockquote>
                  </Reveal>
                )
              if (b.list)
                return (
                  <Reveal key={i}>
                    <ul className="my-6 space-y-3">
                      {b.list.map((li) => (
                        <li key={li} className="flex gap-4 text-lg leading-relaxed text-stone-600">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />{li}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )
              if (b.img)
                return (
                  <figure key={i} className="my-12">
                    <MaskReveal className="aspect-[16/10] overflow-hidden rounded-3xl"><Img id={b.img} alt={b.caption} w={1200} sizes="(min-width:1024px) 48rem, 100vw" /></MaskReveal>
                    <figcaption className="mt-3 text-sm text-stone-500">{b.caption}</figcaption>
                  </figure>
                )
              return (
                <Reveal key={i} y={20}>
                  <p className={`mb-6 leading-relaxed text-stone-600 ${i === 0 ? 'text-xl text-ink sm:text-2xl first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-ember' : 'text-lg'}`}>{b.p}</p>
                </Reveal>
              )
            })}

            <Reveal className="mt-16 overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-12">
              <span className="eyebrow text-paper/60">Inspired?</span>
              <p className="display mt-4 text-3xl leading-[1] sm:text-4xl">Let's turn this idea into merchandise for <span className="serif-i text-ember">your brand.</span></p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact" variant="primary">Start Your Project</Button>
                <Button to="/blog" variant="light" icon={false}>More Articles</Button>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-warm py-20 sm:py-28">
        <div className="container-site">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-big"><SplitLines lines={['Related', <span key="r" className="serif-i text-ember">articles.</span>]} /></h2>
            <Link to="/blog" className="link-underline hidden text-sm font-semibold sm:inline">View all</Link>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}
