const { defineConfig } = require('@vue/cli-service')
var path = require("path");
module.exports = {
  outputDir : path.resolve("../node_server/public"),
  transpileDependencies: true
}



