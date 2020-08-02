// ./src/tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      display: ["Helvetica", "sans-serif"],
      body: ["Helvetica-Neue", "sans-serif"]
    },
    extend: {
      colors: {
        gray: {
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121"
        }
      },
      backgroundColor: {
        'black-t-50': 'rgba(0,0,0,0.5)'
      }
    }
  },
  variants: {
    opacity :  ['responsive' ,' hover']
  },
  plugins: []
};
