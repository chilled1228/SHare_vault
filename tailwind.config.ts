import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-neutral': '#EFEFEF',
        'warm-orange': '#EF9651',
        'bold-red-orange': '#EC5228',
        'primary-text': '#212121',
        'secondary-text': '#666666',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          black: {
            DEFAULT: '#1A1A1A',
            light: '#2A2A2A',
            dark: '#0A0A0A',
          },
          blue: {
            DEFAULT: '#007BFF',
            light: '#3395FF',
            dark: '#0056B3',
          },
          purple: {
            DEFAULT: '#8E44AD',
            light: '#A061C3',
            dark: '#6C3483',
          },
          'sky-blue': {
            DEFAULT: '#3498DB',
            light: '#5DADE2',
            dark: '#217DBB',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config