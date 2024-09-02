/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      c100: '#004577',
      c101: '#C98660',
      c102: '#00B200',
      h102: '#019501',
      c103: '#0A0909',
      c104: '#222222',
      c105: '#121010',
      c106: '#0A0909',
      c107: '#E1BD04',
      c108: '#ca0de1',
      default: '#ffffff',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 600,
      },
    },
  },
  plugins: [],
};
