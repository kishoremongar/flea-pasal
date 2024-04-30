/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A69080',
        secondary: '#b6a497',
        tertiary: '#9e8674',
        'off-white': '#FAF9F6',
        bgBlue: '#94dbf9',
        darkPink: '#ff4f99',
        eggShell: '#EAE7DC',
        cartoon: '#D8C3A4',
        stone: '#BBB2B5',
        'primary-black': '#3E362E',
        olive: '#93785B',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        mobile: '320px',
        // => @media (min-width: 320px)
        'mobile-xl': '480px',
        // => @media (min-width: 460px)
        sm: '640px',
        // => @media (min-width: 640px)
        md: '768px',
        // => @media (min-width: 768px)
        lg: '1024px',
        // => @media (min-width: 1024px)
        xl: '1280px',
        // => @media (min-width: 1280px)
        '2xl': '1536px',
        // => @media (min-width: 1536px)
      },
    },
  },
  plugins: [],
};
