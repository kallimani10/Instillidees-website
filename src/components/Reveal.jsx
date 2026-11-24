import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Fade + rise into view on scroll. */
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div', once = true }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: reduce ? 0.3 : 1, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/**
 * Split-text masked reveal. Pass `lines` as an array; each item may be a string or
 * a React node (for italic accents). Each line slides up from behind a mask.
 */
export function SplitLines({ lines, className = '', lineClassName = '', delay = 0, animateOnMount = false }) {
  const reduce = useReducedMotion()
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } }
  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden pb-[0.06em] ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '110%', rotate: 2 },
              show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Word-by-word staggered reveal for paragraphs / sub-heads. */
export function SplitWords({ text, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '100%', opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: delay + i * 0.025 } },
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Image reveal with a sliding clip-path mask. */
export function MaskReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const reduce = useReducedMotion()
  const from = { up: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' }[direction]
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: from }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export { EASE }
