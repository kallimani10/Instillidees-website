// Names as listed on instillidees.in ("Brands We Offer" and "Brands We Worked With").
// Rendered as typographic wordmarks — no official logos are reproduced.
export const brandGroups = [
  { category: 'Bags', brands: ['FurJaden', 'Fuzo', 'Lapis Bard', 'Mokobara', 'Nasher Miles', 'Offikraft', 'Skross', 'Wildcraft'] },
  { category: 'Bottles', brands: ['Aquaminder', 'Borosil', 'Cello', 'Milton'] },
  { category: 'Electronics', brands: ['boAt', 'JBL', 'Philips', 'HP', 'Wonderchef'] },
  { category: 'Pens', brands: ['Lamy', 'Montblanc', 'Parker'] },
  { category: 'Apparel', brands: ['Puma', "Levi's", 'Swiss Military'] },
]

export const allBrands = brandGroups.flatMap((g) => g.brands.map((b) => ({ name: b, category: g.category })))

export const clients = [
  'Bajaj Allianz', 'Daikin', 'Bajaj Finserv', 'Bank of Baroda', 'BlueStone', 'PayU', 'OYO',
  'Realme', 'Trident Group', 'Landmark Group', 'UrbanClap', 'Josh Talks', 'Wingify', 'Indian Bank',
]
