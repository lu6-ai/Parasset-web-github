const path = require('path')
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        module: {
            rules: [
            ],
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name (module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`
                        }
                    }
                }
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                //根据自己的文件路径配
                path.resolve(__dirname, "./src/assets/css/global.less")
            ]
        }
    },
    publicPath: './', // 设置打包文件相对路径
    productionSourceMap: true,
    assetsDir: 'static',
    devServer: {
        port: '8083',
        // host: '0.0.0.0',
        open: true,//配置自动启动浏览器
        proxy: {
            '/api': {
                target:"http://luckyjiet.utools.club", //蓝二
                changeOrigin: true,//在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/api": "/"
                }
            }
        },
        // overlay: {
        //     warnings: false,
        //     errors: false
        // },
        // lintOnSave: false
    },
    chainWebpack: config => {
        // 查看打包文件体积大小
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
}
