/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ralewaythin: ["Raleway-Thin", "sans-serif"],
        ralewayextralight: ["Raleway-ExtraLight", "sans-serif"],
        ralewaylight: ["Raleway-Light", "sans-serif"],
        ralewayregular: ["Raleway-Regular", "sans-serif"],
        ralewaymedium: ["Raleway-Medium", "sans-serif"],
        ralewaysemibold: ["Raleway-SemiBold", "sans-serif"],
        ralewaybold: ["Raleway-Bold", "sans-serif"],
        ralewayextrabold: ["Raleway-ExtraBold", "sans-serif"],
        ralewayblack: ["Raleway-Black", "sans-serif"],
        readexproregular: ["ReadexPro-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
