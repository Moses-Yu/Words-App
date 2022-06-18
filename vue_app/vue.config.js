var path = require("path");
const target = "http://localhost:3001";
module.exports = {
  outputDir: path.resolve("../backend/public"),
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
