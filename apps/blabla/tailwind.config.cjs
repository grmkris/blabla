/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
};
