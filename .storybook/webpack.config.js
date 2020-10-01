const path = require('path')

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '../src/')
  }

  config.module.rules = [
    {
      test: /\.stories\.tsx?$/,
      use: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        }
      ]
    },
    {
      test: /\.svg$/,
      loader: 'raw-loader'
    },
    {
      test: /\.(jpe?g|png|gif)(\?.*)?$/,
      use: [
          {
              loader: require.resolve('url-loader'),
              options: {
                  limit: 8192
              }
          }
      ]
    }
  ]
  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '../src')
  }

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
