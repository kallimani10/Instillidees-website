import { useState, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Instagram, ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Clock, ChevronDown, RotateCcw } from 'lucide-react'
import { useMeta } from '../hooks'
import Img from '../components/Img'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { SplitLines, Reveal, MaskReveal, EASE } from '../components/Reveal'
import { FAQ, CTASection } from '../components/Sections'
import { SITE, faqs } from '../data/site'
import { P } from '../lib/img'

const SERVICES = ['Corporate Gifting', 'Custom Printing', 'Branded Merchandise', 'T-Shirt & Apparel Printing', 'Bottle & Mug Printing', 'Promotional Products', 'Laser Engraving', 'Other']
const QUANTITIES = ['1 – 49 units', '50 – 249 units', '250 – 999 units', '1,000 – 4,999 units', '5,000+ units', 'Not sure yet']
const BUDGETS = ['Prefer not to say', 'Under ₹50,000', '₹50,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', '₹5,00,000+']

const EMPTY = { name: '', company: '', email: '', phone: '', service: '', quantity: '', budget: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  else if (v.name.trim().length < 2) e.name = 'Name looks too short.'
  if (!v.company.trim()) e.company = 'Please enter your company name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/[^\d]/g, '')
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (digits.length < 10 || digits.length > 13 || !/^[+\d\s()-]+$/.test(v.phone)) e.phone = 'Please enter a valid phone number.'
  if (!v.service) e.service = 'Please choose a service.'
  if (!v.quantity) e.quantity = 'Please choose an approximate quantity.'
  if (!v.message.trim()) e.message = 'Tell us a little about your project.'
  else if (v.message.trim().length < 20) e.message = 'Please add a few more details (at least 20 characters).'
  return e
}

export default function Contact() {
  useMeta('Contact Us — Get a Quote', 'Request a quote for custom printing, corporate gifting or branded merchandise. Email Instill Idees at instillidees@gmail.com.')
  return (
    <>
      <section className="relative overflow-hidden bg-paper pb-16 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-ember/15 blur-[110px]" aria-hidden="true" />
        <div className="container-site relative">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="eyebrow text-stone-600">Contact us</motion.span>
          <h1 className="display mt-6 text-huge">
            <SplitLines animateOnMount delay={0.5} lines={["Let's make", 'something that', <span key="m" className="serif-i text-ember">matters.</span>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8, ease: EASE }} className="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600">
            Have an idea, a project, or a corporate gifting requirement? Tell us what you're looking for. Let's create something memorable.
          </motion.p>
        </div>
      </section>

      <section className="bg-paper pb-24 sm:pb-32">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <aside className="flex flex-col gap-6 lg:col-span-4">
            <Reveal className="rounded-[28px] bg-ink p-8 text-paper sm:p-10">
              <span className="eyebrow text-paper/60">Write to us</span>
              <a href={`mailto:${SITE.email}`} className="group mt-6 flex items-start justify-between gap-4" data-cursor="hover">
                <span className="break-all font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.65rem]">{SITE.email}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ember text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
              </a>
              <div className="mt-8 space-y-4 border-t border-paper/15 pt-8 text-sm text-paper/70">
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-ember" /> Email is the quickest way to reach us.</p>
                <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-ember" /> We usually respond within 24 hours.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[28px] border border-ink/10 p-8 sm:p-10">
              <span className="eyebrow text-stone-600">Follow our work</span>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="group mt-6 flex items-center justify-between">
                <span className="flex items-center gap-3 font-display text-xl font-bold"><Instagram className="h-5 w-5" />{SITE.instagramHandle}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Reveal>
            <MaskReveal className="relative hidden min-h-[260px] flex-1 overflow-hidden rounded-[28px] lg:block" delay={0.2}>
              <Img id={P.giftOffice2} alt="A corporate gift being presented in an office" w={800} sizes="30vw" />
            </MaskReveal>
          </aside>

          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" lines={['Questions,', <span key="a" className="serif-i text-ember">answered.</span>]} intro="Everything you need to know before starting a merchandise or gifting project with us." />
          </div>
          <div className="lg:col-span-8"><FAQ items={faqs} /></div>
        </div>
      </section>

      <CTASection
        lines={['Your next great', <>brand idea <span className="serif-i">starts here.</span></>]}
        text="Bring us the brief, the deadline or just a spark of an idea. We'll help shape it into something people remember."
        primary="Start Your Project"
        secondary="Email Us"
      />
    </>
  )
}

function EnquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.keys(EMPTY).reduce((a, k) => ({ ...a, [k]: true }), {}))
    if (Object.keys(errs).length) {
      const first = Object.keys(EMPTY).find((k) => errs[k])
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setStatus('loading')
    // Frontend-only: simulate processing. No data leaves the browser.
    setTimeout(() => setStatus('success'), 1400)
  }

  const reset = () => { setValues(EMPTY); setErrors({}); setTouched({}); setStatus('idle') }

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry: ${values.service} — ${values.company}`)}&body=${encodeURIComponent(
    `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nPhone: ${values.phone}\nService: ${values.service}\nQuantity: ${values.quantity}\nBudget: ${values.budget || 'Not specified'}\n\n${values.message}`
  )}`

  const errorCount = Object.keys(errors).filter((k) => touched[k]).length

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-paper-warm p-6 sm:p-10 lg:p-12">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex min-h-[520px] flex-col justify-center" role="status" aria-live="polite">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }} className="grid h-20 w-20 place-items-center rounded-full bg-ember text-ink">
              <CheckCircle2 className="h-10 w-10" />
            </motion.span>
            <h2 className="display mt-8 text-4xl leading-[0.95] sm:text-5xl">Thank you, {values.name.split(' ')[0]}.<br /><span className="serif-i text-ember">Your enquiry is ready.</span></h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600">
              Your details have been checked and prepared. Please note: this website is a frontend preview and <strong className="text-ink">no message has been sent yet</strong>. To reach our team, send your enquiry by email using the button below — it opens your email app with everything pre-filled.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={mailto} variant="dark" size="lg">Send via Email</Button>
              <button onClick={reset} className="inline-flex h-14 items-center gap-2 rounded-full px-6 text-sm font-semibold text-ink hover:bg-ink/5 sm:h-16">
                <RotateCcw className="h-4 w-4" /> New enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="display text-3xl sm:text-4xl">Request a quote</h2>
                <p className="mt-2 text-sm text-stone-600">Fields marked <span className="text-ember-dark">*</span> are required.</p>
              </div>
              <AnimatePresence>
                {errorCount > 0 && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700" role="alert">
                    <AlertCircle className="h-4 w-4" /> {errorCount} field{errorCount > 1 ? 's need' : ' needs'} attention
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id="name" label="Full Name" required error={touched.name && errors.name}>
                <input id="f-name" autoComplete="name" value={values.name} onChange={set('name')} onBlur={blur('name')} placeholder="Your full name" />
              </Field>
              <Field id="company" label="Company Name" required error={touched.company && errors.company}>
                <input id="f-company" autoComplete="organization" value={values.company} onChange={set('company')} onBlur={blur('company')} placeholder="Company or organisation" />
              </Field>
              <Field id="email" label="Email Address" required error={touched.email && errors.email}>
                <input id="f-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email')} placeholder="you@company.com" />
              </Field>
              <Field id="phone" label="Phone Number" required error={touched.phone && errors.phone}>
                <input id="f-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+91 00000 00000" />
              </Field>
              <Field id="service" label="Service Required" required error={touched.service && errors.service} select>
                <select id="f-service" value={values.service} onChange={set('service')} onBlur={blur('service')}>
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field id="quantity" label="Approximate Quantity" required error={touched.quantity && errors.quantity} select>
                <select id="f-quantity" value={values.quantity} onChange={set('quantity')} onBlur={blur('quantity')}>
                  <option value="" disabled>Select a range</option>
                  {QUANTITIES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <span className="mb-3 block text-sm font-semibold">Budget Range <span className="font-normal text-stone-500">(optional)</span></span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget range">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      role="radio"
                      aria-checked={values.budget === b}
                      onClick={() => setValues((v) => ({ ...v, budget: v.budget === b ? '' : b }))}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${values.budget === b ? 'border-ink bg-ink text-paper' : 'border-ink/15 bg-paper hover:border-ink'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <Field id="message" label="Message / Project Details" required error={touched.message && errors.message} className="sm:col-span-2">
                <textarea id="f-message" rows={5} value={values.message} onChange={set('message')} onBlur={blur('message')} placeholder="Tell us about the products, branding, occasion and timeline you have in mind…" />
              </Field>
            </div>

            <div className="mt-10 flex flex-col items-start gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-stone-500">Frontend preview: your details stay in your browser. After checking, you'll be able to send them to us by email.</p>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-ember pl-7 pr-2 text-sm font-semibold text-ink transition-colors duration-500 hover:text-paper disabled:cursor-wait sm:h-16 sm:text-base"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-ink transition-transform duration-500 ease-expo group-hover:scale-y-100" aria-hidden="true" />
                <span className="relative">{status === 'loading' ? 'Preparing…' : 'Submit Enquiry'}</span>
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-paper transition-colors duration-500 group-hover:bg-ember group-hover:text-ink sm:h-11 sm:w-11">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />}
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ id, label, required, error, children, className = '', select = false }) {
  const base = `w-full rounded-2xl border bg-paper px-5 text-base text-ink outline-none transition-all duration-300 placeholder:text-stone-400 focus:border-ink focus:ring-4 focus:ring-ember/20 ${error ? 'border-red-500' : 'border-ink/15'}`
  const enhanced = cloneElement(children, {
    className: `${base} ${children.type === 'textarea' ? 'py-4 resize-y min-h-[140px]' : 'h-14'} ${select ? 'appearance-none pr-12 cursor-pointer' : ''}`,
    'aria-invalid': !!error,
    'aria-describedby': error ? `err-${id}` : undefined,
    'aria-required': required,
  })
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-2.5 block text-sm font-semibold">
        {label} {required && <span className="text-ember-dark" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        {enhanced}
        {select && <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p id={`err-${id}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
