// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // or ./pages if using pages router
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                // override one:
                lg: '992px', // replace default 1024px
                // add new custom:
                'xs': '370px',
                '3xl': '1600px',
                // raw media query (e.g., combine features):
                'md-hover': { raw: '(min-width: 600px) and (hover: hover)' },
            },
        },
        // OR to completely replace defaults:
        // screens: {
        //   'sm': '576px',
        //   'md': '960px',
        //   'lg': '1200px',
        // },
    },
    plugins: [
        // if using container queries
    ],
};
