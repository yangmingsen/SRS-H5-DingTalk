/**
 * vue-cli额外自定义配置
 */
module.exports = {
  lintOnSave: "warning",
  devServer: {
    proxy: {
      "/api": {
        target: "http://xjz.vaiwan.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 8848
  },
  outputDir: "../dist/dingtalk",
  publicPath: "/dingtalk/",
  productionSourceMap: false
};
