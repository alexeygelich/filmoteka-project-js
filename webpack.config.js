import { LoaderOptionsPlugin } from 'webpack'

const config = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          },
          {
            loader: 'posthtml-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new LoaderOptionsPlugin({
      options: {
        posthtml(ctx) {
          return {
            parser: require('posthtml-pug'),
            plugins: [
              require('posthtml-bem')()
            ]
          }
        }
      }
    })
  ]
}

export default config