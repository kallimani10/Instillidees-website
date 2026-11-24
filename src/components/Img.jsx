import { useState } from 'react'
import { img, FALLBACK_IMG } from '../lib/img'

/** Responsive, lazy-loaded Unsplash image with graceful fallback. */
export default function Img({ id, alt, w = 1200, className = '', eager = false, sizes = '100vw', ...rest }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const src = failed ? FALLBACK_IMG : img(id, w)
  const srcSet = failed ? undefined : [Math.round(w / 2), w, Math.round(w * 1.5)].map((x) => `${img(id, x)} ${x}w`).join(', ')
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  )
}
