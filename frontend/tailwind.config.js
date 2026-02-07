/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    950: '#070a13',
                    900: '#0b0f1a',
                    800: '#121826',
                },
                cosmic: {
                    cyan: '#00f3ff',
                    purple: '#bc13fe',
                    orange: '#ff9e00',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
                grotesk: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
