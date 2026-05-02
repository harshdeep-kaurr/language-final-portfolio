module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
        display: ['"Baloo 2"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'psq-blue': '#0ea5a4',
        'psq-pink': '#ff6b6b',
        'psq-yellow': '#ffd166'
      }
    },
  },
  plugins: [],
}
