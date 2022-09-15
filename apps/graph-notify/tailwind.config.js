module.exports = {
  ...require('ui/tailwind.config'),
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  mode: 'jit',
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: 'light',
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};