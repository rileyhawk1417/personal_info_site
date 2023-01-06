/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: { max: "524px" },
      md: { min: "768px" },
      lg: { max: "1080px" },
    },
    extend: {},
  },
  plugins: [],
};
