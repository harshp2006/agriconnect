/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // AgriConnect palette — evokes mandi (market) price boards and
        // the fields/harvest the platform is actually about.
        leaf: {
          DEFAULT: '#2F5233', // primary brand — deep leaf green
          light: '#6B8F47',
          dark: '#1E3620',
        },
        turmeric: {
          DEFAULT: '#D68A1B', // secondary accent — price tags, CTAs
          light: '#F0AC49',
          dark: '#A8690E',
        },
        wheat: '#F6EFDD', // warm background, not stark white
        soil: {
          DEFAULT: '#2A211C', // primary text
          light: '#5C4F45',
        },
        sky: '#3E7C9E', // used sparingly — logistics/info/links
        alert: '#B3462C',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
