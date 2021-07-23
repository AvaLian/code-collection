## 语法

### 如何判断一个元素 CSS 样式溢出，从而可以选择性的加 title 或者 Tooltip?

[https://blog.csdn.net/kaimo313/article/details/107237858](https://blog.csdn.net/kaimo313/article/details/107237858)

利鼠标移动到标签之上时，判断文字内容的宽度是否大于父级的宽度，来判断是否需要title提示
```html
<template>
  <div class="text-over-tooltip-components">
    <el-tooltip :effect="effect" :disabled="isDisabledTooltip" :content="content" :placement="placement">
      <div class="ellipsis" :class="className" @mouseover="onMouseOver(refName)">
        <span :ref="refName">{{content}}</span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TextOverTooltip',
  props: {
    // 显示的文字内容
    content: String,
    // 设置父元素的样式：比如宽度字体等，需可以自己在组件内部配置样式比如字体大小20：fs20
    className: String,
    // 子元素标识（如在同一页面中调用多次组件，此参数不可重复）
    refName: String,
    // 默认提供的主题 dark/light
    effect: {
      type: String,
      default: () => {
        return 'dark';
      }
    },
    // Tooltip 的出现位置top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: () => {
        return 'bottom';
      }
    },
  },
  data() {
    return {
      isDisabledTooltip: true // 是否需要禁止提示
    };
  },
  methods: {
    // 移入事件: 判断内容的宽度contentWidth是否大于父级的宽度
    onMouseOver(str) {
      let parentWidth = this.$refs[str].parentNode.offsetWidth;
      let contentWidth = this.$refs[str].offsetWidth;
      // 判断是否禁用tooltip功能
      this.isDisabledTooltip = contentWidth <= parentWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
.text-over-tooltip-components{
  /* 文字超出宽度显示省略号 单行 */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  /* 自定义样式 */
  .fs20 {
    font-size: 20px;
    font-weight: 600;
    color: green;
    line-height: 22px;
  }
  .fs12 {
    font-size: 12px;
    font-weight: 400;
    color: orange;
    line-height: 14px;
  }
}
</style>
```

### 如何让 CSS 元素左侧自动溢出（... 溢出在左侧） 

``` css
.footer {
  width: 300px;
  height: 20px;
  display: flex;
  overflow: hidden;
}
.left {
  background: #3cc8b4;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 50px;
}
.right {
  background: #9bc;
  max-width: 250px;
}
.right-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
```html
<div class="footer">
   <div class="left">
     leftleftleftleftleftleftleftleftleftleftleftleftleft
  </div>
  <div class="right">
    <div class="right-ellipsis">
      rightrightrightrightrightrightrightrightright
    </div>
  </div>
</div>
```

### 如何处理浏览器中表单项的密码自动填充问题？

Chrome，当浏览器遇到type="text"与type="password"的<input/>标签紧邻时，会触发浏览器自动填充行为。默认为黄色背景。
firefox和360浏览器的处理方式是：只要检测到页面里有满足填充机制的，不管是不是display：none 的，只要检测到就直接往里填充。

1. 使用HTML5新属性`autocomplete="off"`   但禁用自动填充
2.  <input type="password" readonly onfocus="this.removeAttribute('readonly');"/>  将表单输入设为可读模式，浏览器自动填充就失效了，在焦点在该表单输入的时候再将可读属性移除。该方法亲试简洁好用


### Hash 和 History 路由的区别和优缺点？

**hash模式**

1. `原理`: 在 url 中的 # 之后对应的是 hash 值, 其原理是通过`hashChange()` 事件监听hash值的变化, 根据路由表对应的hash值来判断加载对应的路由加载对应的组件
2. `优点:`
  (1) 只需要前端配置路由表, 不需要后端的参与
  (2) 兼容性好, 浏览器都能支持
  (3) hash值改变不会向后端发送请求, 完全属于前端路由
3. 缺点:
  (1) hash值前面需要加#, 不符合url规范,也不美观

**history模式:**

1. 原理:history运用了浏览器的历史记录栈，之前有back,forward,go方法，之后在HTML5中新增了pushState（）和replaceState（）方法，它们提供了对历史记录进行修改的功能，不过在进行修改时，虽然改变了当前的URL，但是浏览器不会马上向后端发送请求。
   
  > 查看浏览器是否支持history，只需在console里面输入history即可

2. `优点`:
  (1) 符合url地址规范, 不需要#, 使用起来比较美观
3. `缺点`:
  (1) 在用户手动输入地址或刷新页面时会发起url请求, 后端需要配置index.html页面用户匹配不到静态资源的情况, 否则会出现404错误
  (2) 兼容性比较差, 是利用了 HTML5 History对象中新增的 pushState() 和 replaceState() 方法,需要特定浏览器的支持.

### JavaScript 中的 const 数组可以进行 push 操作吗？为什么？

可以进行push操作。

因为const声明的时候，不能改变的是这个变量在内存中的指针。数组和对象是引用类型。splice和push并不会改变该数组在内存中的地址引用，所以不会报错

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。


###  TODO：JavaScript 中对象的属性描述符有哪些？分别有什么作用？

### JavaScript 中 console 有哪些 api ?

| 占位符   | 描述     |
| :------- | :------- |
| %s       | 字符串   |
| %d or %i | 整数     |
| %o or %O | 对象     |
| %f       | 浮点数   |
| %c       | 样式代码 |
- `console.log`
  ```js
  var name = 'anran758';

// 常规使用方式，输出原始值
console.log('Hello'); // Hello
console.log(name); // anran758
console.log(`Hello, ${name}`); // Hello, anran758
  // 第一个参数是替换字符串，后面是替换的规则
console.log('Hi, %s. what are you doing', name); // Hi, anran758. what are you doing
console.log('%c I am some great text', 'font-size: 50px;'); // 假装 50px: Hi, anran758. what are you doing
  ```
- `console.info`
- `console.debug`
- `console.warn()`
- `console.error()`
- `console.table()`将某些复合类型的数据转为表格显示。
- `console.count()`用于计数，输出它被调用了多少次
- `console.dir`用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示
- `console.assert`用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
  它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。
- `console.time()，console.timeEnd()`用于计时，可以算出一个操作所花费的准确时间。可以用在查看一个算法的时间
- `onsole.group和console.groupEnd`用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
- ``

### 简单对比一下 Callback、Promise、Generator、Async 几个异步 API 的优劣？
[https://blog.csdn.net/Water_Cyan/article/details/110500498])(https://blog.csdn.net/Water_Cyan/article/details/110500498)
为了解决JS单线程问题而提出了异步

1. `callback`初步解决同步问题（即解决了一个任务时间长时，后面的任务排队，耗时太久，使程序的执行变慢问题）
  1. 缺点：
    - 回调地狱(多层级嵌套)
      - 会导致逻辑混乱
      - 耦合性高，改动一处就会导致全部变动
    - 可读性差

2. `Promise` 比callback代码更强大、清晰，解决了callback带来的回调地狱问题
  1. 优点
    - 一旦状态改变，就不会再变，任何时候都可以得到这个结果
    - 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
    - 一定程度上解决了回调地狱的问题
  2. 缺点
    - 无法取消 Promise
    - 当处于pending状态时，无法得知目前进展到哪一个阶段
    - 代码冗余，有一堆任务时也会使语义不清晰
    - 每一个 then 方法内部是一个独立的作用域，要是想共享数据，就要将部分数据暴露在最外层，在then 内部赋值一次
3. `generator`解决了promise无法取消，不确定处于那一阶段的问题
4. `async/await`是generator的语法糖，是generator的改进，背后原理是promise
| 异步发展    | 优点                                                                                                                           | 缺点                                                                                                                                                                                              |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callback    | 解决了同步问题                                                                                                                 | 1. 回调地狱 1.1 导致逻辑混乱1.2 耦合性高，牵一发而动全身 2. 可读性差                                                                                                                              |
| promise     | 1. 解决了回调地狱 2. 可读性好 3. 状态一经改变，不会再变                                                                        | 1. 无法取消promise 2. 处于pending状态时，无法得知目前到哪一个阶段 3. 代码冗余 语义不清 4. 每一个 then 方法内部是一个独立的作用域，要是想共享数据，就要将部分数据暴露在最外层，在then 内部赋值一次 |
| Generator   | 可以控制函数的执行，可以配合co函数库使用	1. 流程管理却不方便（即何时执行第一阶段、何时执行第二阶段） 2. 需要手动使用next()语句 |
| async/await | 对Generator函数的封装，实现最简洁、语义话                                                                                      | 阻塞后面的代码，可能导致性能问题                                                                                                                                                                  |

### Object.defineProperty 有哪几个参数？各自都有什么作用？

Object.defineProperties本质上定义了obj 对象上props的可枚举属性相对应的所有属性。


```js
Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(obj, 'name', {
  // configurable: false,//默认为false
  // enumerable: false,//默认为false
  value: 'kongzhi',
  // writable: false,/默认为false
  // get(){},
  // set(v){}
});
// obj 需要定义属性的对象
// prop 需要定义或者修改的property的名字或者Symbol
// descriptor 定义和修改的property的描述符 。描述符必须是data, accessor之一，不能同时具有两种特性
  value:属性的值(不用多说了)
  writable:如果为false，属性的值就不能被重写,只能为只读了
  configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
    - configurable属性控制属性是否可以被修改（除value和writable外），或者属性被删除。
    - configurable为false时，非data descriptor的属性不能被重定义，也就是说除value和writable之外的属性不能定义，而且特别要注意，value可以随意改，而writable仅能从true改为false。get(), set(), enumerable, 
    - configurable 不仅仅影响属性的修改，还影响到了属性的删除。configurable为false时delete obj.o失效
  enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。
    - `展开操作符...`enumerable为true的都能被解构出来，包括Symbol。
    - `Object.keys(),for...in`enumerable为true的都能被解构出来，不包括Symbol。
  get:一会细说
  set:一会细说


如何获取属性的descriptor？
var o = {};
Object.defineProperty(o, 'a', { value: 1 });
Object.getOwnPropertyDescriptor(o,'a')
// {
//     configurable: false
//     enumerable: false
//     value: 1
//     writable: false
// }


var o = {};

o.a = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});

