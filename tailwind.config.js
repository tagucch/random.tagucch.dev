module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // OSの設定に基づいてダークモードを適用する
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'noshimehana': '#426579',
      'masuhana': '#5b7e91',
      'darkbg': '#455765', // ダークモード背景色 鉄御納戸
      'darkbg-article': '#657380', // ダークモード背景色 記事本文
      'darkbg-tag': '#1a2533', // ダークモード タグ背景色
    }),
    textColor: theme => ({
      ...theme('colors'),
      'noshimehana': '#426579',
      'masuhana': '#5b7e91',
      'darktext-title': '#e5e4e6', // ダークモード文字色 タイトル・記事見出し用 白梅鼠
      'darktext-black': '#1a2533', // ダークモード文字色 日付
      'darktext': '#dcdddd', // ダークモード文字色 ↑以外の場所はこの色を使う 白鼠
    }),
    extend: {
    },
  },
}