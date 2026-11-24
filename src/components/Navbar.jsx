import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Mail } from 'lucide-react'
import Button from './Button'
import { SITE } from '../data/site'
import { EASE } from './Reveal'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
]

export function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Instill Idees — home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ember font-display text-lg font-extrabold leading-none text-ink transition-transform duration-500 ease-expo group-hover:rotate-[-8deg]">
        ii
      </span>
      <span className={`font-display text-lg font-bold uppercase leading-none tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
        Instill<span className="serif-i ml-1 text-[1.15em] text-ember">Idees</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo ${
          scrolled && !open ? 'bg-paper/80 py-3 shadow-[0_1px_0_rgba(14,14,12,0.08)] backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-site flex items-center justify-between" aria-label="Main">
          <Logo light={open} className="relative z-[60]" />

          <ul className="hidden items-center gap-1 rounded-full border border-ink/10 bg-paper/60 p-1.5 backdrop-blur-md lg:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-paper' : 'text-ink/70 hover:text-ink'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="link-underline relative z-10">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button to="/contact" variant={open ? 'light' : 'dark'} size="md">Get a Quote</Button>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`relative z-[60] grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 lg:hidden ${open ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-5">
                <motion.span animate={open ? { rotate: 45, top: 5 } : { rotate: 0, top: 0 }} transition={{ duration: 0.4, ease: EASE }} className="absolute left-0 block h-[2px] w-5 rounded bg-current" />
                <motion.span animate={open ? { rotate: -45, top: 5, width: 20 } : { rotate: 0, top: 10, width: 14 }} transition={{ duration: 0.4, ease: EASE }} className="absolute left-0 block h-[2px] rounded bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-4 pb-8 pt-28 text-paper sm:px-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.75rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.75rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.75rem)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <li key={item.to} className="overflow-hidden border-b border-paper/10">
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `flex items-center justify-between py-5 font-display text-[2.6rem] font-extrabold uppercase leading-none tracking-tight sm:text-6xl ${isActive ? 'text-ember' : 'text-paper'}`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-sans text-xs font-medium tracking-widest text-paper/40">0{i + 1}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-7 w-7" />
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div className="mt-auto pt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <Button to="/contact" variant="primary" size="lg">Get a Quote</Button>
              <div className="mt-8 flex flex-col gap-3 text-sm text-paper/70">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{SITE.email}</a>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Instagram className="h-4 w-4" />{SITE.instagramHandle}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
