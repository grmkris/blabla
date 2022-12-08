module.exports = {
  ...require("ui/tailwind.config"),
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#4338ca",
        secondary: "#3b82f6",
      },
    },
  },
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: "light",
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};
