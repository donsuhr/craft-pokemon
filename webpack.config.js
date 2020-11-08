require('dotenv').config();
const path = require('path');

const { merge } = require('webpack-merge');
const baseWp = require('./webpack.base');
const swWp = require('./webpack.sw');
const mainWp = require('./webpack.main');

const configs = [];

const mainConfigs = [baseWp, mainWp];

if (process.env.SYSTEM_WEBPACK) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const system = require(path.resolve(__dirname, process.env.SYSTEM_WEBPACK));
  mainConfigs.push(system);
}

configs.push(merge(mainConfigs));

if (
  process.env.NODE_ENV === 'devleopment' &&
  process.env.DEV_USE_SW_FOR_RUNTIME === 'false' &&
  process.env.DEV_USE_SW_FOR_API === 'true'
) {
  configs.push(merge([baseWp, swWp]));
}

module.exports = configs;
