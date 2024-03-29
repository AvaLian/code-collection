

# JS实用的小功能
---
<!-- TOC -->

  - [多层&&时可以使用es6链判断运算符](#多层时可以使用es6链判断运算符)
  - [可以嵌套的解构赋值](#可以嵌套的解构赋值)
  - [${ }中函数调用](#-中函数调用)
  - [repeat( )函数将目标字符串重复N次，返回一个新的字符串](#repeat-函数将目标字符串重复n次返回一个新的字符串)
  - [includes() 函数判断字符串中是否含有指定的子字符串，返回Boolean](#includes-函数判断字符串中是否含有指定的子字符串返回boolean)
  - [Math.trunc函数：用于去除一个数的小数部分，返回整数部分。](#mathtrunc函数用于去除一个数的小数部分返回整数部分)
  - [Math.sign函数：用来判断一个数到底是正数、负数、零](#mathsign函数用来判断一个数到底是正数负数零)
  - [Array.from函数将字符串转换成数组](#arrayfrom函数将字符串转换成数组)
  - [Object.assign()函数-合并对象](#objectassign函数-合并对象)
  - [参数的默认值](#参数的默认值)
- [](#)
- [](#-1)
- [](#-2)
- [](#-3)
- [](#-4)
- [](#-5)
- [](#-6)
- [](#-7)
- [](#-8)
- [](#-9)
- [](#-10)
- [](#-11)
- [](#-12)
- [](#-13)
- [](#-14)
- [](#-15)
- [](#-16)
- [](#-17)
- [](#-18)
- [](#-19)
- [](#-20)
- [](#-21)
- [](#-22)
- [](#-23)
- [](#-24)
- [](#-25)
- [](#-26)
- [](#-27)
- [](#-28)
- [](#-29)
- [](#-30)
- [](#-31)
- [](#-32)
- [](#-33)
- [](#-34)
- [](#-35)
- [](#-36)
- [](#-37)
- [](#-38)
- [](#-39)
- [](#-40)
- [](#-41)
- [](#-42)
- [](#-43)
- [](#-44)
- [](#-45)
- [](#-46)
- [](#-47)
- [](#-48)

<!-- /TOC -->
---

### 多层&&时可以使用es6链判断运算符
```js
 let aaa = (message && message.body && message.body.user && message.body.user.firstName) ||"没有"

// es6链判断运算符
let bbb = message?.body?.user?.firstName || '没有'

// 在vue中使用
// 1.下载@babel/plugin-proposal-optional-chaining
npm install --save-dev @babel/plugin-proposal-optional-chaining
// 2. babel.config.js添加
module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins:[
    "@babel/plugin-proposal-optional-chaining"
  ]
}
// 3. 重启项目
```



### 可以嵌套的解构赋值
```js
var [ a,b,[ c, d ] ] = [ 1,2,[ 3, 4 ] ];
console.log(c);//结果：c的值为3
console.log(d);//结果：d的值为4

var a = 1;
var b = 2;
[a,b] = [b,a];
```
### ${ }中函数调用
```js
function fn() {
    return "曲小强"
}
var s = `this is ${ fn() }`
console.log(s) // this is 曲小强
```
### repeat( )函数将目标字符串重复N次，返回一个新的字符串
```js
// repeat( )将目标字符串重复N次，返回一个新的字符串
var oldName = "你好";
var newName =  oldName.repeat(4);
console.log(oldName); //结果：你好
console.log(newName); //结果：你好你好你好你好
```
### includes() 函数判断字符串中是否含有指定的子字符串，返回Boolean
```js
var str = "百香果红茶";    //目标字符串
str.includes('红'); // true
```
### Math.trunc函数：用于去除一个数的小数部分，返回整数部分。
```js
Math.trunc(2.312313213);
// 结果 2
```
### Math.sign函数：用来判断一个数到底是正数、负数、零
```js
Math.sign(22); //结果：1
Math.sign(-22); //结果：-1
Math.sign(0); //结果：0
Math.sign('aaa'); // NaN
```
### Array.from函数将字符串转换成数组
```js
var str = 'Hello';
Array.from(str);
//结果：["H", "e", "l", "l", "o"]
```
### Object.assign()函数-合并对象
```js
let a = {"a":1};

//这个充当源对象
let b = {"b":2,"c":3};

Object.assign(a, b);

//打印target对象出来看一下
console.log(a);
//结果 {a: 1, b: 2, c: 3}
```
### 参数的默认值
```js
function person(name = '张三',age = 25){
   console.log(name, age);
}

person(); //结果：Zhangsan  25
person('李四',18); //结果：Lisi  18
// 默认值的参数后面不能再跟不需默认值的参数了。
// 例如错误案例： function person(age = 25,name){} 
// 例如正确案例： function person(name,age = 25){} 
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```
###
```js
```