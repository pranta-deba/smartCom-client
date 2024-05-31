/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryColor: "#07332F",
      secondaryColor: "#F7A582",
      Black: "#000000",
      White: "#ffffff",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
