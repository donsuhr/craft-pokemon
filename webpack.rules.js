const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports.js = {
  test: /\.[jt]sx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    cacheDirectory: true,
  },
};

module.exports.scss = {
  test: /\.scss$/,
  use: [
    process.env.NODE_ENV !== 'production'
      ? 'style-loader'
      : MiniCssExtractPlugin.loader,
    'css-modules-typescript-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        sourceMap: true,
        url: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
              {
                grid: 'autoplace',
              },
            ],
          ],
        },
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
};

module.exports.css = {
  test: /\.css$/,
  use: [
    process.env.NODE_ENV !== 'production'
      ? 'style-loader'
      : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
  ],
  exclude: /\.module\.css$/,
};

module.exports.file = {
  test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[hash]',
    context: 'src',
  },
};
