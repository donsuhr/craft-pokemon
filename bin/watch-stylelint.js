/* eslint-disable no-console */

'use strict';

const chokidar = require('chokidar');
const stylelint = require('stylelint');
const debounce = require('lodash/debounce');

const debounceStylelint = debounce(() => {
  console.log('start stylelint');
  stylelint
    .lint({
      formatter: 'string',
      cache: true,
      files: './src/**/*.scss',
    })
    .then((result) => {
      if (result.errored) {
        console.log(result.output);
      }
      console.log(`done linting ${result.results.length} files`);
    })
    .catch((e) => {
      console.log('error linting');
      console.log(e);
    });
}, 3000);

chokidar.watch(['./src/**/*.scss']).on('change', (file) => {
  console.log('File Change', file, 'stylelint queued...');
  debounceStylelint();
});
