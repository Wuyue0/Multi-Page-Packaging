// webpack的开发环境和生产环境的共有配置(开发环境和生产环境都是需要执行的配置)
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理每次打包的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const { entry , plugin, dev, prod } = require('./config');


// 插件对象
let plugins= [
    new CleanWebpackPlugin({
        verbose: true,
    }),
    new MiniCssExtractPlugin({
        filename: "assets/css/[name]_[chunkhash].css"//输出目录与文件
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    })
];

// 所有 HtmlWebpackPlugin插件
plugins=plugins.concat(plugin);

module.exports = {
    entry,
    output:{
        path: path.resolve(__dirname, "..","dist"),
        filename: process.env.production ? 
                    'assets/js/[name]-[chunkhash].js' 
                    : 'assets/js/[name]-[hash].js',
        publicPath: process.env.NODE_ENV === 'prod'
        ? prod.assetsPublicPath
        : dev.assetsPublicPath,
    },
    plugins,
    resolve:{
        extensions: ['.js', '.json','.scss','.css'],
        alias: {
            '@': path.resolve('../src')
        }
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sc|c|sa)ss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            // 处理css图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //匹配图片文件
                loader: 'url-loader',
                options: {
                    limit:10*1024,//小于limit限制的图片将转为base64嵌入引用位置, 单位为字节(byte)
                    fallback:'file-loader',//大于limit限制的将转交给指定的file-loader处理
                    outputPath:'assets/img'//传入file-loader将图片输出到 dist/assets/img文件夹下
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    stats: {
        assets:false,
        modules:false,
        entrypoints:false,
        errors:true
    }
}
