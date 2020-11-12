const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';
const mode = production ? 'production' : 'development';

module.exports = {
  mode,
  stats: 'errors-only',
  devtool: production ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(__dirname, 'src'),
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

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      serviceWorkerVersion: production
        ? `"${new Date().toISOString()}"`
        : `"dev v9"`,
      'process.env.DEV_USE_SW_FOR_RUNTIME': JSON.stringify(
        process.env.DEV_USE_SW_FOR_RUNTIME || 'false',
      ),
      'process.env.DEV_USE_SW_FOR_API': JSON.stringify(
        process.env.DEV_USE_SW_FOR_API || 'false',
      ),
      'process.env.DEV_USE_FIXTURE_FOR_API': JSON.stringify(
        process.env.DEV_USE_FIXTURE_FOR_API || 'false',
      ),
    }),
  ],
};
