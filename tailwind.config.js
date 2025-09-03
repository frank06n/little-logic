/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                bangla: ['"Tiro Bangla"', 'serif'], // Bengali font
            },
        },
    },
    plugins: [],
};