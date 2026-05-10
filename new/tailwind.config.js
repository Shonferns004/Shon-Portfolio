/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0e0e10',
        'bg-2': '#161618',
        fg: '#f4f1ea',
        muted: '#7a7872',
        accent: '#22c55e',
        'accent-2': '#4ade80',
        line: '#2a2a2c',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
    },
  },
  plugins: [],
}

