/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    letterSpacing: {
      widest: '.2em'
    },
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadein: 'fadein 0.25s ease-in-out',
      }
    },
    screens: {
      "desktop": "1280px",
      "tablet": "1024px",
      'lg_2': '900px',
      'mobile_lg': "500px",
      'sm': "640px",
      'md': "768px",
      "mobile_md": "450px"
    }
  },
  plugins: [],
}
