# 引言

## `webpack` 和 `rollup` 等打包工具的配置

## 目录

-   [webpack](#section_webpack)
-   [rollup](#section_rollup)

---

### <a name="section_rollup"></a>

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
