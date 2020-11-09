const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { js, scss, css } = require('./webpack.rules');

const production = process.env.NODE_ENV === 'production';

const entry = './src/index.tsx';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Craft Demo Designs - Pokemon San Diego',
    template: 'src/index.template.html',
    inject: true,
  }),
  new CopyPlugin({
    patterns: [
      { from: 'src/site.webmanifest' },
      { from: 'src/icons', to: 'icons' },
      { from: 'src/img', to: 'img' },
      {
        from: '**/*.json',
        context: 'src/',
      },
    ],
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

if (production) {
  plugins.push(new webpack.ids.HashedModuleIdsPlugin());
  plugins.push(
    new InjectManifest({
      swSrc: './src/sw.ts',
    }),
  );
} else if (
  process.env.DEV_USE_SW_FOR_RUNTIME === 'true' ||
  process.env.DEV_USE_SW_FOR_API === 'true'
) {
  plugins.push(
    new InjectManifest({
      swSrc: './src/sw.ts',
      exclude: [/\.hot-update\./],
      maximumFileSizeToCacheInBytes: 5000000,
    }),
  );
}

module.exports = {
  entry,
  devServer: {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')],
  },
  plugins,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: 25,
      maxAsyncRequests: Infinity,
      minSize: 20000,
      chunks: 'all',
    },
  },
  module: {
    rules: [js, scss, css],
  },
};
