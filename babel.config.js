const presets = ['@babel/preset-typescript', '@babel/preset-react'];
const plugins = ['react-hot-loader/babel'];

if (process.env.NODE_ENV === 'test') {
  presets.push([
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ]);
} else {
  presets.push([
    '@babel/preset-env',
    {
      modules: false,
      targets: 'last 1 Chrome versions',
    },
  ]);
}

module.exports = { presets, plugins };
