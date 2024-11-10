module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Adiciona todos os arquivos dentro da pasta src para que o Tailwind possa fazer a purgação
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
