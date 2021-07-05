module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: 'entry',
          corejs: 2,
        }
      ]
    ]
  }
}
