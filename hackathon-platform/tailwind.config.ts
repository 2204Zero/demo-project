import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0098FF',
                background: "var(--background)",
                foreground: "var(--foreground)",
                accent: "#3b82f6" // you can also make this a variable
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                poppins: ['var(--font-poppins)'],
            },
        },
    },
    plugins: [],
};

export default config;
