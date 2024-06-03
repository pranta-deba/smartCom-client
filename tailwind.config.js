/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryColor: "#07332F",
      primaryColorOpacity: "#07332F61",
      secondaryColor: "#F7A582",
      Black: "#000000",
      White: "#ffffff",
      Red: "#D2042D",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
