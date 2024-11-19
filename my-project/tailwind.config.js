/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#406DFF',
        'secondary' : '#406DFF',
        'yellow' : '#FFF34A',
        'Success' : '#2AFF00',
        'Error' : '#FF0000',
        'Warning' : '#FFEE00',
        'myth' : '#0019FF',
        'redHover' : '#F90102',
        'redErr' : '#ff0000',
        'purpleBtn' : '#6e59f7',
        'blackColor' : '#070707'
      },
      boxShadow : {
        'myShadow' : '0px 0px 5px .5px rgba(42, 42, 42,0.81)'
      },
      textColor : {
        'main' : '#151515',
        'sup' : '#5d5d5d'
      },
      screens : {
        'lLaptop' : '1280px'
      },
      fontFamily : {
        'kode' : ['Kode Mono','monospace'],
        'honk' : ["Honk", 'system-ui']
      }
    },
  },
  plugins: [],
}

