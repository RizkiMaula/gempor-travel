// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

// const withMT = require('@material-tailwind/react/utils/withMT');

// module.exports = withMT({
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}', 'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });

// import Config from 'tailwindcss';
// import withMT from '@material-tailwind/react/utils/withMT';

// const Config = {
//   content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['var(--font-manrope)'],
//       },
//       fontWeight: {
//         regular: '400',
//         medium: '500',
//         'semi-bold': '600',
//         bold: '700',
//       },
//       colors: {
//         // Absolute Colors
//         white: '#FFFFFF',
//         black: '#000000',
//       },
//     },
//   },
//   darkMode: 'class',
//   plugins: [require('@tailwindcss/forms')],
// };
// const withMaterialTailwind = withMT(config);

// export default withMaterialTailwind;
