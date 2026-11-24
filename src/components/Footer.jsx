import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Instagram, Mail } from 'lucide-react'
import { Logo, NAV } from './Navbar'
import { SITE } from '../data/site'
import { services } from '../data/services'
import { products } from '../data/products'
import Marquee, { Star } from './Marquee'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink text-paper grain">
      <div className="border-b border-paper/10 py-6">
        <Marquee
          items={['Ideas that make an impression', 'Custom printing', 'Corporate gifting', 'Branded merchandise']}
          speed={50}
          itemClassName="px-8 font-display text-2xl font-bold uppercase tracking-tight text-paper/80 sm:text-3xl"
          separator={<Star className="h-5 w-5 text-ember" />}
          className="items-center"
        />
      </div>

      <div className="container-site relative z-10 grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Turning creative ideas into brand experiences. Premium custom printing, corporate gifting and branded merchandise that makes your brand unforgettable.
          </p>
          <a href={`mailto:${SITE.email}`} className="group mt-8 inline-flex items-center gap-3 text-lg font-medium sm:text-xl" data-cursor="hover">
            <Mail className="h-5 w-5 text-ember" />
            <span className="link-underline">{SITE.email}</span>
          </a>
          <div className="mt-6 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instill Idees on Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-ink">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterCol title="Navigate" className="lg:col-span-2">
          {NAV.map((n) => (
            <li key={n.to}><Link to={n.to} className="link-underline">{n.label}</Link></li>
          ))}
          <li><Link to="/contact" className="link-underline text-ember">Get a Quote</Link></li>
        </FooterCol>

        <FooterCol title="Services" className="lg:col-span-3">
          {services.map((s) => (
            <li key={s.id}><Link to="/about#services" className="link-underline">{s.title}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Products" className="lg:col-span-3">
          <li className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {products.slice(0, 10).map((p) => (
              <Link key={p.name} to="/#products" className="link-underline w-fit">{p.name}</Link>
            ))}
          </li>
        </FooterCol>
      </div>

      <div className="container-site relative z-10">
        <p className="select-none font-display text-[19vw] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-paper/[0.06] lg:text-[16.5vw]" aria-hidden="true">
          Instill
        </p>
      </div>

      <div className="relative z-10 border-t border-paper/10">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 text-xs text-paper/50 sm:flex-row sm:items-center">
          <p>© {year} Instill Idees. Ideas That Make an Impression.</p>
          <p className="flex items-center gap-1">Brand names shown are trademarks of their respective owners.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 font-medium text-paper/80 hover:text-ember">
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children, className = '' }) {
  return (
    <div className={className}>
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
        {title} <ArrowUpRight className="h-3 w-3" />
      </h3>
      <ul className="mt-6 space-y-2.5 text-sm text-paper/80">{children}</ul>
    </div>
  )
}
