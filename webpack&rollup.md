## rollup

### rollup 配置 babel，es6 转 es5,兼容 IE

```
1、安装依赖
npm i @babel/core @babel/preset-env  core-js rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs -D
2、babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false
      }
    ]
  ]
};
上面代码的`useBuiltIns`的`usage`是 `babel7` 的实验性特性，他支持按需加载
3、rollup.config.js
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
export default {
  input: "./src/index.js",
  output: [
    {
      file: "dist/index.esm.browser.js",
      format: "es",
      sourcemap: true
    },
    {
      file: "dist/index.js",
      format: "umd",
      sourcemap: true,
      name: "index"
    }
  ],
  plugins: [
    commonjs(),
    resolve(),
    babel({
      exclude: [/\/core-js\//],
      runtimeHelpers: true,
      sourceMap: true,
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"]
    })
  ]
};
```
