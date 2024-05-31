/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryColor: "#07332F",
      secondaryColor: "#F7A582",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
