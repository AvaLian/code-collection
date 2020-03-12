## VUE 知识点总结

本部分主要是笔者在VUE工作开发时遇到的一些问题所做的笔记，如果出现错误，希望大家指出！

## 目录

* [1. vue中mixins的使用方法和注意点](#1-vue中mixins的使用方法和注意点)
* [2. vuex存储和本地存储storage的区别](2-vuex存储和本地存储storage的区别)

### 1. vue中mixins的使用方法和注意点

  ##### 使用场景
  
    当你有两个非常相似的组件，它们的功能极其相似，但它们局部稍有不同。

    Vue中的Mixins基本上是一块定义的逻辑，由Vue以特定的规定方式存储，可以反复使用，为Vue实例和组件添加功能。因此，Vue mixins可以在多个Vue组件之间共享，而无需重复代码块。
  
  ##### vuex、mixins、公共组件的区别
  
  -  **vuex：** 用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
  - **Mixins：** 可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。  
  - **组件：** 在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。
  - **Mixins：** 则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。

  ##### 合并规则

  ```
  - 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
  - 同名钩子函数(如created,mounted)将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
  - 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
  ```

  ##### 局部mixins
  ``` js
  //toggle.js
  export const toggle = {
    data() {
      return {
        "show": false
      }
    },
    methods: {
      changeState() {
        this.show = !this.show;
      }
    }
  };
  ```
  
  ``` html
  <template>
    <div>
      <div v-show="show">
        <p>提示框</p>
      </div>
      <button @click="changeState">click</button>
    </div>
  </template>

  <script>
  import {toggle} from './mixins/toggle'

  export default {
    mixins: [toggle]
  }
  </script>
  ```
  ##### 局部mixins
  ```html
  <script>
  import vue from 'vue'

  vue.mixin({
    created() {
      //自定义选项
      const myOption = this.$options.myOption;
      if (myOption) {
        //如果myOption有值则打印
        console.log(myOption);
      }
    }
  })

  export default {
    myOption: "hello world!"
  }
  </script>
  ```
  >**注意：** 请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入。

### 2. vuex存储和本地存储storage的区别 

  1. `区别：` vuex存的是状态，存储在内存，localstorage（本地存储）是浏览器提供的接口，让你存的是接口，以文件的形式存储到本地,永久保存；sessionstorage( 会话存储 ) ,临时保存。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理
   > vuex 用于状态管理，管理的是一个页面中不同的component之间的通信
    由于app大部分都是由单页面组件组成，因此我并没有需要进行同个页面不同component间进行通信的问题。
    而vuex，作为一个实现了flux思想的库，主要为了实现一下功能：
    - 组件之间的数据通信
    - 使用单向数据流的方式进行数据的中心化管理
  1. `应用场景：` vuex用于组件之间的传值，localstorage，sessionstorage则主要用于不同页面之间的传值。
  2. `永久性：` 当刷新页面（这里的刷新页面指的是 --> F5刷新,属于清除内存了）时vuex存储的值会丢失，sessionstorage页面关闭后就清除掉了，localstorage不会。  
   
  >注：很多同学觉得用localstorage可以代替vuex, 对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到，原因就是区别1。

### 3. 深入浅出ES6教程async函数

  async函数的特点

  - 语义化强: ` async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。`
  - 里面的await只能在async函数中使用
  - await后面的语句可以是promise对象、数字、字符串等
  - async函数返回的是一个Promsie对象
  - await语句后的Promise对象变成reject状态时，那么整个async函数会中断，后面的程序不会继续执行

  > try/catch/finally 语句用于处理代码中可能出现的错误信息。
  > 错误可能是语法错误，通常是程序员造成的编码错误或错别字。也 可能是拼写错误或语言中缺少的功能（可能由于浏览器差异）。
  > **try**语句允许我们定义在执行时进行错误测试的代码块。
  > **catch** 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。
  > **finally** 语句在 try 和 catch 之后无论有无异常都会执行。
  > 注意： catch 和 finally 语句都是可选的，但你在使用 try 语句时必须至少使用一个。
  > 提示： 当错误发生时， JavaScript 会停止执行，并生成一个错误信息。使用 throw 语句 来创建自定义消息(抛出异常)。如果你将 throw 和 try 、 catch一起使用，就可以控制程序输出的错误信息。
  
  ```js
  // promise.js
  // 因为读取多个文件一般都会作为一个异步来处理，这样就不会阻塞程序的运行，把fs封装成一个Promise对象，然后在下面返回数据输出，例子中的TXT文件可以写自己的数据
  const fs = require("fs");
  const read = function(fileName){
      return new Promise((resolve,reject)=>{
          fs.readFile(fileName,(err,data)=>{
              if (err) {
                  reject(err);
              } else{
                  resolve(data);
              }
          });
      });
  };
  read('1.txt').then(res=>{
      console.log(res.toString());
      return read('2.txt');  // 返回新的数据，然后输出
  }).then(res => {
      console.log(res.toString());
      return read('3.txt');
  }).then(res => {
      console.log(res.toString());
  });
  ```
  ```js
  // generator.js
  // 这种方式代码量又高了不少，和Promise方式特别像，只不过是把读取文件的信息放在了外面，在下面依次手动调用，特别麻烦
  const fs = require("fs");
  const read = function(fileName){
      return new Promise((resolve,reject)=>{
          fs.readFile(fileName,(err,data)=>{
              if (err) {
                  reject(err);
              } else{
                  resolve(data);
              }
          });
      });
  };
  function * show(){
      yield read('1.txt');
      yield read('2.txt');
      yield read('3.txt');
  }
  const s = show();
  s.next().value.then(res => {
      console.log(res.toString());
      return s.next().value;
  }).then(res => {
      console.log(res.toString());
      return s.next().value;
  }).then(res => {
      console.log(res.toString());
  });
  ```
  ```js
  // async.js
  // 这个函数和generator函数有些类似，从例子中可以看得出来，async函数在function前面有个async作为标识，意思就是异步函数，里面有个await搭配使用，每到await的地方就是程序需要等待执行后面的程序，语义化很强
  const fs = require("fs");
  const read = function(fileName){
      return new Promise((resolve,reject)=>{
          fs.readFile(fileName,(err,data)=>{
              if (err) {
                  reject(err);
              } else{
                  resolve(data);
              }
          });
      });
  };
  async function readByAsync(){
    let a1;
    let a2;
    let a3;
    try{
        a1 = await read('1.txt');
        a2 = await read('2.txt');
        a3 = await read('3.txt');
    }catch(e){
        //TODO handle the exception
    }
    console.log(a1.toString());
    console.log(a2.toString());
    console.log(a3.toString());
  }
  readByAsync();
  ```