/* eslint-disable */
'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: JSON.stringify('production')
     }
  }),
  new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
]);

module.exports = config;
