/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        'primary-foreground': '#FFFFFF',
        secondary: '#F4F4F5',
        accent: '#10B981',
        border: '#E4E4E7',
        muted: '#71717A',
      },
      borderRadius: {
        card: '20px',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
}
