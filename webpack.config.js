const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const SRC = './src';
const DIST = './dist';
const IS_DEV = process.env.NODE_ENV === 'development';

const entries = glob.sync(`${SRC}/**/*.bundle.ts`).reduce((acc, file) => {
  acc[file.replace(SRC, '').replace('.ts', '.js')] = file;
  return acc;
}, {});

module.exports = {
  entry: entries,

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, `${DIST}/js`)
  },

  devtool: '#inline-source-map',

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modeules/ },
    ]
  },

  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
