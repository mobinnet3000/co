/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0F1821',
          900: '#14202B',
          800: '#1D2D3D', // Primary deep slate navy from brand palette
          700: '#263B4E',
          600: '#324C64',
        },
        brand: {
          amber: '#EFA73F',       // Industrial Gold / Ochre from palette
          amberDark: '#D48E28',
          amberLight: '#F7BC5F',
          crimson: '#C92127',     // Mineral Red from palette
          crimsonDark: '#A8181D',
          sand: '#F7F3EE',        // Luxury warm sand / cream from palette
          sandLight: '#FAF7F3',
          sandDark: '#EAE1D7',
          border: '#E3DAD0',      // Minimal refined border
          textPrimary: '#182736', // Primary dark typography
          textSecondary: '#6B7B8C', // Muted elegant typography
          blue: '#254C6E',
          cyan: '#3EA5B8',
          success: '#2B8367',
        }
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(29, 45, 61, 0.04), 0 4px 12px rgba(29, 45, 61, 0.03)',
        'card': '0 4px 20px -2px rgba(29, 45, 61, 0.06), 0 2px 6px -1px rgba(29, 45, 61, 0.03)',
        'elevated': '0 20px 40px -10px rgba(29, 45, 61, 0.1), 0 8px 16px -4px rgba(29, 45, 61, 0.04)',
        'glow-amber': '0 0 25px rgba(239, 167, 63, 0.3)',
        'glow-crimson': '0 0 25px rgba(201, 33, 39, 0.25)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
