/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1A365D',
          900: '#0F2744',
        },
        magenta: '#E91E63',
      },
      minHeight: {
        hero: '70vh',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        diaspoboost: {
          primary: '#1A365D',
          'primary-content': '#FFFFFF',
          secondary: '#E91E63',
          'secondary-content': '#FFFFFF',
          accent: '#E91E63',
          'accent-content': '#FFFFFF',
          neutral: '#0F172A',
          'neutral-content': '#F8FAFC',
          'base-100': '#FFFFFF',
          'base-200': '#F8FAFC',
          'base-300': '#E2E8F0',
          'base-content': '#0F172A',
          info: '#1A365D',
          success: '#0F766E',
          warning: '#B45309',
          error: '#BE123C',
        },
      },
    ],
    darkTheme: 'diaspoboost',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
