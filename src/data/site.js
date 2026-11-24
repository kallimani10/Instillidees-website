import { P } from '../lib/img'

export const SITE = {
  name: 'Instill Idees',
  email: 'instillidees@gmail.com',
  instagram: 'https://instagram.com/instillidees',
  instagramHandle: '@instillidees',
}

export const process = [
  { n: '01', title: 'Consultation', text: 'We understand your branding goals, audience, quantities, timelines and expectations.', image: P.teamLaptop },
  { n: '02', title: 'Creative Design', text: 'We develop artwork, branding concepts and realistic product mockups for your approval.', image: P.swatches },
  { n: '03', title: 'Production', text: 'Concepts come to life through printing, engraving, customisation and careful finishing.', image: P.screenYellow },
  { n: '04', title: 'Delivery', text: 'Every piece is quality-checked, packaged with care and delivered ready to impress.', image: P.boxKraft },
]

// Figures derived from what instillidees.in itself lists (partner brand logos, catalogue
// categories, and the stated "single sample to 10,000+ units" order range).
export const facts = [
  { value: 30, suffix: '+', label: 'Partner brands in our catalogue' },
  { value: 9, suffix: '', label: 'Product categories to customise' },
  { value: 10000, suffix: '+', label: 'Units per order — from a single sample up' },
]

export const faqs = [
  { q: 'What types of products can be customized?', a: 'Almost anything in our catalogue — bottles, drinkware, bags, electronics, notebooks and diaries, pens, t-shirts, hoodies, accessories and complete gift combos. We recommend the best technique (UV, screen, digital, embroidery or laser engraving) for each material.' },
  { q: 'Do you offer corporate gifting solutions?', a: 'Yes. We curate, brand and package gifts for employee onboarding, festivals, client appreciation, events and milestones — handling everything from product selection to final packing.' },
  { q: 'Can products be customized with our company logo?', a: 'Absolutely. Share your logo and brand guidelines and our design team will prepare artwork and mockups for your approval before production begins.' },
  { q: 'Do you offer bulk merchandise orders?', a: 'Yes. We handle everything from a single sample to large runs of 10,000+ units, keeping quality consistent across the entire order.' },
  { q: 'Can we request customized gift kits?', a: 'Of course. Tell us your audience, budget and occasion and we will propose kit combinations, custom packaging and inserts tailored to your brand.' },
  { q: 'How can we request a quotation?', a: 'Fill in the enquiry form on this page or email us at instillidees@gmail.com with the products, quantities and timelines you have in mind. We usually respond within 24 hours.' },
]
