import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary: 'bg-ember text-ink hover:text-paper',
  dark: 'bg-ink text-paper hover:text-ink',
  light: 'bg-paper text-ink hover:text-paper',
  outline: 'border border-current bg-transparent hover:text-paper',
}
const fills = { primary: 'bg-ink', dark: 'bg-ember', light: 'bg-ink', outline: 'bg-ink' }

/**
 * Magnetic pill button. Renders a router Link (`to`), anchor (`href`) or button.
 */
export default function Button({ to, href, children, variant = 'primary', icon = true, className = '', size = 'md', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const sizes = { md: 'h-12 pl-6 pr-2 text-sm', lg: 'h-14 sm:h-16 pl-7 pr-2.5 text-sm sm:text-base' }
  const cls = `group relative inline-flex items-center gap-4 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-500 ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      <span className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-expo group-hover:scale-y-100 ${fills[variant]}`} aria-hidden="true" />
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className={`relative z-10 grid place-items-center rounded-full ${size === 'lg' ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-8 w-8'} ${variant === 'primary' ? 'bg-ink text-paper group-hover:bg-ember group-hover:text-ink' : variant === 'dark' ? 'bg-ember text-ink group-hover:bg-ink group-hover:text-paper' : 'bg-ink text-paper group-hover:bg-ember group-hover:text-ink'} transition-colors duration-500`}>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:rotate-45" />
        </span>
      )}
      {!icon && <span className="w-4" />}
    </>
  )

  const Comp = to ? Link : href ? 'a' : 'button'
  const props = to ? { to } : href ? { href } : { type: rest.type || 'button' }
  return (
    <motion.span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className="inline-block">
      <Comp {...props} {...rest} className={cls} data-cursor="hover">
        {inner}
      </Comp>
    </motion.span>
  )
}
