/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"apps/site/pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				dangle: {
					"0%, 100%": { transform: "rotate(-3deg)", },
					"50%": { transform: "rotate(3deg)" },
				},
				dropdown: {
					"0%": { opacity: 0, transform: "translateY(-10px)" },
					"100%": { opacity: 100, transform: "translateY(0px)" },
				},
				'dropdown-inverse': {
					"0%": { opacity: 100, display: "flex", transform: "translateY(0px)" },
					"100%": { opacity: 0, display: "hidden", transform: "translateY(-10px)" },
				},
				"fade-in": {
					"0%": { opacity: 0 },
					"100%": { opacity: 100 },
				},
				"fade-out": {
					"0%": { opacity: 100 },
					"100%": { opacity: 0 },
				},
			},
			animation: {
				dangle: "dangle infinite 3s ease-in",
				dropdown: "dropdown 0.25s ease-in-out",
				'dropdown-inverse': "dropdown-inverse 2s ease-in",
				'fade-in': "fade-in 0.25s ease-in",
				'fade-out': "fade-out 0.5s ease-out",
			},
			colors: {
				"main-yellow": {
					DEFAULT: "#FFD54C",
				},
				"main-blue": {
					DEFAULT: "#08185A",
					100: "#CFD4FF",
				},
				"main-red": {
					DEFAULT: "#FF1100",
				},
				"main-grey": {
					DEFAULT: "#E5E5E5",
					200: "#F1F1F1",
					800: "#363636",
				},
				"main-green": {
					DEFAULT: "#296118",
				},
			},
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				nunito: ["Nunito"],
			},
			screens: {
				"3xl": "1920px",
			},
		},
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				h1: { fontSize: theme("fontSize.4xl") },
				h2: { fontSize: theme("fontSize.3xl") },
				h3: { fontSize: theme("fontSize.2xl") },
				h4: { fontSize: theme("fontSize.xl") },
			});
		}),
		require('@tailwindcss/line-clamp')
	],
};
