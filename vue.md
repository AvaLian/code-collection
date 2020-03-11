## VUE 知识点总结

本部分主要是笔者在VUE工作开发时遇到的一些问题所做的笔记，如果出现错误，希望大家指出！

### 目录

* [1. vue中mixins的使用方法和注意点](#1-vue中mixins的使用方法和注意点)

#### 1. vue中mixins的使用方法和注意点

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
    
