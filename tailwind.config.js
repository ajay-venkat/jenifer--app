/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#F26389',
          pinkHover: '#E04E75',
          pinkLight: '#FDECF1',
          pinkSoft: '#FFF2F5',
          brown: '#54210E',
          brownLight: '#7A351A',
          brownDark: '#381406',
          teal: '#6FC3C0',
          tealLight: '#E8F7F6',
          tealDark: '#4AA3A0',
          cream: '#FFFDFB',
          creamDark: '#F7F3EE',
          sand: '#EFE7DE',
          gold: '#D4A359',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        logo: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 8px 30px rgba(84, 33, 14, 0.08)',
        'pink': '0 10px 25px -5px rgba(242, 99, 137, 0.35)',
        'teal': '0 8px 20px -4px rgba(111, 195, 192, 0.3)',
        'card': '0 4px 20px rgba(84, 33, 14, 0.05)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.9' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.2s ease-out',
      }
    },
  },
  plugins: [],
}
