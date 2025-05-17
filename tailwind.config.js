const {heroui} = require('@heroui/theme');
// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "// Include if using App Router\\n    './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}'",
    "// Required for Material Tailwind",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: '#1D4ED8',
        purple: '#7C3AED',
        indigo: '#4F46E5',
        teal: '#14B8A6',
      },
    },
  },
  darkMode: "class",
 plugins: [heroui()],
}


module.exports = withMT(config);
