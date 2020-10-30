const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === 'production';
const mode = production ? 'production' : 'development';

const devServer = process.env.DEVSERVER
  ? // eslint-disable-next-line import/no-dynamic-require
    require(path.resolve(__dirname, process.env.DEVSERVER)).devServer
  : {};

const entry = ['./src/index.tsx'];

const plugins = [
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'Craft Demo Designs - Pokemon San Diego',
    template: 'src/index.template.html',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: production
      ? 'styles/[name]-[chunkhash].css'
      : 'styles/[name].css',
    chunkFilename: production
      ? 'styles/[name]-[chunkhash].css'
      : 'styles/[name].css',
  }),
];

module.exports = {
  mode,
  entry,
  plugins,
  stats: 'errors-only',
  devtool: production ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: 25,
      maxAsyncRequests: Infinity,
      minSize: 20000,
      chunks: 'all',
    },
  },
  output: {
    crossOriginLoading: 'anonymous',
    path: path.join(__dirname, 'dist'),
    filename: production
      ? 'scripts/[name]-[chunkhash].js'
      : 'scripts/[name].js',
    chunkFilename: production
      ? 'scripts/[name]-[chunkhash].js'
      : 'scripts/[name].js',
    publicPath: '/',
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
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
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
    ],
  },
};
