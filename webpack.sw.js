const { js } = require('./webpack.rules');

const production = process.env.NODE_ENV === 'production';

const entry = {
  sw: './src/sw.ts',
};

module.exports = {
  entry,
  output: {
    filename: production ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: production ? '[name]-[chunkhash].js' : '[name].js',
  },
  module: {
    rules: [js],
  },
};
