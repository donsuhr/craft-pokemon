const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { js, scss, css, file } = require('./webpack.rules');

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
      { from: 'src/font', to: 'font' },
      { from: 'src/img', to: 'img' },
      {
        from: '**/*.json',
        context: 'src/',
      },
    ],
  }),
];

if (production) {
  plugins.push(new webpack.ids.HashedModuleIdsPlugin());
  plugins.push(
    new MiniCssExtractPlugin({
      filename: production
        ? 'styles/[name]-[chunkhash].css'
        : 'styles/[name].css',
      chunkFilename: production
        ? 'styles/[name]-[chunkhash].css'
        : 'styles/[name].css',
    }),
  );

  plugins.push(
    new InjectManifest({
      swSrc: './src/sw.js',
      exclude: [/fixtures/, /DS_Store/],
    }),
  );
} else {
  if (
    process.env.DEV_USE_SW_FOR_RUNTIME === 'true' ||
    process.env.DEV_USE_SW_FOR_API === 'true'
  ) {
    plugins.push(
      new InjectManifest({
        swSrc: './src/sw.js',
        exclude: [/\.hot-update\./],
        maximumFileSizeToCacheInBytes: 6000000,
      }),
    );
  }

  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  entry,
  devServer: {
    hot: true,
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [js, scss, css, file],
  },
};
