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
          // Add aliases for v4 style classes
          'background-primary': '#f8fafc',
          'background-secondary': '#f1f5f9',
          'background-tertiary': '#e2e8f0',
        },
        // Status Colors
        status: {
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
          info: '#3b82f6', // blue-500
          // Add aliases for v4 style classes
          'status-success': '#10b981',
          'status-warning': '#f59e0b',
          'status-error': '#ef4444',
          'status-info': '#3b82f6',
        },
        // Text Colors
        text: {
          primary: '#0f172a', // slate-900
          secondary: '#475569', // slate-600
          tertiary: '#94a3b8', // slate-400
          inverse: '#ffffff',
          // Add aliases for v4 style classes
          'text-primary': '#0f172a',
          'text-secondary': '#475569',
          'text-tertiary': '#94a3b8',
        },
        // Border Colors
        border: {
          DEFAULT: '#e2e8f0', // slate-200
          light: '#f1f5f9', // slate-100
          dark: '#cbd5e1', // slate-300
          // Add aliases for v4 style classes
          'border-border': '#e2e8f0',
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
        'count-up': 'countUp 0.5s ease-out',
        'count-down': 'countDown 0.5s ease-out',
        'highlight-fade': 'highlightFade 0.3s ease-out',
        'text-glow': 'textGlow 0.3s ease-in-out',
        'pop-in': 'popIn 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pop-out': 'popOut 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'gentle-bounce': 'gentleBounce 0.3s ease-in-out',
        'color-shift': 'colorShift 0.3s ease-in-out',
        'status-flash': 'statusFlash 0.4s ease-in-out',
        'button-press': 'buttonPress 0.1s ease-in-out',
        'ripple': 'ripple 0.6s ease-out',
        'smooth-fade': 'smoothFade 0.2s ease-in-out',
        'smooth-slide': 'smoothSlide 0.2s ease-in-out',
        'scale-out': 'scaleOutCenter 0.2s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'stagger-1': 'stagger1 0.3s ease-out',
        'stagger-2': 'stagger2 0.3s ease-out 0.1s',
        'stagger-3': 'stagger3 0.3s ease-out 0.2s',
        'stagger-4': 'stagger4 0.3s ease-out 0.3s',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateX(10px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        fadeOut: { from: { opacity: 1, transform: 'translateX(0)' }, to: { opacity: 0, transform: 'translateX(-10px)' } },
        slideIn: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideOut: { from: { opacity: 1, transform: 'translateY(0)' }, to: { opacity: 0, transform: 'translateY(-10px)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
        scaleOut: { from: { opacity: 1, transform: 'scale(1)' }, to: { opacity: 0, transform: 'scale(0.95)' } },
        scaleOutCenter: { from: { opacity: 1, transform: 'scale(1)' }, to: { opacity: 0, transform: 'scale(0.95)' } },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%, 45%, 75%': { transform: 'translateX(-4px)' },
          '30%, 60%, 90%': { transform: 'translateX(4px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        countUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        countDown: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' },
        },
        highlightFade: {
          '0%': { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
          '100%': { backgroundColor: 'transparent' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 0 rgba(16, 185, 129, 0)' },
          '50%': { textShadow: '0 0 10px rgba(16, 185, 129, 0.3)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        popOut: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.8)', opacity: 0 },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        colorShift: {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
          '100%': { filter: 'brightness(1)' },
        },
        statusFlash: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
        },
        buttonPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
        smoothFade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        smoothSlide: {
          '0%': { transform: 'translateX(-5px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        stagger1: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        stagger2: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        stagger3: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        stagger4: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
};