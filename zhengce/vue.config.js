module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 公共路径
  indexPath: "index.html", // 相对于打包路径index.html的路径
  assetsDir: "static",
  devServer: {
    host: "172.20.16.79" // 原为: hotst: 'localhost'

    // proxy: {
    //   // 配置跨域
    //   '/api': {
    //     target: 'http://47.103.58.12:8200',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
};