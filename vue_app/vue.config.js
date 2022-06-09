const { defineConfig } = require('@vue/cli-service')
var path = require("path");
module.exports = defineConfig({
  outputDir : path.resolve("../node_server/public"),
  transpileDependencies: true
})



