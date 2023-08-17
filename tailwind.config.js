const { colors } = require('@doist/todoist-api-typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
"./script.js"],
  theme: {
    extend: {
      fill:{
        paysActifs:"#fefefa",
        land: "#edeae0"
      },
      borderColor:{
        paysActifs:"#e1e1e1"
      },
      borderWidth:{
        paysActifs: "0.5px"
      },
      flexShrink:{
        paysActifs: "1"
      },
      color: {
        dark: "#292929"
      },
      fontFamily: {
        display: "Catamaran",
        main: "'Neue Montreal'"
      }
    },
  },
  plugins: [],
}

