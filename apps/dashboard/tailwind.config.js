module.exports = {
  presets: [require('ui/tailwind.config')],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        authenticated: 'hsl(var(--authenticated))',
      },
    },
  },
}
