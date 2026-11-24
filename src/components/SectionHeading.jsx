import { SplitLines, Reveal } from './Reveal'

/** Editorial section heading: eyebrow + split-line display title + optional intro. */
export default function SectionHeading({ eyebrow, lines, intro, className = '', dark = false, align = 'left', size = 'big' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal y={16}>
          <span className={`eyebrow ${dark ? 'text-paper/70' : 'text-stone-600'}`}>{eyebrow}</span>
        </Reveal>
      )}
      <h2 className={`display mt-5 ${size === 'huge' ? 'text-huge' : 'text-big'} ${dark ? 'text-paper' : 'text-ink'}`}>
        <SplitLines lines={lines} />
      </h2>
      {intro && (
        <Reveal delay={0.15} y={20}>
          <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-paper/70' : 'text-stone-600'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
