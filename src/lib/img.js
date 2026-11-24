// Image helpers — photography from Unsplash (free licence) and video from Pexels (free licence).
export const img = (id, w = 1400, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`

export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#E3D9C6'/><stop offset='1' stop-color='#CDBFA6'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><text x='400' y='310' text-anchor='middle' font-family='Arial Black,Arial' font-weight='900' font-size='44' fill='#0E0E0C' opacity='.35'>INSTILL IDEES</text></svg>"
  )

// Curated photo library
export const P = {
  giftHands: 'photo-1625552187571-7ee60ac43d2b',
  giftOrange: 'photo-1760602672748-6a570286ce73',
  giftOffice: 'photo-1762504366698-46550e162068',
  giftOffice2: 'photo-1762504634376-740d95eec2e4',
  giftKit: 'photo-1637904731042-2ef367b8c00c',
  giftLuxury: 'photo-1780744871735-389971c863cf',
  giftRibbon: 'photo-1625552185129-ce83004d37b1',
  giftOpen: 'photo-1625552185153-7a8d8f3794a3',
  mugGiftBox: 'photo-1765534379403-5a052c172cff',
  toteInitials: 'photo-1625552189081-9a268f141875',
  tumblerBlue: 'photo-1568395216634-ab1b1e848751',
  tumblerOrange: 'photo-1517265170777-6d1d1be7a89f',
  bottleSports: 'photo-1623789658209-00c06091e6eb',
  bottleHand: 'photo-1601937286283-1c4550e05f58',
  mugLogo: 'photo-1770615674580-24736c2a593f',
  mugSun: 'photo-1770615674400-92006cec2a2d',
  teeWhite: 'photo-1581655353564-df123a1eb820',
  teeBlack: 'photo-1583743814966-8936f5b7be1a',
  teeModel: 'photo-1521572163474-6864f9cf17ab',
  teeFolded: 'photo-1562157873-818bc0726f68',
  hoodieWhite: 'photo-1620799140188-3b2a02fd9a77',
  hoodieGrey: 'photo-1556821840-3a63f95609a7',
  screenYellow: 'photo-1773525912476-213bff96b8a4',
  screenIndustrial: 'photo-1773525912431-ee1eff5e1ab9',
  screenRed: 'photo-1773525912489-9e04df48f639',
  screenHand: 'photo-1456456496250-d5e7c0a9b44d',
  swatches: 'photo-1581079289196-67865ea83118',
  embroidery: 'photo-1772351720165-d9218e428cf0',
  laserPurple: 'photo-1615378809683-6737a9e362f2',
  laserLight: 'photo-1615286922420-c6b348ffbd62',
  engravedMetal: 'photo-1732257297170-09599f1bbaec',
  printer: 'photo-1615378809998-afc205e73bad',
  notebookPen: 'photo-1677064061401-f77f966ff8a1',
  notebookGreen: 'photo-1654542645651-5196f4931cd6',
  toteWhite: 'photo-1574365569389-a10d488ca3fb',
  toteBeige: 'photo-1544816155-12df9643f363',
  penGold: 'photo-1518674660708-0e2c0473e68e',
  penBook: 'photo-1471107340929-a87cd0f5b5f3',
  penCase: 'photo-1782829522362-1375968d0e6a',
  headphones: 'photo-1505740420928-5e560c06d30e',
  headphonesBlack: 'photo-1618366712010-f4ae9c647dcb',
  earbuds: 'photo-1583167634072-eab152a8d967',
  backpack: 'photo-1553062407-98eeb64c6a62',
  boxKraft: 'photo-1595246135406-803418233494',
  boxColour: 'photo-1617825295690-28ae56c56135',
  coffeePack: 'photo-1633533452148-a9657d2c9a5f',
  filmBoxes: 'photo-1771255217927-c231e19812e2',
  accessories: 'photo-1629139033414-76f3c0eacf84',
  watch: 'photo-1584184804426-5e2aa23c2937',
  team: 'photo-1572021335469-31706a17aaef',
  teamLaptop: 'photo-1603201667230-bd139210db18',
  desk: 'photo-1676282831194-f7dcd46eafef',
}

export const VIDEOS = {
  screenPrint: 'https://videos.pexels.com/video-files/34888657/14781068_1280_720_30fps.mp4',
  screenPrintPortrait: 'https://videos.pexels.com/video-files/34692310/14704405_720_1280_30fps.mp4',
}
