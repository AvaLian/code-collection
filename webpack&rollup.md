# 引言

## `webpack` 和 `rollup` 等打包工具的配置

## 目录

<!-- TOC -->

- [`webpack` 和 `rollup` 等打包工具的配置](#webpack-和-rollup-等打包工具的配置)
- [目录](#目录)
- [](#)
- [webpack配置](#webpack配置)
	- [vue.config.js配置](#vueconfigjs配置)
	- [1、各插件作用](#1各插件作用)
- [rollup 问题总结](#rollup-问题总结)
	- [rollup 配置 babel，es6 转 es5,兼容 IE](#rollup-配置-babeles6-转-es5兼容-ie)
	- [es6、requirejs 等模块使用方法](#es6requirejs-等模块使用方法)
	- [webpack 使用](#webpack-使用)
	- [自定义库如何在 webpack 里面生成](#自定义库如何在-webpack-里面生成)

<!-- /TOC -->
---

## webpack配置

### vue.config.js配置
```js
module.exports = {
	// filenameHashing:true, // 默认情况下，为true,生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
	publicPath: "./", // 默认'/'，部署应用包时的基本 URL
	//  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "static", //放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
	lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
// 	// 用于多页配置，默认是undefined
// 	pages:{
// 		index:{
// 			entry:'src/index/main.js', //page的入口文件
// 			template:'public/index.html', //模板文件
// 			filename:'index.html', //在dist/index.html 的输出文件
// 			title:'index Page', // 当使用页面title选项时，template中的title标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
// 			chunks:['chunk-vendors','chunk-common','index'], //在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk			
// 		},
// 		 // 当使用只有入口的字符串格式时，
//      // 模板文件默认是 `public/subpage.html`
//      // 如果不存在，就回退到 `public/index.html`。
//      // 输出文件默认是 `subpage.html`。
//      subpage: 'src/subpage/main.js'
// 	}, 
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: process.env.NODE_ENV !== "production", // 生产环境是否生成 sourceMap 文件

  //反向代理
  devServer: {
    // 环境配置
		// hot: true, //热更新替换，更新页面
		hotOnly: true, // 热更新    hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    port: "8081", // 端口号
		// host: "localhost", //指定要使用的主机IP。默认情况下这是localhost。
		host: "0.0.0.0",    // 服务器检测地址 ，如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
		// https: false, // https:{type:Boolean}
    open: true, //自动启动浏览器
    // compress: true, //为所服务的一切启用gzip压缩
    proxy: {
      // 配置多个代理
      "/api": {
        target: "http://172.16.2.34:7003/", // 目标接口的域名
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // ws: true, //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        pathRewrite: {
          "^/api": "", // 重写路径, 去掉接口地址中的api字符串
        },
      },
    },
  },
};

```

### 1、各插件作用
``` js

```


## rollup 问题总结

### rollup 配置 babel，es6 转 es5,兼容 IE

1. 安装依赖
   `npm i @babel/core @babel/preset-env core-js rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs -D`
2. babel.config.js 设置

```js
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				modules: false,
			},
		],
	],
};
```

上面代码的`useBuiltIns`的`usage`是 `babel7` 的实验性特性，他支持按需加载

3. rollup.config.js 配置

```js
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
	input: './src/index.js',
	output: [
		{
			...
		}
	],
	plugins: [
		commonjs(),
		resolve(),
		babel({
			exclude: [/\/core-js\//],
			runtimeHelpers: true,
			sourceMap: true,
			extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
		}),
	],
}
```

---

### es6、requirejs 等模块使用方法

```js
// es6
function Test(){...} // a.js  定义模块
export default Test;
import Test from './a.js'  //引用模块
new Test()
// AMD
require(['a'],function(){})
// common.js
function Test(){...} // a.js  定义模块
module.exports = Test;
var Test = require('./a.js')   //引用模块
new Test()
// <!-- 例子2 -->
exports.add = function() { //math.js
    ...
    return sum;
};
var add = require('math').add; //increment.js
exports.increment = function(val) {
    return add(val, 1);
};
var inc = require('increment').increment; //program.js
var a = 1;
inc(a); // 2
```

### webpack 使用

```js
// global全局安装
webpack index.js
// local 局部安装
npx webpack index.js
// npm scripts
npm run dev   //等于  webpack
// 默认配置webpack.config.js
const path = require('path')
module.exports = {
	mode:'development',//默认是production，默认压缩文件
	entry:{  //等于  entry:'./src/index.js',
		main:'./src/index.js'
	},
	output:{
		filename:'bundle.js', //打包生产的文件名称
		path:path.resolve(__dirname,'dist') //dirname代表node中webpack同级目录，dist是 文件夹名称
	}
}
// 分离 应用程序(app) 和 第三方库(vendor) 入口
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
// 多页面应用程序
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js', // '[name].[ext]' 老的文件的名称   老的文件的后缀
    path: __dirname + '/dist'
  }
}
// 写入到硬盘：./dist/app.js, ./dist/search.js
```

`htmlWebpackPlugin` 会在打包结束后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 中

### 自定义库如何在 webpack 里面生成

```js
const path = require('path');
module.exports = {
	mode: 'production',
	entry: './src.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library',
		library: 'library', // 可以使用srcipt标签引用库（在全局变量里面增加library变量）
		libraryTarget: 'umd', // 可以使用模块化import、commonjs、adm等方式引用库；值还可以为  this、window、 global，但是这样不能用模块化引入
	},
};
```
