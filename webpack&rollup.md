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
}
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
