
const webpack = require("webpack");
const webpackBase = require("./webpack.base.conf");
const { merge } = require("webpack-merge");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 合并配置文件
module.exports = merge(webpackBase,{
    mode: 'production',
    optimization: {
        // 找到chunk中共享的模块,取出来生成单独的chunk
        splitChunks: {
            chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            cacheGroups: {
                vendors: {  // 抽离第三方插件
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",
                    priority: -10                       // 抽取优先级
                },
                utilCommon: {   // 抽离自定义的公共库
                    name: "common",
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20
                }
            }
        },
        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk:{
            name:'manifest'
        }
    },
    devtool: 'source-map',
    plugins:[
        new OptimizeCssAssetsPlugin(),
        // DefinePlugin 允许创建一个在编译时可以配置的全局常量，可以在JS文件中根据这些定义的变量来定义不同的行为
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('prod')
        })
    ]
});
