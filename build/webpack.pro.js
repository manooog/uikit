const path = require("path");
var nodeExternals = require("webpack-node-externals");
const { modules } = require("./common");

const path2src = p => path.resolve(__dirname, "../src/", p);

module.exports = {
  entry: path2src("index.ts"),
  output: {
    library: "fcbox-uikit",
    libraryTarget: "umd",
    filename: "index.umd.js"
  },

  module: modules,

  resolve: {
    extensions: [".ts", ".tsx", "js"]
  },

  externals: [nodeExternals({ modulesFromFile: true })]
};
