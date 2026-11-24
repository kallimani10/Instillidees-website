import { useMeta } from '../hooks'
import Button from '../components/Button'
import { SplitLines } from '../components/Reveal'

export default function NotFound() {
  useMeta('Page not found')
  return (
    <section className="flex min-h-[80vh] items-center bg-paper pt-32">
      <div className="container-site">
        <span className="eyebrow text-stone-600">Error 404</span>
        <h1 className="display mt-6 text-huge">
          <SplitLines animateOnMount delay={0.5} lines={['This page', <span key="m" className="serif-i text-ember">made no impression.</span>]} />
        </h1>
        <p className="mt-6 max-w-md text-lg text-stone-600">The page you're looking for doesn't exist or may have moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" variant="dark" size="lg">Back to Home</Button>
          <Button to="/contact" variant="outline" size="lg" icon={false}>Contact Us</Button>
        </div>
      </div>
    </section>
  )
}
