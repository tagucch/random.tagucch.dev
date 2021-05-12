module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'noshimehana': '#426579',
      'masuhana': '#5b7e91'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'noshimehana': '#426579',
      'masuhana': '#5b7e91'
    }),
    extend: {
    },
  },
}