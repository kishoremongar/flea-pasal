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
        primary: '#A17466',
        secondary: '#402a23',
        tertiary: '#efdcd3',
        bgBlue: '#94dbf9',
        darkPink: '#ff4f99',
        brown1: '#332a1a',
        brown2: '#541c13',
        brown3: '#7c5b41',
        brown4: '#aa574b',
        eggShell: '#EAE7DC',
        cartoon: '#D8C3A4',
        stone: '#BBB2B5',
        imperialBlue: '#123D6A',
        'rose-red': '#AB3B61',
        offWhite: '#EBD5B8',
        cream: '#EFBC9C',
        brown: '#EA572A,',
        'primary-black': '#0B3F30',
        orange: '#E39828',
        'light-blue': '#A8D0E7',
        'light-green': '#DEF2F1',
        'light-cream': '#EAE8DC',
        'light-cream1': '#EEE2DC',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