// 典型的data descriptor
Object.defineProperty({this, 'a', {
    value: 'a',
    writable: false
})
// 典型的accessor descriptor
Object.defineProperty({this, 'a', {
    get(){ ... }
    set(){ ... }
})


var o = {};
Object.defineProperty(o, 'a', {
  value: 1,
  enumerable: true
});
Object.defineProperty(o, 'b', {
  value: 2,
  enumerable: false
});
Object.defineProperty(o, 'c', {
  value: 3, // enumerable默认为false
}); 
o.d = 4; // enumerable默认为true
Object.defineProperty(o, Symbol.for('e'), {
  value: 5,
  enumerable: true
});
Object.defineProperty(o, Symbol.for('f'), {
  value: 6,
  enumerable: false
});
```
#### console.log(a+a+a); // 'abc'题解
```js
/**
 * 解法1: Object.defineProperty() 外部变量
 */
let value = "a";
Object.defineProperty(this, "a", {
  get() {
    let result = value;
    if (value === "a") {
      value = "b";
    } else if (value === "b") {
      value = "c";
    }
    return result;
  },
});
console.log(a + a + a);
/**
 * 解法1(优化版)：Object.defineProperty() 内部变量
 */
Object.defineProperty(this, "a", {
  get() {
    this._v = this._v || "a";
    if (this._v === "a") {
      this._v = "b";
      return "a";
    } else if (this._v === "b") {
      this._v = "c";
      return "b";
    } else {
      return this._v;
    }
  },
});
console.log(a + a + a);

/**
 * 解法2: Object.prototpye.valueOf()
 */
let index = 0;
let a = {
  value: "a",
  valueOf() {
    return ["a", "b", "c"][index++];
  },
};
console.log(a + a + a);

/**
 * 解法3：charCodeAt，charFromCode
 */
let code = "a".charCodeAt(0);
let count = 0;
Object.defineProperty(this, "a", {
  get() {
    let char = String.fromCharCode(code + count);
    count++;
    return char;
  },
});
console.log(a + a + a); // 'abc'

/**
 * 解法3(优化版一)：内部变量this._count和_code
 */
Object.defineProperty(this, "a", {
  get() {
    let _code = "a".charCodeAt(0);
    this._count = this._count || 0;
    let char = String.fromCharCode(_code + this._count);
    this._count++;
    return char;
  },
});
console.log(a + a + a); // 'abc'

/**
 * 解法3(优化版二)：内部变量this._code
 */
Object.defineProperty(this, "a", {
  get() {
    this._code = this._code || "a".charCodeAt(0);
    let char = String.fromCharCode(this._code);
    this._code++;
    return char;
  },
});
console.log(a + a + a); // 'abc'

/*
 题目扩展: 打印`a...z`
 a+a+a; //'abc'
 a+a+a+a; //'abcd'
*/
/**
 * charCodeAt，charFromCode
 */
let code = "a".charCodeAt(0);
let count = 0;
Object.defineProperty(this, "a", {
  get() {
    let char = String.fromCharCode(code + count);
    if (count >= 26) {
      return "";
    }
    count++;
    return char;
  },
});
// 打印‘abc’
console.log(a + a + a); // 'abc'

// 打印‘abcd’
let code = "a".charCodeAt(0);
let count = 0;
// {...定义a...}
console.log(a + a + a); // 'abcd'

// 打印‘abcdefghijklmnopqrstuvwxyz’
let code = "a".charCodeAt(0);
let count = 0;
// {...定义a...}
let str = "";
for (let i = 0; i < 27; i++) {
  str += a;
}
console.log(str); // "abcdefghijklmnopqrstuvwxyz"

/*
 题目扩展（优化版）: 打印`a...z`
 a+a+a; //'abc'
 a+a+a+a; //'abcd'
*/

Object.defineProperty(this, "a", {
  get() {
    this._code = this._code || "a".charCodeAt(0);
    let char = String.fromCharCode(this._code);
    if (this._code >= "a".charCodeAt(0) + 26) {
      return "";
    }
    this._code++;
    return char;
  },
});
// 打印‘abc’
console.log(a + a + a); // 'abc'

```

### Object.defineProperty 和 ES6 的 Proxy 有什么区别？

- Proxy使用上比Object.defineProperty方便的多。
- Proxy代理整个对象，Object.defineProperty只代理对象上的某个属性。
- 如果对象内部要全部递归代理，则Proxy可以只在调用时递归，而Object.defineProperty需要在一开始就全部递归，Proxy性能优于Object.defineProperty。
- 对象上定义新属性时，Proxy可以监听到，Object.defineProperty监听不到。
- 数组新增删除修改时，Proxy可以监听到，Object.defineProperty监听不到。
- Proxy不兼容IE，Object.defineProperty不兼容IE8及以下。

Object.defineProperty只能遍历对象属性进行劫持
```js
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
```
Proxy直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
```js
function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // Proxy相当于在对象外层加拦截
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            return res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置${key}:${value}`)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```
Proxy可以直接监听数组的变化（push、shift、splice）
```js
const obj = [1,2,3]
const proxtObj = reactive(obj)
obj.psuh(4) // ok
```
正因为defineProperty自身的缺陷，导致Vue2在实现响应式过程需要实现其他的方法辅助（如重写数组方法、增加额外set、delete方法）
```js
// 数组重写
const originalProto = Array.prototype
const arrayProto = Object.create(originalProto)
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method => {
  arrayProto[method] = function () {
    originalProto[method].apply(this.arguments)
    dep.notice()
  }
});

// set、delete
Vue.set(obj,'bar','newbar')
Vue.delete(obj),'bar')
```

## 业务

### 什么是单点登录？如何做单点登录？

单点登录英文全称Single Sign On，简称就是SSO。它的解释是：在多个应用系统中，只需要登录一次，就可以访问其他相互信任的应用系统。例如，网页登录了淘宝账号，天猫，钉钉等阿里系应用都不用再二次登录了。 SSO核心意义就一句话：`一处登录，处处登录；一处注销，处处注销`。就是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统，即用户只需要记住一组用户名和密码就可以登录所有有权限的系统。

#### 基于Cookie的单点登录
这是最简单的单点登录实现方式，是使用cookie作为媒介，存放用户凭证。 用户登录父应用之后，应用返回一个加密的cookie，当用户访问子应用的时候，携带上这个cookie，授权应用解密cookie并进行校验，校验通过则登录当前用户。
不难发现以上方式把信任存储在客户端的Cookie中，这种方式很容易令人质疑：
- Cookie不安全
  - 通过加密Cookie可以保证安全性，当然这是在源代码不泄露的前提下。如果Cookie
的加密算法泄露，攻击者通过伪造Cookie则可以伪造特定用户身份，这是很危险的。
- 不能跨域实现免登
  - 不能跨域实现免登更是硬伤。因此，有了基于Session的单点登录

#### 基于Session的单点登录
Session解决了Cookie不能跨域的问题，但也存在其他问题。早期的单体应用使用Session实现单点登录，但现在大部分情况下都需要集群，由于存在多台服务器，Session在多台服务器之间是不共享的，因此，还需解决Session共享的问题

解决系统之间的 Session 不共享问题有以下几种方案：
- Tomcat集群Session全局复制（集群内每个tomcat的session完全同步）【会影响集群的性能呢，不建议】
- 根据请求的IP进行Hash映射到对应的机器上（这就相当于请求的IP一直会访问同一个服务器）【如果服务器宕机了，会丢失了一大部分Session的数据，不建议】
- 分布式Session，即把Session数据放在Redis中（使用Redis模拟Session）【建议】
————————————————
版权声明：本文为CSDN博主「Marvellous丶」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/baolingye/article/details/104197535

##### CAS
CAS(Central Authentication Service) 是 Yale 大学发起的一个开源项目，是单点登录的一种现方式，分为CAS服务端和CAS客户端
![/img/cas.png](/img/cas.png)
具体流程如下：
1. 用户访问app系统，app系统是需要登录的，但用户现在没有登录。
2. 跳转到CAS server，即SSO登录系统，以后图中的CAS Server我们统一叫做SSO系统。 SSO系统也没有登录，弹出用户登录页。
3. 用户填写用户名、密码，SSO系统进行认证后，将登录状态写入SSO的session，浏览器（Browser）中写入SSO域下的Cookie。
4. SSO系统登录完成后会生成一个ST（Service Ticket），然后跳转到app系统，同时将ST作为参数传递给app系统。
5. app系统拿到ST后，从后台向SSO发送请求，验证ST是否有效。
6. SSO系统返回验证结果
7. 验证通过后，app系统将登录状态写入session并设置app域下的Cookie。

至此，跨域单点登录就完成了。以后我们再访问app系统时，app就是登录的。接下来，我们再看看访问app2系统时的流程。

8. 用户访问app2系统，app2系统没有登录，跳转到SSO。
9. 由于SSO已经登录了，不需要重新登录认证。
10. SSO生成ST，浏览器跳转到app2系统，并将ST作为参数传递给app2。
11. app2拿到ST，后台访问SSO，验证ST是否有效。
12. SSO系统返回验证结果
13. 验证成功后，app2将登录状态写入session，并在app2域下写入Cookie。
这样，app2系统不需要走登录流程，就已经是登录了。SSO，app和app2在不同的域，它们之间的session不共享也是没问题的。

##### oauth2（第三方登录授权）
OAuth（Open Authorization，开放授权）是为用户资源的授权定义了一个安全、开放及简单的标准，第三方无需知道用户的账号及密码，就可获取到用户的授权信息

主要应用于第三方应用授权登录：在APP或者网页接入一些第三方应用时，时常会需要用户登录另一个合作平台，比如QQ，微博，微信的授权登录,第三方应用通过oauth2方式获取用户信息
![/img/oauth2.png](/img/oauth2.png)

详细步骤如下（以微信登录为例）：
1. 用户访问第三方网站,第三方应用需要用户登录验证,用户选择微信授权登录
2. 第三方应用发起微信登录授权请求
3. 微信服务器拉起用户授权确认页面
4. 用户授权通过
5. 微信发送请求到第三方应用redirctUrl(第2步填写redirct_uri参数),返回凭证code与state(第2步自定义)
6. 第三方应用获取到code之后,根据code获取accessToken
7. 根据accessToken获取用户信息
8. 对用户信息进行处理(用户是否第一次登录,保存用户信息,自定义token,session处理等)
9. 返回结果(步骤1对应url或者重定向到首页)

##### JWT（客户端token）
难度较大，需要了解很多协议
Json web token (JWT)，是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标（(RFC
7519)。该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。
基于JWT认证协议，自己开发SSO服务和权限控制。

以上为常见的单点登录解决方案，当然，在使用的同时也会和其他的权限授权认证的安全框架整合实现，常见的安全框架有

Spring Security
Shiro

### 如何做一个项目的国际化方案？

- vue + vue-i18n
- angular + angular-translate
- react + react-intl
- jquery + jquery.i18n.property