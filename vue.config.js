const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@nodeModules': path.resolve(__dirname, 'node_modules')
            }
        }
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://127.0.0.1:8081',
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         },
    //         '/upload': {
    //             target: 'http://81.70.15.16:3002'
    //         }
    //     },
    //     // 绕过主机检查
    //     // 不设置该选项，会导致在 host 配置 127.0.0.1  hg.jd.com 时，报 Invalid Host header
    //     disableHostCheck: true
    // },
    publicPath: undefined,
    outputDir: undefined,
    assetsDir: 'static',
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    css: undefined
}