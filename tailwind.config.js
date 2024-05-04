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
        heroShoesBg:
          "url('https://res.cloudinary.com/fushigina-shinobi/image/upload/f_auto,q_auto/v1/FleaPasal/py9prw3y3jdbzzz1ksf3')",
        heroBooksBg:
          "url('https://res.cloudinary.com/fushigina-shinobi/image/upload/f_auto,q_auto/v1/FleaPasal/dghb82mrn2yi78e3nnyh')",
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
      animation: {
        'bounce-once': 'bounce 1.4s 0.5',
        wiggle: 'wiggle 1s ease-in-out infinite',
        expand: 'expand 0.3s',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        expand: {
          '0%, 100%': { transform: 'scaleX(0)' },
          '50%': { transform: 'scaleX(1)' },
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        libreFranklin: ['Libre Franklin', 'sans-serif'],
      },
      boxShadow: {
        catShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        card: '0px 4px 6px 2px rgba(187, 170, 204, 0.15);',
        cardHover: '0px 4px 4px 0px rgba(245, 242, 248, 1)',
        support: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
        dropDown:
          '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.20);',
        compare: '-0.874px 3.496px 6.991px 1.748px rgba(68, 52, 84, 0.20);',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};
