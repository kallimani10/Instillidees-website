import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'

/** Thin accent progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-ember" style={{ scaleX }} aria-hidden="true" />
}

/** Desktop-only custom cursor; grows over interactive elements. Never hides the native cursor. */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    setEnabled(mq.matches && !reduce)
    const update = () => setEnabled(mq.matches && !reduce)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target
      setHover(!!(t.closest && t.closest('a, button, [data-cursor="hover"], input, select, textarea, label')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full bg-ember mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12, opacity: visible ? 0.9 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-hidden="true"
    />
  )
}
