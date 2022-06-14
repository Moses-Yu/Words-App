var path = require("path");
const target = "http://localhost:3000";
module.exports = {
  outputDir: path.resolve("../node_server/public"),
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/server": {
        target,
        changeOrigin: true
      },
    },
  },
};
