/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'

  ],
  theme: {
    extend: {

      colors: {
        // Customize your colors here
        sectionbg:"#0A1F44",
        secondary: '#228B22',
        headings:"#FFFFFF",
        textcolor:"#a3a0a0",
        buttons:"#BCEF01",
        cardbg:"#121A23",
        // Add more custom colors as needed
      },
      width: {
        '128': '32rem',
      }
    },
  },
  plugins: [

  ]
}
