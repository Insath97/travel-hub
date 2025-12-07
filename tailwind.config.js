/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/**/*.js"],
    theme: {
        extend: {
            colors: {
                primary: '#0EA5E9', // Sky Blue
                accent: '#2DD4BF', // Sea Green
                contrast: '#1E293B', // Midnight Navy
                background: '#F1F5F9', // Soft Gray
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
