import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#E5E7EB',
        tertiary: '#F9FAFB',
        accent: '#3B82F6',
        darkColor: '#242124',
        lightTextColor: '#ECDFCC',
      },
    },
  },
  plugins: [],
});
