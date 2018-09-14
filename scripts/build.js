'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const rimraf = require('rimraf');

const { distSrc } = require('../config/paths');
const config = require('../config/webpack.config');

const compiler = webpack(config('production'));

rimraf.sync(distSrc);

compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red('Failed to compile.\n'));
    process.exit(1);
  }
  const messages = stats.toJson();

  if (messages.errors.length) {
    if (messages.errors.length > 1) {
      messages.errors.length = 1;
    }
    console.log(new Error(messages.errors.join('\n\n')));
    console.log(chalk.red('Failed to compile.\n'));
  }

  if (!err && !stats.hasErrors()) {
    console.log(chalk.green('Compiled successfully.\n'));
  }
  const used = process.memoryUsage();
  let totalUsed = 0;
  for (let key in used) {
    totalUsed += used[key];
    console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  console.log(`TOTAL: ${Math.round(totalUsed / 1024 / 1024 * 100) / 100} MB\n`);
});
