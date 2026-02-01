/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [], // To be extended by consuming apps
  theme: {
    extend: {
      colors: {
        // Background colors (dark theme)
        bg: {
          primary: '#0A0A0A',
          secondary: '#0F0F0F',
          tertiary: '#111111',
          component: '#141414',
          elevated: '#1A1A1A',
          overlay: '#1E1E1E',
        },
        // Accent colors
        accent: {
          primary: '#00E054',
          'primary-hover': '#00FF5E',
          'primary-dim': '#00B043',
          purple: '#9D00FF',
          'purple-light': '#C479FF',
          orange: '#FFB347',
          blue: '#3B82F6',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          tertiary: '#A1A1A1',
          muted: '#888888',
          subtle: '#666666',
          disabled: '#444444',
        },
        // Border colors
        border: {
          subtle: '#222222',
          default: '#2A2A2A',
          medium: '#333333',
          strong: '#444444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['10px', { lineHeight: '14px', fontWeight: '500' }],
        sm: ['11px', { lineHeight: '16px', fontWeight: '500' }],
        base: ['13px', { lineHeight: '18px', fontWeight: '400' }],
        md: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        lg: ['16px', { lineHeight: '22px', fontWeight: '500' }],
        xl: ['18px', { lineHeight: '26px', fontWeight: '400' }],
        '2xl': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        '3xl': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '4xl': ['32px', { lineHeight: '40px', fontWeight: '700' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        // Timeline-specific utilities
        timeline: '48px', // Height of timeline track
        ruler: '32px', // Height of time ruler
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(0, 224, 84, 0.2)',
        'glow-green-strong': '0 0 20px rgba(0, 224, 84, 0.4)',
        'elevation-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'elevation-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'elevation-lg': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        glass: '12px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        medium: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
};
