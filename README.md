README
==========================

该项目是采用`webpack4`对多项目入口的打包。<br>
配置多页面的自动化打包工具，做到了代码修改实时修改，代码压缩，代码的分离与提取。<br> 
注： 适用人群 想要对webpack深度了解的"大佬们"。

目录结构
=========================

```
├── public  			存放html模板页面
│   ├── include		存放公共的html代码片段
│   │   ├── header.html 
│   │   └── tail.html
│   └── index.html			    首页
│   ├── about.html			    关于
│   ├── favicon.ico         站点图标
├── src							存放源代码（需要编译）
│   ├── assets			存放资源,包含css文件,字体文件，图片文件
│   │   ├── css
│   │   ├── fonts
│   │   └── img
│   ├── common      公共js文件
│   └── index.js
│   ├── about.js				
└── vendor	     存放第三方提供的组件,src下js文件中需要 import才能使用
├── static       静态文件，这些文件将会原封不动拷贝到发布的assets目录中
├── readme.md	
├── package.json  依赖的js文件，启动脚本
```
