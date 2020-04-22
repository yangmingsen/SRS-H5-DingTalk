/**
 * vue-cli额外自定义配置
 */
module.exports = {
  lintOnSave: "warning",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/api",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
