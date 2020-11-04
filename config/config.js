
const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

// HTML模板文件所在的文件夹
const htmlDir = path.join(__dirname, '../public/')
// 入口文件所在文件夹
const srcDir = path.join(__dirname, '../src/');


/** 扫描获取入口 */
function scanEntry() {
    var entry = {}
    glob.sync(srcDir + '/**/*.js').forEach(name => {
        name=path.normalize(name);
        // 如 index 
        //    about
        //    production/index
        chunkName=name.replace(srcDir, '').replace(/\\/g,'/').replace('.js', '')
        entry[chunkName] = name;
    });
    return entry
}



/** 扫描获取所有HTML模板 */
function scnanHtmlTemplate() {
    var htmlEntry = {}
    // 扫描目录以及子目录下所有html结尾的文件，不包含 include 文件夹
    glob.sync(htmlDir + '/**/*.html', {
        ignore: '**/include/**'
    }).forEach(name => {
        name=path.normalize(name)
        chunkName=name.replace(htmlDir, '').replace(/\\/g,'/').replace('.html', '')
        htmlEntry[chunkName] = name
    })
    return htmlEntry
}


/** 构建HtmlWebpackPlugin 对象 */
function buildHtmlWebpackPlugins() {
    var tpl = scnanHtmlTemplate()
    var chunkFilenames = Object.keys(tpl)
    return chunkFilenames.map(item => {
        var conf = {
            // 如 index.html
            //    about.html
            //    production/index.html
            filename: item + ".html",
            template: tpl[item],
            inject: true,
            favicon: path.resolve('./public/favicon.ico'),
            chunks: [item]
        }
        return new HtmlWebpackPlugin(conf)
    })
}


// 所有入口文件
const entry = scanEntry();
const plugin = buildHtmlWebpackPlugins();




module.exports = {
    entry,
    plugin,
    dev: {
      assetsPublicPath: '/',
      host: '0.0.0.0', // 写成0.0.0.0手机可以通过局域网访问，localhost无法使用手机访问的
      port: 8888,
      autoOpenBrowser: false, // 是否自动打开浏览器
      compress: true, ////开启gzip压缩
    },
    prod: {
      assetsPublicPath: '/'
    }
  }