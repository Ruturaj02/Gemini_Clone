// tailwind.config.js
export default {
  // other configurations...
  plugins: [
    function ({ addVariant }) {
      addVariant('dark', '&:where(.dark, .dark *)');
    },
  ],
};
