// webpack的开发环境的特有配置(只在开发环境中执行，生产环境中不执行)

const path = require("path");
const webpackBase = require("./webpack.base.conf");
const { merge } = require("webpack-merge");
const Webpack = require("webpack");
const config = require("./config");

module.exports = merge(webpackBase,{
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, '..', 'dist'),
        port: '8383',
        inline: true,
        hot: true,
        compress: config.dev.compress,
        host: config.dev.host,
        open: config.dev.autoOpenBrowser, 
    },
    devtool: 'source-map',
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        //定义全局变量
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('dev')
        })
     ]
})