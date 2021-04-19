const webpack = require('webpack');
module.exports = {
    entry: __dirname + "/out/index.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "index.js", //打包后输出文件的文件名
        libraryTarget: "umd",
        globalObject: 'typeof window === \'undefined\' ? global : window'
    },
    mode: 'production',
    devtool: 'source-map',
    externals: [],
    plugins: [
    ],
}