// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary (Cold Slate)
        primary: {
          DEFAULT: '#475569', // slate-600
          light: '#64748b', // slate-500
          dark: '#334155', // slate-700
          darker: '#1e293b', // slate-800
        },
        // Secondary (Emerald - accent)
        secondary: {
          DEFAULT: '#059669', // emerald-600
          light: '#10b981', // emerald-500
          dark: '#047857', // emerald-700
          darker: '#065f46', // emerald-800
        },
        // Backgrounds
        background: {
          primary: '#f8fafc', // slate-50
          secondary: '#f1f5f9', // slate-100
          tertiary: '#e2e8f0', // slate-200
          white: '#ffffff',
        },
        // Status Colors
        status: {
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
          info: '#3b82f6', // blue-500
        },
        // Text Colors
        text: {
          primary: '#0f172a', // slate-900
          secondary: '#475569', // slate-600
          tertiary: '#94a3b8', // slate-400
          inverse: '#ffffff',
        },
        // Border Colors
        border: {
          DEFAULT: '#e2e8f0', // slate-200
          light: '#f1f5f9', // slate-100
          dark: '#cbd5e1', // slate-300
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'slide-out': 'slideOut 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
        'scale-out': 'scaleOut 0.2s ease-in-out',
        'shake': 'shake 0.4s ease-in-out',
        'pulse-slow': 'pulseSlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateX(10px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        fadeOut: { from: { opacity: 1, transform: 'translateX(0)' }, to: { opacity: 0, transform: 'translateX(-10px)' } },
        slideIn: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideOut: { from: { opacity: 1, transform: 'translateY(0)' }, to: { opacity: 0, transform: 'translateY(-10px)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
        scaleOut: { from: { opacity: 1, transform: 'scale(1)' }, to: { opacity: 0, transform: 'scale(0.95)' } },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%, 45%, 75%': { transform: 'translateX(-4px)' },
          '30%, 60%, 90%': { transform: 'translateX(4px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
};