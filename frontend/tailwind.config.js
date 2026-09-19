/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // FireSense brand palette
        thermal: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Primary brand orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Severity spectrum — must stay consistent across ALL portals
        severity: {
          critical: '#dc2626',   // red-600
          high:     '#f97316',   // orange-500
          elevated: '#eab308',   // yellow-500
          moderate: '#3b82f6',   // blue-500
          low:      '#22c55e',   // green-500
          safe:     '#6b7280',   // gray-500
        },
        // Status lifecycle
        status: {
          new:          '#6366f1',  // indigo-500
          investigating:'#8b5cf6',  // violet-500
          verified:     '#3b82f6',  // blue-500
          dispatched:   '#f97316',  // orange-500
          contained:    '#eab308',  // yellow-500
          resolved:     '#22c55e',  // green-500
        },
        // Portal chrome
        surface: {
          bg:      '#0a0f1e',   // Deep navy background
          panel:   '#111827',   // Panel / card background
          border:  '#1f2937',   // Subtle border
          elevated:'#1a2436',   // Slightly lifted surfaces
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-thermal': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
