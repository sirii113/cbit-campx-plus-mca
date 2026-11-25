/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cbit: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          500: '#1e3a8a', // Deep CBIT Navy
          600: '#1d4ed8',
          700: '#172554',
          800: '#0f172a',
          900: '#090d16',
          gold: '#f59e0b',
          amber: '#d97706',
          cyan: '#06b6d4',
          neon: '#6366f1'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' }
        },
        equalizer: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        equalizer: 'equalizer 0.8s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
