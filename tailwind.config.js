/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#00f6ff',
          indigo: '#3b82f6',
          dark: '#0a0f1c',
          darker: '#050914',
          gray: '#1f2937',
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #050914 0%, #0a0f1c 100%)',
        'cyber-glow': 'radial-gradient(circle at center, rgba(0, 246, 255, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};