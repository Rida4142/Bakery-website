// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        primaryHover: '#D62839',
        secondary: '#F4C542',
        background: '#FFF8F5',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        whatsapp: '#25D366',
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
        },
      },
      borderRadius: {
        xl: '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}