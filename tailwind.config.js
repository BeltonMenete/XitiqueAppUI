// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateX(10px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        fadeOut: { from: { opacity: 1, transform: 'translateX(0)' }, to: { opacity: 0, transform: 'translateX(-10px)' } },
      },
    },
  },
};