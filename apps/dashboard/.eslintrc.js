module.exports = {
  root: true,
  extends: ['custom'],
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
  },
  ignorePatterns: ['*.tsbuildinfo'],
}
