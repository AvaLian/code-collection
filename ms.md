<!-- TOC -->

  - [flex和float的区别](#flex和float的区别)
- [1. js基础](#1-js基础)
  - [1.1. JS事件循环机制](#11-js事件循环机制)
  - [1.2. js面向对象的理解](#12-js面向对象的理解)
  - [1.3. js为什么是单线程,而不是多线程](#13-js为什么是单线程而不是多线程)
  - [1.4. js垃圾处理机制](#14-js垃圾处理机制)
  - [1.5. js继承](#15-js继承)
  - [1.6. 闭包](#16-闭包)
  - [1.7. 内存溢出与内存泄露](#17-内存溢出与内存泄露)
  - [1.8. new操作符具体干了什么呢?](#18-new操作符具体干了什么呢)
- [vue基础](#vue基础)
  - [MVC 和 MVVM 区别](#mvc-和-mvvm-区别)
  - [为什么 data 是一个函数](#为什么-data-是一个函数)
  - [Vue 组件通讯有哪几种方式](#vue-组件通讯有哪几种方式)
  - [Vue 的生命周期方法有哪些 一般在哪一步发请求](#vue-的生命周期方法有哪些-一般在哪一步发请求)
  - [vue内置指令](#vue内置指令)
  - [怎样理解 Vue 的单向数据流](#怎样理解-vue-的单向数据流)
  - [computed 和 watch 的区别和运用的场景](#computed-和-watch-的区别和运用的场景)
  - [v-if 与 v-for 为什么不建议一起使用](#v-if-与-v-for-为什么不建议一起使用)
  - [Vue2.0 响应式数据的原理 `数据劫持+观察者模式`](#vue20-响应式数据的原理-数据劫持观察者模式)
  - [vue3.0 用过吗 了解多少](#vue30-用过吗-了解多少)
  - [vue3.0响应式Proxy](#vue30响应式proxy)
  - [Vue 的父子组件生命周期钩子函数执行顺序](#vue-的父子组件生命周期钩子函数执行顺序)
  - [虚拟 DOM 是什么 有什么优缺点](#虚拟-dom-是什么-有什么优缺点)
      - [优点：](#优点)
      - [缺点:](#缺点)
  - [v-model 原理](#v-model-原理)
  - [v-for 为什么要加 key](#v-for-为什么要加-key)
  - [Vue 事件绑定原理](#vue-事件绑定原理)
  - [vue-router 路由钩子函数是什么 执行顺序是什么](#vue-router-路由钩子函数是什么-执行顺序是什么)
      - [完整的导航解析流程:](#完整的导航解析流程)
  - [vue-router 动态路由是什么 有什么问题](#vue-router-动态路由是什么-有什么问题)
  - [vue-router 组件复用导致路由参数失效怎么办？](#vue-router-组件复用导致路由参数失效怎么办)
  - [vuex 的个人理解](#vuex-的个人理解)
  - [Vuex 页面刷新数据丢失怎么解决](#vuex-页面刷新数据丢失怎么解决)
  - [Vuex 为什么要分模块并且加命名空间](#vuex-为什么要分模块并且加命名空间)
  - [使用过 Vue SSR 吗？说说 SSR](#使用过-vue-ssr-吗说说-ssr)
  - [vue 中使用了哪些设计模式](#vue-中使用了哪些设计模式)
  - [Vue 的性能优化](#vue-的性能优化)
  - [Vue.mixin 的使用场景和原理](#vuemixin-的使用场景和原理)
  - [nextTick 使用场景和原理](#nexttick-使用场景和原理)
  - [keep-alive 使用场景和原理](#keep-alive-使用场景和原理)
  - [Vue.set 方法原理](#vueset-方法原理)
  - [Vue.extend 作用和原理](#vueextend-作用和原理)
  - [写过自定义指令吗 原理是什么](#写过自定义指令吗-原理是什么)
  - [Vue 修饰符有哪些](#vue-修饰符有哪些)
      - [事件修饰符](#事件修饰符)
      - [v-model 的修饰符](#v-model-的修饰符)
      - [键盘事件的修饰符](#键盘事件的修饰符)
      - [系统修饰键](#系统修饰键)
      - [鼠标按钮修饰符](#鼠标按钮修饰符)
  - [Vue 模板编译原理](#vue-模板编译原理)
  - [生命周期钩子是如何实现的](#生命周期钩子是如何实现的)
  - [函数式组件使用场景和原理](#函数式组件使用场景和原理)
  - [能说下 vue-router 中常用的路由模式实现原理吗](#能说下-vue-router-中常用的路由模式实现原理吗)
      - [hash 模式 `兼容性好但是不美观`](#hash-模式-兼容性好但是不美观)
      - [history 模式](#history-模式)
  - [diff 算法](#diff-算法)
- [js题目](#js题目)
  - [数组添加元素的方法](#数组添加元素的方法)

<!-- /TOC -->

 ## ccss知识
### flex和float的区别
`flex`是让子元素浮动，`float`是让自己浮动


 

## 1. js基础
### 1.1. JS事件循环机制

Javascript的事件分为同步任务和异步任务，遇到同步任务就放在执行栈中执行，而碰到异步任务就放到任务队列之中，等到执行栈执行完毕之后再去执行任务队列之中的事件。

- `同步任务队列` 
- `异步任务队列`
  - 宏任务包含有：`setTimeout, setInterval, setImmediate, I/O, UI rendering`
  - 微任务包含有：`process.nextTick, promise.then, MutationObserver`

1. 同步和异步任务分别进入不同的执行场所，同步的进入主线程，异步的进入Event Table并注册函数
2. 当指定的事情完成时（重点），Event Table会将这个函数移入Event Queue中
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行
4. 上述的过程会不断的重复，也就是常常说的Event Loop（事件循环）。

### 1.2. js面向对象的理解
- 对象：万物皆对象
- 类：对对象的细分
- 实例：类中具体的事物

### 1.3. js为什么是单线程,而不是多线程

- `进程`：是cpu分配资源的最小单位；（是能拥有资源和独立运行的最小单位）
- `线程`：是cpu调度的最小单位；（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）

浏览器是多进程的
放在浏览器中，每打开一个tab页面，其实就是新开了一个进程，在这个进程中，还有ui渲染线程，js引擎线程，http请求线程等。 所以，浏览器是一个多进程的。

JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完 全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

### 1.4. js垃圾处理机制

内存管理：`“可达性” `，指以某种方式可访问或可用的值，它们被保证存储在内存中。

1. 有一组基本的固有可达值，由于显而易见的原因无法删除,`这些值称为根`。例如:
  - 本地函数的局部变量和参数
  - 当前嵌套调用链上的其他函数的变量和参数
  - 全局变量
  - 还有一些其他的，内部的
2. **如果引用或引用链可以从根访问任何其他值，则认为该值是可访问的**。

`垃圾回收器，它监视所有对象，并删除那些不可访问的对象`

  1. 什么是垃圾?
      一般来说没有被引用的对象就是垃圾，就是要被清除， 有个例外如果几个对象引用形成一个环，互相引用，但根访问不到它们，这几个对象也是垃圾，也要被清除。
  2. 如何检垃圾?
      1.  标记-清除算法 Mark-Sweep GC
        1. 垃圾回收器获取根并“标记”(记住)它们。
        2. 然后它访问并“标记”所有来自它们的引用。
        3. 然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。
        4. 以此类推，直到有未访问的引用(可以从根访问)为止。
        5. 除标记的对象外，所有对象都被删除。
          ![标记删除](https://upload-images.jianshu.io/upload_images/2732904-4b848615979a7e91.png?imageMogr2/auto-orient/strip|imageView2/2/w/802/format/webp)
      2.  标记-压缩 Mark-Compact
      3.  引用计数 Reference Counting
      4.  GC 复制算法
      5.  保守式GC
      6.  分代回收
      7.  增量式GC


### 1.5. js继承

想要继承，就必须要提供个父类（继承谁，提供继承的属性）

1. 原型链继承:`让新实例的原型等于父类的实例。`
  - `特点`
    1. 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）   
  - `缺点`
    1. 新实例无法向父类构造函数传参。
    2. 继承单一。
    3. 所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
   
2. 借用构造函数（类式继承）:`用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））`   
  -` 特点`： 
    1. 只继承了父类构造函数的属性，没有继承父类原型的属性。
    2. 解决了原型链继承缺点1、2、3。
    3. 可以继承多个构造函数属性（call多个）。
    4. 在子实例中可向父实例传参。

  -` 缺点`： 
    1. 只能继承父类构造函数的属性。
    2. 无法实现构造函数的复用。（每次用每次都要重新调用）
    3. 每个新实例都有父类构造函数的副本，臃肿。
        
3. 组合式继承（组合原型链继承和借用构造函数继承）（常用） `结合了两种模式的优点，传参和复用`            
  - `特点`：
    1. 可以继承父类原型上的属性，可以传参，可复用。
    2. 每个新实例引入的构造函数属性是私有的。
  - `缺点`：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

4. 原型式继承
   - `重点`：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
   - `特点`：类似于复制一个对象，用函数来包装。
   - `缺点`：
      1. 所有实例都会继承原型上的属性。
      2. 无法实现复用。（新实例属性都是后面添加的）
   
2. 寄生式继承 
  - `重点`：就是给原型式继承外面套了个壳子。
  - `优点`：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
  - `缺点`：没用到原型，无法复用。
  
6. 寄生组合式继承（常用）
  - `寄生`：在函数内返回对象然后调用
  - `组合`：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参　
  - `重点`：修复了组合继承的问题
  

```js
// 父类---------------------------
function Person(name){ //给构造函数添加参数
  this.name=name
  this.sayName =function(){
    alert(this.name)
  }
}
Person.prototype.age = 18; //给构造函数添加了原型属性

// 原型链继承---------------------------
function Per(){
  this.name = 'panpan';  
}
Per.prototype= new Person(); //重点
var per1 = new Per();
console.log(per1.age); // 18

// instanceof判断元素是否在另一个元素的原型链上
console.log(per1 instanceof Person); //true
// 借用构造函数继承---------------------
function Con(){
  Person.call(this,'ava'); //重点
  this.age = 21
}
var con1 = new Con()
console.log(con1.name) //ava
console.log(con1.age) //21
console.log(con1 instanceof Person) //false

// 组合原型链继承和借用构造函数继承
function SubType(name){
  Person.call(this,name); //借用构造函数模式
}
SubType.prototype= new Person();  //原型链继承
var sub = new SubType('lian')
console.log(sub.name) //lian  继承构造函数属性
console.log(sub.age) //18    继承父类原型属性

// 原型式继承---------------------------
// 先封装1个函数容器，用来输出对象和承载继承的原型
function content(obj){
  function F(){}
  F.prototype=obj; //继承传入的参数
  return new F() //返回函数对象
}
var sup = new Person();   //拿到父类的实例
var sup1 = content(sup)
console.log(sup1.age) //18 继承父类函数属性

// 寄生式继承----------------------
// 给原型式继承再套个壳子传递参数
function subObject(obj){
  var sub = content(obj)
  obj.name= 'pan';
  return sub
}
//声明后成了可增添属性的对象
var sup2 = subObject(sup)
console.log(typeof subObject) //function
console.log(typeof sup2) //object
console.log(sup2.name) //pan

// 寄生组合式继承---------------------
// 寄生
function content(obj){
  function F(){}
  F.prototype=obj; //继承传入的参数
  return new F() //返回函数对象
}
// content就是F实例的另一种表达
var con = content(Person.prototype)
// con实例(F实例)的原型链继承了父类函数的原型
// 上述更像原型链继承,只不过继承了原型属性

// 组合
function Sub(){
  Person.call(this) // 继承父类构造函数属性
} //解决组合式2次调用构造函数属性的缺点
// 重点
Sub.prototype = con; //继承con实例
con.constructor = Sub;  //一定要修复实例
var sub1 = new Sub();
// Sub实例继承了构造函数属性、父类实例、con的函数属性
console.log(sub1.age)
```

### 1.6. 闭包

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念

闭包有三个特性：
1. 函数嵌套函数
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被F垃圾回收机制回收
   
### 1.7. 内存溢出与内存泄露

1. 什么是内存溢出？
  - 一种程序运行出现的错误。
  - 当程序运行时需要的内存超过剩余的内存时，就会内存溢出的错误。

```js
// 由于循环量过大而导致物理内存不够
const obj = {}
for (var i = 0; i < 100000000; i++) {
   obj[i] = new Array(100000000)
   console.log('-----------------')
}
```

2. 什么是内存泄露？
  - 占用的内存没有及时释放。
  - 内存泄露积累多了就容易导致内存溢出。
  - 常见的内存泄露：意外的全局变量、没有及时清理的定时器或回调函数、闭包。

```js
// 1.意外的全局变量-------------
// 执行函数的时候，由于变量提升而导致a变成全局变量，函数执行完之后a还占着空间
function fn1() {
  a = 1
  console.log(a)
}
fn1()

// 2、定时器没有关闭----------
const intervalTime = setInterval(function () {
    console.log("------")
 }, 2000)
//  由于没关闭定时器而导致内存溢出，除非浏览器关闭、刷新，不然的话会一直执行下去哟。
clearInterval(intervalTime) // 关闭定时器，释放内存（保存良好习惯，用完就关）

// 3. 闭包
function fn1() {
  let a = 2
  function fn2() {
    console.log(++a)
    }
  return fn2
}
const fn = fn1()
fn()
// 执行完函数之后 a没有被释放掉，是因为fn保存了fn1函数。

// 记得清空变量，等待回收。
fn = null // 释放内存


```
   
### 1.8. new操作符具体干了什么呢?

1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2. 属性和方法被加入到 this 引用的对象中。
3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。

-------
## vue基础

### MVC 和 MVVM 区别 
`MVC`:Controller 负责将 Model 的数据用 View 显示出来，换句话说就是在 Controller 里面把 Model 的数据赋值给 View。
![mvc](/img/mvc.image)
`MVVM`做了两件事达到了数据的双向绑定 一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。
![MVVM](/img/mvvm.image) 

MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）

> 严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 提供了$refs 这个属性，让 Model 可以直接操作 View，违反了这一规定，所以说 Vue 没有完全遵循 MVVM。

### 为什么 data 是一个函数

组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于`给每个组件实例创建一个私有的数据空间`，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果

### Vue 组件通讯有哪几种方式
1. `props 和$emit `
   父组件向子组件传递数据是通过 prop 传递的，子组件传递数据给父组件是通过$emit 触发事件来做到的
2. `$parent,$children`获取当前组件的父组件和当前组件的子组件
3. `$attrs 和$listeners` A->B->C。Vue 2.4 开始提供了$attrs 和$listeners 来解决这个问题
```html
// index.vue
<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>
// childCom1.vue
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script> 

// childCom2.vue
<template>
  <div class="border">
    <p>boo: {{ boo }}</p>
    <p>childCom2: {{ $attrs }}</p>
    <child-com3 v-bind="$attrs"></child-com3>
  </div>
</template>
<script>
const childCom3 = () => import("./childCom3.vue");
export default {
  components: {
    childCom3
  },
  inheritAttrs: false,
  props: {
    boo: String
  },
  created() {
    console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script> 

// childCom3.vue
<template>
  <div class="border">
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  }
};
</script>

```

4. 父组件中通过 `provide` 来提供变量，然后在子组件中通过 `inject` 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)
   >Vue2.2.0新增API,这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。一言而蔽之：祖先组件中通过provider来提供变量，然后在子孙组件中通过inject来注入变量。
provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
```js
// 假设有两个组件： A.vue 和 B.vue，B 是 A 的子组件
// A.vue
export default {
  provide: {
    name: '浪里行舟'
  }
}
// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // 浪里行舟
  }
}
// provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的----vue官方文档
// 所以，上面 A.vue 的 name 如果改变了，B.vue 的 this.name 是不会改变的，仍然是 浪里行舟。
```
```html
<!-- provide与inject 怎么实现数据响应式 -->

provide祖先组件的实例，然后在子孙组件中注入依赖，这样就可以在子孙组件中直接修改祖先组件的实例的属性，不过这种方法有个缺点就是这个实例上挂载很多没有必要的东西比如props，methods
使用2.6最新API Vue.observable 优化响应式 provide(推荐)

// A 组件 
<div>
      <h1>A 组件</h1>
      <button @click="() => changeColor()">改变color</button>
      <ChildrenB />
      <ChildrenC />
</div>
......
  data() {
    return {
      color: "blue"
    };
  },
  // provide() {
  //   return {
  //     theme: {
  //       color: this.color //这种方式绑定的数据并不是可响应的
  //     } // 即A组件的color变化后，组件D、E、F不会跟着变
  //   };
  // },
  provide() {
    return {
      theme: this//方法一：提供祖先组件的实例
    };
  },
  methods: {
    changeColor(color) {
      if (color) {
        this.color = color;
      } else {
        this.color = this.color === "blue" ? "red" : "blue";
      }
    }
  }
  // 方法二:使用2.6最新API Vue.observable 优化响应式 provide
  // provide() {
  //   this.theme = Vue.observable({
  //     color: "blue"
  //   });
  //   return {
  //     theme: this.theme
  //   };
  // },
  // methods: {
  //   changeColor(color) {
  //     if (color) {
  //       this.theme.color = color;
  //     } else {
  //       this.theme.color = this.theme.color === "blue" ? "red" : "blue";
  //     }
  //   }
  // }

  // F 组件 
<template functional>
  <div class="border2">
    <h3 :style="{ color: injections.theme.color }">F 组件</h3>
  </div>
</template>
<script>
export default {
  inject: {
    theme: {
      //函数式组件取值不一样
      default: () => ({})
    }
  }
};
</script>
```
5. `$refs`如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
```html
// component-a 子组件
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
// 父组件
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```
6. `envetBus `兄弟组件数据传递 这种情况下可以使用事件总线的方式
```html
 <!-- 通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。
 当我们的项目比较大时，可以选择更好的状态管理解决方案vuex。 -->

var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});

<!-- 假设兄弟组件有三个，分别是A、B、C组件，C组件如何获取A或者B组件的数据 -->
<div id="itany">
    <my-a></my-a>
    <my-b></my-b>
    <my-c></my-c>
</div>
<template id="a">
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>
<template id="b">
  <div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
</template>
<template id="c">
  <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
</template>
<script>
var Event = new Vue();//定义一个空的Vue实例
var A = {
    template: '#a',
    data() {
      return {
        name: 'tom'
      }
    },
    methods: {
      send() {
        Event.$emit('data-a', this.name);
      }
    }
}
var B = {
    template: '#b',
    data() {
      return {
        age: 20
      }
    },
    methods: {
      send() {
        Event.$emit('data-b', this.age);
      }
    }
}
var C = {
    template: '#c',
    data() {
      return {
        name: '',
        age: ""
      }
    },
    mounted() {//在模板编译完成后执行
     Event.$on('data-a',name => {
         this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
     })
     Event.$on('data-b',age => {
         this.age = age;
     })
    }
}
var vm = new Vue({
    el: '#itany',
    components: {
      'my-a': A,
      'my-b': B,
      'my-c': C
    }
});    
</script>
```
7. `vuex` 状态管理
   ![vuex](/img/vuex.png.crdownload)

### Vue 的生命周期方法有哪些 一般在哪一步发请求

- `beforeCreate` 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问
- `created` 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el,如果非要想与 Dom 进行交互，可以通过 vm.$nextTick 来访问 Dom
- `beforeMount` 在挂载开始之前被调用：相关的 render 函数首次被调用。
- `mounted` 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点
- `beforeUpdate` 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程
- `updated` 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新，该钩子在服务器端渲染期间不被调用。
- `beforeDestroy` 实例销毁之前调用。在这一步，实例仍然完全可用。我们可以在这时进行善后收尾工作，比如清除计时器。
- `destroyed` Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
- `activated` keep-alive 专属，组件被激活时调用
- `deactivated` keep-alive 专属，组件被销毁时调用

> 异步请求在哪一步发起？

- 如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求
  - 能更快获取到服务端数据，减少页面 loading 时间；
  - ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
- 否则在beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
  
### vue内置指令
![vue内置指令](/img/vue-inner-instruction.image)

### 怎样理解 Vue 的单向数据流
数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

>注意：在子组件直接用 v-model 绑定父组件传过来的 prop 这样是不规范的写法 开发环境会报警告

如果实在要改变父组件的 prop 值 可以再 data 里面定义一个变量 并用 prop 的值初始化它 之后用$emit 通知父组件去修改

### computed 和 watch 的区别和运用的场景

computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容，它可以设置 getter 和 setter。

watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

计算属性一般用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑

### v-if 与 v-for 为什么不建议一起使用
v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 再解析 v-if。如果遇到需要同时使用时可以考虑写成计算属性的方式。

### Vue2.0 响应式数据的原理 `数据劫持+观察者模式`

对象内部通过 defineReactive 方法，使用 Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。当页面使用对应属性时，每个属性都拥有自己的 dep 属性，存放他所依赖的 watcher（依赖收集），当属性变化后会通知自己对应的 watcher 去更新(派发更新)。
```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 污染全局的 Array 原型
    // Array.prototype.push = function () {
    //     updateView()
    //     ...
    // }

    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组


```
### vue3.0 用过吗 了解多少
- `响应式原理的改变`。Vue3.x 使用 Proxy `Reflect` 取代 Vue2.x 版`Object.defineProperty`
- `组件选项声明方式`
  Vue3.x 使用 Composition API
  setup 是 Vue3.x 新增的一个选项， 他是组件内使用 Composition API 的入口。
- `模板语法变化`
  slot 具名插槽语法
  自定义指令
  v-model 升级
- 其它方面的更改
  Suspense
  支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
  基于 treeshaking 优化，提供了更多的内置功能。

### vue3.0响应式Proxy
```js
// const data = {
//     name: 'zhangsan',
//     age: 20,
// }
const data = ['a', 'b', 'c']

const proxyData = new Proxy(data, {
    get(target, key, receiver) {
        // 只处理本身（非原型的）属性
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
            console.log('get', key) // 监听
        }

        const result = Reflect.get(target, key, receiver)
        return result // 返回结果
    },
    set(target, key, val, receiver) {
        // 重复的数据，不处理
        if (val === target[key]) {
            return true
        }

        const result = Reflect.set(target, key, val, receiver)
        console.log('set', key, val)
        // console.log('result', result) // true
        return result // 是否设置成功
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key)
        console.log('delete property', key)
        // console.log('result', result) // true
        return result // 是否删除成功
    }
})


```

### Vue 的父子组件生命周期钩子函数执行顺序

- 加载渲染过程
`父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted`

- 子组件更新过程
`父 beforeUpdate->子 beforeUpdate->子 updated->父 updated`

- 父组件更新过程
`父 beforeUpdate->父 updated`

销毁过程
`父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed`

### 虚拟 DOM 是什么 有什么优缺点

由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现。Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

##### 优点：
- `保证性能下限`： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；

- `无需手动操作 DOM`： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；

- `跨平台`： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。


##### 缺点:
- `无法进行极致优化`： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
  
- 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢
  
### v-model 原理

v-model 只是语法糖而已
v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。
```html
<input v-model="sth" />  //这一行等于下一行
<input v-bind:value="sth" v-on:input="sth = $event.target.value" />

<currency-input v-model="price"></currentcy-input>
<!--上行代码是下行的语法糖
 <currency-input :value="price" @input="price = arguments[0]"></currency-input>
-->

<!-- 子组件定义 -->
Vue.component('currency-input', {
 template: `
  <span>
   <input
    ref="input"
    :value="value"
    @input="$emit('input', $event.target.value)"
   >
  </span>
 `,
 props: ['value'],
})
```

### v-for 为什么要加 key
如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

- `更准确`：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
- `更快速`：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快
  
```js
// 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}

// 根据key来创建老的儿子的index映射表  类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
function makeIndexByKey(children) {
  let map = {};
  children.forEach((item, index) => {
    map[item.key] = index;
  });
  return map;
}
// 生成的映射表
let map = makeIndexByKey(oldCh);

```
### Vue 事件绑定原理
原生事件绑定是通过 `addEventListener` 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的`$on` 实现的。如果要在组件上使用原生事件，需要加.native 修饰符，这样就相当于在父组件中把子组件当做普通 html 标签，然后加上原生事件。

`$on、$emit` 是基于发布订阅模式的，维护一个事件中心，on 的时候将事件按名称存在事件中心里，称之为订阅者，然后 emit 将对应的事件进行发布，去执行事件中心里的对应的监听器

### vue-router 路由钩子函数是什么 执行顺序是什么

路由钩子的执行流程, 钩子函数种类有:`全局守卫`、`路由守卫`、`组件守卫`

##### 完整的导航解析流程:
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### vue-router 动态路由是什么 有什么问题
我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果
```js
const User = {
  template: "<div>User</div>",
};

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

### vue-router 组件复用导致路由参数失效怎么办？
1. 通过 watch 监听路由参数再发请求
```js
watch: { //通过watch来监听路由变化
 "$route": function(){
 this.getData(this.$route.params.xxx);
 }
}
```
2. 用 `:key` 来阻止“复用”
```html
<router-view :key="$route.fullPath" />
```

###  vuex 的个人理解
vuex 是专门为 vue 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。（无法持久化、内部核心原理是通过创造一个全局实例 new Vue）
![vuex](/img/vuex.image)

主要包括以下几个模块：

- `State`：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- `Getter`：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- `Mutation`：是唯一更改 store 中状态的方法，且必须是同步函数。
- `Action`：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- `Module`：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。
  
### Vuex 页面刷新数据丢失怎么解决
需要做 vuex 数据持久化 一般使用本地存储的方案来保存数据 可以自己设计存储方案 也可以使用第三方插件

推荐使用 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中

### Vuex 为什么要分模块并且加命名空间
`模块`:由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

`命名空间`：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

### 使用过 Vue SSR 吗？说说 SSR
SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

`优点`：SSR 有着更好的 SEO、并且首屏加载速度更快
`缺点`：开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。
服务器会有更大的负载需求

### vue 中使用了哪些设计模式
1. `工厂模式` - 传入参数即可创建实例
  虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode
2. `单例模式` - 整个程序有且仅有一个实例
   vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉
3. `发布-订阅模式` (vue 事件机制)
4. `观察者模式` (响应式数据原理)
5. `装饰模式`: (@装饰器的用法)
6. `策略模式` 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

###  Vue 的性能优化
- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 大数据列表和表格性能优化-虚拟列表/虚拟表格
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用
- 服务端渲染 SSR or 预渲染

### Vue.mixin 的使用场景和原理
在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 `mergeOptions` 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
```js
export default function initMixin(Vue){
  Vue.mixin = function (mixin) {
    //   合并对象
      this.options=mergeOptions(this.options,mixin)
  };
}
};

// src/util/index.js
// 定义生命周期
export const LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
];

// 合并策略
const strats = {};
// mixin核心方法
export function mergeOptions(parent, child) {
  const options = {};
  // 遍历父亲
  for (let k in parent) {
    mergeFiled(k);
  }
  // 父亲没有 儿子有
  for (let k in child) {
    if (!parent.hasOwnProperty(k)) {
      mergeFiled(k);
    }
  }

  //真正合并字段方法
  function mergeFiled(k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k]);
    } else {
      // 默认策略
      options[k] = child[k] ? child[k] : parent[k];
    }
  }
  return options;
}

```

### nextTick 使用场景和原理
nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法
```js
let callbacks = [];
let pending = false;
function flushCallbacks() {
  pending = false; //把标志还原为false
  // 依次执行回调
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}
let timerFunc; //定义异步方法  采用优雅降级
if (typeof Promise !== "undefined") {
  // 如果支持promise
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
} else if (typeof MutationObserver !== "undefined") {
  // MutationObserver 主要是监听dom变化 也是一个异步方法
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== "undefined") {
  // 如果前面都不支持 判断setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // 最后降级采用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb) {
  // 除了渲染watcher  还有用户自己手动调用的nextTick 一起被收集到数组
  callbacks.push(cb);
  if (!pending) {
    // 如果多次调用nextTick  只会执行一次异步 等异步队列清空之后再把标志变为false
    pending = true;
    timerFunc();
  }
}

```

###  keep-alive 使用场景和原理
keep-alive 是 Vue 内置的一个组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
- 常用的两个属性 include/exclude，允许组件有条件的进行缓存。
- 两个生命周期 activated/deactivated，用来得知当前组件是否处于活跃状态。
- keep-alive 的中还运用了 LRU(最近最少使用) 算法，选择最近最久未使用的组件予以淘汰。
```js
export default {
  name: "keep-alive",
  abstract: true, //抽象组件

  props: {
    include: patternTypes, //要缓存的组件
    exclude: patternTypes, //要排除的组件
    max: [String, Number], //最大缓存数
  },

  created() {
    this.cache = Object.create(null); //缓存对象  {a:vNode,b:vNode}
    this.keys = []; //缓存组件的key集合 [a,b]
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    //动态监听include  exclude
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },

  render() {
    const slot = this.$slots.default; //获取包裹的插槽默认值
    const vnode: VNode = getFirstComponentChild(slot); //获取第一个子组件
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      // 不走缓存
      if (
        // not included  不包含
        (include && (!name || !matches(include, name))) ||
        // excluded  排除里面
        (exclude && name && matches(exclude, name))
      ) {
        //返回虚拟节点
        return vnode;
      }

      const { cache, keys } = this;
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      if (cache[key]) {
        //通过key 找到缓存 获取实例
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key); //通过LRU算法把数组里面的key删掉
        keys.push(key); //把它放在数组末尾
      } else {
        cache[key] = vnode; //没找到就换存下来
        keys.push(key); //把它放在数组末尾
        // prune oldest entry  //如果超过最大值就把数组第0项删掉
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true; //标记虚拟节点已经被缓存
    }
    // 返回虚拟节点
    return vnode || (slot && slot[0]);
  },
};

```
![keep-alive](/img/keeplive.image)

### Vue.set 方法原理
下面两种情况下修改数据 Vue 是不会触发视图更新的：
1. 在实例创建之后添加新的属性到实例上（给响应式对象新增属性）
2. 直接更改数组下标来修改数组的值
 
因为响应式数据 我们给对象和数组本身都增加了__ob__属性，代表的是 Observer 实例。当给对象新增不存在的属性 首先会把新的属性进行响应式跟踪 然后会触发对象__ob__的 dep 收集到的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法去更新数组
```typescript
export function set(target: Array | Object, key: any, val: any): any {
  // 如果是数组 调用我们重写的splice方法 (这样可以更新视图)
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  // 如果是对象本身的属性，则直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;

  // 如果不是响应式的也不需要将其定义成响应式属性
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 将属性定义成响应式的
  defineReactive(ob.value, key, val);
  // 通知视图更新
  ob.dep.notify();
  return val;
}
```
### Vue.extend 作用和原理
Vue.extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

其实就是一个子类构造器 是 Vue 组件的核心 api 实现思路就是使用原型继承的方法返回了 Vue 的子类 并且利用 mergeOptions 把传入组件的 options 和父类的 options 进行了合并
```js
export default function initExtend(Vue) {
  let cid = 0; //组件的唯一标识
  // 创建子类继承Vue父类 便于属性扩展
  Vue.extend = function (extendOptions) {
    // 创建子类的构造函数 并且调用初始化方法
    const Sub = function VueComponent(options) {
      this._init(options); //调用Vue初始化方法
    };
    Sub.cid = cid++;
    Sub.prototype = Object.create(this.prototype); // 子类原型指向父类
    Sub.prototype.constructor = Sub; //constructor指向自己
    Sub.options = mergeOptions(this.options, extendOptions); //合并自己的options和父类的options
    return Sub;
  };
}

```

### 写过自定义指令吗 原理是什么
指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

自定义指令有五个生命周期（也叫钩子函数），分别是 `bind、inserted、update、componentUpdated、unbind`

    1. bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

    2. inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

    3. update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。

    4. componentUpdated：被绑定元素所在模板完成一次更新周期时调用。

    5. unbind：只调用一次，指令与元素解绑时调用。
  
**原理**
1. 在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
2. 通过 genDirectives 生成指令代码
3. 在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子
4. 当执行指令对应钩子函数时，调用对应指令定义的方法

### Vue 修饰符有哪些

##### 事件修饰符
- `.stop` 阻止事件继续传播
- `.prevent` 阻止标签默认行为
- `.capture` 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
- `.self` 只当在 event.target 是当前元素自身时触发处理函数
- `.once` 事件将只会触发一次
- `.passive` 告诉浏览器你不想阻止事件的默认行为

##### v-model 的修饰符
- `.lazy` 通过这个修饰符，转变为在 change 事件再同步
- `.number` 自动将用户的输入值转化为数值类
- `.trim` 自动过滤用户输入的首尾空格

##### 键盘事件的修饰符
- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

##### 系统修饰键
- .ctrl
- .alt
- .shift
- .meta

##### 鼠标按钮修饰符
- .left
- .right
- .middle

### Vue 模板编译原理

Vue 的编译过程就是将 template 转化为 render 函数的过程 分为以下三步

    第一步是将 模板字符串 转换成 element ASTs（解析器）
    第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）
    第三步是 使用 element ASTs 生成 render 函数代码字符串（代码生成器）
```js
export function compileToFunctions(template) {
  // 我们需要把html字符串变成render函数
  // 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
  // 很多库都运用到了ast 比如 webpack babel eslint等等
  let ast = parse(template);
  // 2.优化静态节点
  // 这个有兴趣的可以去看源码  不影响核心功能就不实现了
  //   if (options.optimize !== false) {
  //     optimize(ast, options);
  //   }

  // 3.通过ast 重新生成代码
  // 我们最后生成的代码需要和render函数一样
  // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
  // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本
  let code = generate(ast);
  //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
  let renderFn = new Function(`with(this){return ${code}}`);
  return renderFn;
}
```

### 生命周期钩子是如何实现的
Vue 的生命周期钩子核心实现是利用`发布订阅`模式先把用户传入的的生命周期钩子订阅好（内部采用数组的方式存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）
```js
export function callHook(vm, hook) {
  // 依次执行生命周期对应的方法
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm); //生命周期里面的this指向当前实例
    }
  }
}

// 调用的时候
Vue.prototype._init = function (options) {
  const vm = this;
  vm.$options = mergeOptions(vm.constructor.options, options);
  callHook(vm, "beforeCreate"); //初始化数据之前
  // 初始化状态
  initState(vm);
  callHook(vm, "created"); //初始化数据之后
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```
###  函数式组件使用场景和原理

> 1.函数式组件需要在声明组件是指定 functional:true
2.不需要实例化，所以没有this,this通过render函数的第二个参数context来代替
3.没有生命周期钩子函数，不能使用计算属性，watch
4.不能通过$emit 对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件
5.因为函数式组件是没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement
6.函数式组件的props可以不用显示声明，所以没有在props里面声明的属性都会被自动隐式解析为prop,而普通组件所有未声明的属性都解析到$attrs里面，并自动挂载到组件根元素上面(可以通过inheritAttrs属性禁止)

优点
 
1. 由于函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件 
2. 函数式组件结构比较简单，代码结构更清晰

使用场景：
一个简单的展示组件，作为容器组件使用 比如 router-view 就是一个函数式组件

“高阶组件”——用于接收一个组件作为参数，返回一个被包装过的组件
```js
if (isTrue(Ctor.options.functional)) {
  // 带有functional的属性的就是函数式组件
  return createFunctionalComponent(Ctor, propsData, data, context, children);
}
const listeners = data.on;
data.on = data.nativeOn;
installComponentHooks(data); // 安装组件相关钩子 （函数式组件没有调用此方法，从而性能高于普通组件）

```
### 能说下 vue-router 中常用的路由模式实现原理吗

##### hash 模式 `兼容性好但是不美观`
- location.hash 的值实际就是 URL 中#后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
- 可以为 hash 的改变添加监听事件
`window.addEventListener("hashchange", funcRef, false);`
每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了

##### history 模式
利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。

### diff 算法

![diff](/img/diff.image)



## js题目
### 数组添加元素的方法
```js
// 1、push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
arrayObject.push(newelement1,newelement2,....,newelementX)

// 2、unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
arrayObject.unshift(newelement1,newelement2,....,newelementX)
// 3、splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
arrayObject.splice(index,howmany,item1,.....,itemX)

```








