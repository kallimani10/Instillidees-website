import { Fragment } from 'react'

/** CSS-driven infinite marquee (pauses on hover, disabled for reduced motion). */
export default function Marquee({ items, speed = 40, reverse = false, className = '', itemClassName = '', separator }) {
  const list = [...items, ...items]
  return (
    <div className={`marquee relative flex overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ '--speed': `${speed}s` }}>
        {list.map((item, i) => (
          <Fragment key={i}>
            <span className={`shrink-0 whitespace-nowrap ${itemClassName}`} aria-hidden={i >= items.length ? 'true' : undefined}>
              {item}
            </span>
            {separator && <span className="shrink-0" aria-hidden="true">{separator}</span>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
    </svg>
  )
}
