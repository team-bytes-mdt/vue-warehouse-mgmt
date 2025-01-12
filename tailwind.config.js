/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    DEFAULT: "#ff6b34"
                },
                secondary: {
                    DEFAULT: "#3C1E03",
                },
            },
            fontFamily: {
                inter: ["Inter"]
            }
        },
    },
    plugins: [],
  }