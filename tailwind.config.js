/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E0E0C', soft: '#1A1A17', muted: '#2A2A26' },
        paper: { DEFAULT: '#F4F1EA', warm: '#EFEADF' },
        sand: { DEFAULT: '#E3D9C6', deep: '#CDBFA6' },
        ember: { DEFAULT: '#FF5B1F', dark: '#E2470E', light: '#FF8A5C' },
        stone: { 400: '#9A968C', 500: '#77736A', 600: '#57544D' },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        mega: ['clamp(3.2rem, 10.5vw, 11.5rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
        huge: ['clamp(2.6rem, 7vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        big: ['clamp(2.1rem, 4.6vw, 4.6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      maxWidth: { site: '1440px' },
      transitionTimingFunction: { expo: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
