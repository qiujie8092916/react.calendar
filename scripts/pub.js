"use strict";

process.env.NODE_ENV = "production";

const merge = require("webpack-merge");
const path = require("path");
const config = require("../config/webpack.config.pub");
// const components = require("../src/components.json");

module.exports = merge(config, {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/lib/",
    filename: "index.js",
    library: "Calendar",
    libraryTarget: "commonjs2"
  }
});
