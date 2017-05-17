'use strict'

const webpack = require("webpack");
const path = require("path");


const PATHS = {
    source: path.join(__dirname, 'source/js'),
    build: path.join(__dirname, 'build/assets')
}

module.exports = {
 // watch: true,
  devtool: 'source-map',
  entry: PATHS.source + '\\main.js',
  output: {
    path: PATHS.build + '/js/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["es2015"]
          }
        }],
      },
    ],
  }
}
