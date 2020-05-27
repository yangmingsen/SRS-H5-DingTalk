/**
 * vue-cli额外自定义配置
 */
module.exports = {
    lintOnSave: "warning",
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.163.11:8046",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8848
    }

};
