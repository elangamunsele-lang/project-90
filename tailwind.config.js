/** @type{import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2fb',
          100: '#d6def4',
          200: '#aebde9',
          300: '#7f97da',
          400: '#5576c4',
          500: '#3a5aa8',
          600: '#2c478c',
          700: '#1f3470',
          800: '#162456',
          900: '#0d1738',
          950: '#070d24',
        },
        gold: {
          50: '#fbf7ea',
          100: '#f6ebc9',
          200: '#edd88e',
          300: '#e3c157',
          400: '#d6a92f',
          500: '#bf8f23',
          600: '#a3721d',
          700: '#7e531a',
          800: '#573a17',
          900: '#3a2812',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,23,56,0.04), 0 8px 24px -12px rgba(13,23,56,0.18)',
        cardhover: '0 2px 4px rgba(13,23,56,0.06), 0 18px 36px -14px rgba(13,23,56,0.28)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
