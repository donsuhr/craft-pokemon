const presets = ['@babel/preset-typescript', '@babel/preset-react'];
const plugins = [];

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
  if (process.env.NODE_ENV !== 'production') {
    plugins.push('react-refresh/babel');
  }
}

module.exports = { presets, plugins };
