# 引言

代码片段手机

---

# 目录
<!-- TOC -->

- [userful代码片段](#userful代码片段)
  - [0.1. 百度网址统计](#01-百度网址统计)
  - [0.2. 让当前的元素滚动到浏览器窗口的可视区域内 `Element.scrollIntoView()`](#02-让当前的元素滚动到浏览器窗口的可视区域内-elementscrollintoview)
  - [0.3. 苹果设备 h5 页面软键盘收回后页面底部留白问题](#03-苹果设备-h5-页面软键盘收回后页面底部留白问题)
  - [0.4. 打字机效果](#04-打字机效果)
- [项目中有用代码片段](#项目中有用代码片段)
  - [0.5. 定时轮询拉取数据](#05-定时轮询拉取数据)
  - [0.6. axios 拦截器与取消 pending 状态请求](#06-axios-拦截器与取消-pending-状态请求)
  - [0.7. Vue使用axios,终止多次请求方式,防抖](#07-vue使用axios终止多次请求方式防抖)
  - [0.8. vue刷新当前页面](#08-vue刷新当前页面)
  - [vue项目在当前页面做无线跳转，前进和后退都刷新页面数据](#vue项目在当前页面做无线跳转前进和后退都刷新页面数据)
  - [关于Element-ui中el-Upload上传图片不及时刷新的问题](#关于element-ui中el-upload上传图片不及时刷新的问题)

<!-- /TOC -->

---

## userful代码片段
### 0.1. 百度网址统计

网站统计是指通过专业的网站统计分析系统（或软件），对网站访问信息的记录并归类，以及在此基础上的统计分析，如网站访问量的增长趋势图、用户访问最高的时段、访问最多的网页、停留时间、用户使用的搜索引擎，主要关键词、来路、入口、浏览深度、所用语言、所用浏览器种类、时段访问量统计分析、日段访问量统计分析以及周月访问量统计分析等网站访问数据的基础分析。

```js
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?ad6b5732c36321f2dafed737ac2da92f";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

---

### 0.2. 让当前的元素滚动到浏览器窗口的可视区域内 `Element.scrollIntoView()`

```css
/*  凡是需要滚动的地方都加一句scroll-behavior:smooth就好了！ */
html,
body {
	scroll-behavior: smooth;
}
```

而 `Element.scrollIntoViewIfNeeded()`方法也是用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。但`如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动`。此方法是标准的 Element.scrollIntoView()方法的专有变体。
因而再有什么回到顶部、去到置顶位置和键盘弹出挡住输入框之类的需求，都可以简单解决了。

scrollIntoView 只接受一个参数，但接受两种类型的参数，分别是 Boolean 型参数和 Object 型参数。
如果为 true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。若为 false，元素的底端将和其所在滚动区的可视区域的底端对齐。

之后是 Object 型参数，这个对象有两个选项，也就是对象里面的 key。block 与之前的 Boolean 型参数一致，不过值不再是 true 和 false，是更语义化的 start 和 end。
另一个选项是 behavior,MDN 上给出三个可取的值，分别是 auto、instant 与 smooth。这个选项决定页面是如何滚动的，实测 auto 与 instant 都是瞬间跳到相应的位置，而 smooth 就是有动画的过程。

`scrollIntoViewIfNeeded`是比较懒散的，如果元素在可视区域，那么调用它的时候，页面是不会发生滚动的。其次是 scrollIntoViewIfNeeded 只有 Boolean 型参数，也就是说，都是瞬间滚动，没有动画的可能了

当红色的 div 完全在可视区域的情况下，调用 scrollIntoView()是会发生滚动，而调用 scrollIntoViewIfNeeded()则不会。而我实践后发现了一些文档没有的细节。当元素处于可视区域，但不是全部可见的情况下，调用 scrollIntoViewIfNeeded()时，无论参数是 true 还是 false，都会发生滚动，而且效果是滚动到元素与可视区域顶部或底部对齐，视乎元素离哪端更近。这个大家需要注意一下~

```html
<body>
	<div class="chunk"></div>
	<div class="btn-top">up</div>
	<div class="btn-bottom">down</div>
	<div class="scrollIntoViewIfNeeded-top">scrollIntoViewIfNeeded top</div>
	<div class="scrollIntoViewIfNeeded-bottom">scrollIntoViewIfNeeded botom</div>
	<script>
		const up = document.querySelector('.btn-top');
		const down = document.querySelector('.btn-bottom');

		const scrollIntoViewIfNeededTop = document.querySelector('.scrollIntoViewIfNeeded-top');
		const scrollIntoViewIfNeededBottom = document.querySelector('.scrollIntoViewIfNeeded-bottom');

		const test = document.querySelector('.chunk');
		up.addEventListener('click', function() {
			test.scrollIntoView(true);
			// test.scrollIntoView({
			// 	block: 'start',
			// 	behavior: 'smooth',
			// })
		});
		down.addEventListener('click', function() {
			test.scrollIntoView(false);
			// test.scrollIntoView({
			// 	block: 'end',
			// 	behavior: 'smooth',
			// })
		});
		scrollIntoViewIfNeededTop.addEventListener('click', function() {
			test.scrollIntoViewIfNeeded(true);
		});
		scrollIntoViewIfNeededBottom.addEventListener('click', function() {
			test.scrollIntoViewIfNeeded(false);
		});
	</script>
</body>
```

---


### 0.3. 苹果设备 h5 页面软键盘收回后页面底部留白问题

```js
// 这里监听键盘收起，然后滚动顶部
document.body.addEventListener('focusout', () => {
	// 软键盘收起的事件处理
	let ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0) {
		// 键盘收齐页面空白问题
		document.body.scrollTop = document.body.scrollHeight;
	}
});
```

```js
// 1、如果使用jquery，修改起来就比较方便
$('input, textarea, select').on('blur', function() {
	window.scroll(0, 0)
})
//2、	如果使用vue，要修改的地方不是很多的话，直接用vue的v-on添加blur事件即可，以input为例
<input type="text" @blur="fixScroll" placeholder="请输入xxx"/>
//methods中添加：
fixScroll() {
    window.scrolll(0, 0);
}
// 如果修改的地方比较多，建议使用addEventListener循环添加事件，在组件销毁记得remove就好，以input为例
mounted() {
    var a = document.getElementsByTagName('input'); 
    for (let i = 0; i < a.length; i++) {    
        a[i].addEventListener('blur', this.fixScroll); 
    } 
},
destroyed() { ...移除mounted中添加的事件...｝
methods: {
    fixScroll() {    
        window.scrolll(0, 0);   
    }   
}
// 3、因为这个问题只出现在ios端，所以可以在添加事件前判断是不是在ios系统上运行
var m = navigator.userAgent;
var isAndroid = m.indexOf('Android') > -1 || m.indexOf('Adr') > -1;   //android终端
var isIos = !!m.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);                  //ios终端       
if (isIos) {
//为input、textarea、select添加blur事件
}
```

---


### 0.4. 打字机效果

```js
function text(list) {
	var arr = [];
	for (var i = 0; i < list.length; i++) {
		var nowArr = list[i].split('');
		arr = arr.concat(nowArr);
		arr.push('<br/>');
	}
	$('#midMoon .text').append('<p></p>');
	var index = 0;
	var obj = setInterval(function() {
		if (index < arr.length) {
			$('#midMoon .text p').html($('#midMoon .text p').html() + arr[index]);
		}
		index++;
	}, 100);
}
text(['又是一年中秋到,', '合家团聚乐陶陶,', '公牛HR祝您阖家欢乐！']);
```

## 项目中有用代码片段
### 0.5. 定时轮询拉取数据
```js
setInterval(function(){}, milliseconds)——会不停的调用函数
setTimeout(function(){}, milliseconds)——只执行函数一次
//setInterval会符合我们的业务需求，然而也需要注意一些坑，单纯的使用setInterval会导致页面卡死！其原因与JS引擎线程有关，用通俗话说就是setInterval不会清除定时器队列，每重复执行1次都会导致定时器叠加，最终卡死你的网页。但是setTimeout是自带清除定时器的，因此正确解决方法如下：
window.setInterval(() => {
  setTimeout(fun, 0)
}, 30000)
```

```js
// setTimeout能阻止某些重复性操作
// 如果我们能捕获到异常，可以限定异常大于10次时，我们将不再拉取数据，并且在异常 》1 且 《10 时，我们可以适当将间隔拉大，让服务器有休息的时间。
var failed = 0; 

(function loopsiloop( interval ){
   interval = interval || 5000; // default polling to 1 second

   setTimeout(function(){
       $.ajax({
           url: 'foo.htm',
           success: function( response ){
               // do something with the response

               loopsiloop(); // recurse
           },
           error: function(){

               // only recurse while there's less than 10 failed requests.
               // otherwise the server might be down or is experiencing issues.
               if( ++failed < 10 ){

                   // give the server some breathing room by
                   // increasing the interval
                   interval = interval + 1000;
                   loopsiloop( interval );
               }
           }
       });
   }, interval);
})();
```

### 0.6. axios 拦截器与取消 pending 状态请求
```js
/**
 * axios 拦截器配置
 */

import axios from 'axios'
import { Notification } from 'element-ui'
import router from '../router/index.js'

// 跳转到登录页面
const gotoLoginPage = function () {
  // 使用 setTimeout 是为了让 Notification 提示显示出来再跳转
  setTimeout(() => {
    router.replace(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
  }, 1000)
}

axios.defaults.timeout = 5000 // 默认的超时时间
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证

/**
 * 正在进行（pending 状态）的请求记录
 */
// 记录所有正在进行（pending 状态）的请求的 "唯一值" 和 "取消请求方法"
const allPendingRequestsRecord = []
/**
 * 通过请求的 url 和 method 来标示请求唯一值
 * @param {*} config 配置信息
 * @returns
 */
function getUniqueId (config) {
  return `url=${config.url}&method=${config.method}`
}
/**
 * 取消请求，并移除记录
 * @param {*} config 配置信息
 */
function removePendingRequestRecord (config) {
  allPendingRequestsRecord.some((item, index) => {
    if (item.id === getUniqueId(config)) {
      // console.log('-- cancel id:', item.id)
      item.cancel() // 取消请求
      allPendingRequestsRecord.splice(index, 1) // 移除记录
      return true
    }
  })
  // console.log('-- allPendingRequestsRecord:', allPendingRequestsRecord.length, JSON.stringify(allPendingRequestsRecord))
}
/**
 * 取消所有请求并移除所有记录
 *
 * 页面切换时，取消所有请求并移除所有记录 useAge:
 *    import {removeAllPendingRequestsRecord} from './helper/axios';
 *    router.beforeEach((to, from, next) => {
 *      removeAllPendingRequestsRecord();
 *    }
 */
export function removeAllPendingRequestsRecord () {
  allPendingRequestsRecord.forEach((item) => {
    item.cancel('page changes') // 取消请求
  })
  allPendingRequestsRecord.splice(0) // 移除所有记录
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // 在 get 请求上带上时间戳
    if (config.method === 'get') {
      config.url = config.url + '?' + new Date().getTime()
    }

    // 通过添加随机 uniqueCancel 值，确保每个请求具有唯一标示
    config.url = `${config.url}?uniqueCancel_${Math.random().toString(36).substr(2)}`

    // 在请求发送前执行一下取消操作，防止重复发送请求（dashboard 类似页面具有重复多次的相同请求，所有不能在全局做防止重复）
    // removePendingRequestRecord(config)

    // 设置请求的 cancelToken
    config.cancelToken = new axios.CancelToken(function executor (cancel) {
      // 添加记录，记录请求的唯一值和取消方法
      allPendingRequestsRecord.push({ id: getUniqueId(config), cancel })
    })
    // console.log('-- request config:', config)

    return config
  },
  error => {
    // 对请求错误做些什么
    Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // 对响应数据做点什么

    // 307 表示 session 过期，需要重新登录
    if (res.status === 200 && res.data.code === 307) {
      removeAllPendingRequestsRecord()
      Notification.info({
        title: '消息',
        message: '登录失效，请重新登录'
      })

      // 移除菜单和权限信息
      localStorage.removeItem('menus')
      localStorage.removeItem('buttons')
      sessionStorage.removeItem('isLoadNodes')
      // window.location.href = (res.data.content && res.data.content.loginPath) || '/enmoLogin'
      gotoLoginPage()

      return Promise.reject(res)
    }

    // 请求成功后移除记录
    removePendingRequestRecord(res.config)

    if (!res.data) {
      return Promise.reject(res)
    }

    return res
  },
  error => {
    // 对响应错误做点什么

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误信息：' + '请求参数错误'
          break
        case 401:
          // 401 说明登录验证失败，需要重新验证
          error.message = '未登录'
          removeAllPendingRequestsRecord()
          gotoLoginPage()

          break
        case 402:
          error.message = '错误信息：您还没有该路径的访问权限'
          break
        case 404:
          error.message = '错误信息：请求地址出错'
          break
        case 500:
          error.message = 'message：' + error.response.data.message + '，exception：' + error.response.data.exception
          break
        case 502:
          error.message = '错误信息：网关错误'
          break
        case 504:
          error.message = '错误信息：网关超时'
          break
        default:
      }

      Notification({
        title: '错误码:' + error.response.status,
        dangerouslyUseHTMLString: true,
        message: error.message,
        type: 'error'
      })
    }

    // 请求失败，移除记录
    removePendingRequestRecord(error.response.config)

    return Promise.reject(error)
  }
)

// Plugin 包装
const axiosPlugin = {
  install (Vue) {
    Vue.prototype.$http = axios
    Vue.prototype.$base = '/commonApi'
    Vue.prototype.$mock = '/mockApi'
  }
}

export default axiosPlugin

// 测试 Plugin 包装:
//   this.$http.get(`${ this.$base }/dbaasDbManage/instance`, {params: {
//     pageSize: 15,
//     pageNum: 1,
//     queryFiled: ''
//   }}).then(function(res){
//     console.log('-- res.data field:', res.data);
//   },function(res){
//     console.log('-- res.status field:', res.status);
//   });

// 测试 Mock 接口:
// this.$http.get(`${this.$mock}/dbaas/getMockInfo`).then(function (res) {
//   console.log('-- res.data field:', res.data)
// }, function (res) {
//   console.log('-- res.status field:', res.status)
// })
```
### 0.7. Vue使用axios,终止多次请求方式,防抖
```js
// 在项目中经常有一些场景会连续发送多个请求，而异步会导致最后得到的结果不是我们想要的，并且对性能也有非常大的影响。例如一个搜索框，每输入一个字符都要发送一次请求，但输入过快的时候其实前面的请求并没有必要真的发送出去，这时候就需要在发送新请求的时候直接取消上一次请求。
request(keyword) {
	var CancelToken = axios.CancelToken
	var source = CancelToken.source()
	// 取消上一次请求
	this.cancelRequest();
	axios.post(url, {kw:keyword), {
			cancelToken: new axios.CancelToken(function(c) {
					that.source = c;
			})
	}).then((res)=> {
		// 在这里处理得到的数据
		...
	}).catch((err) =>{
		if (axios.isCancel(err)) {
				console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
		} else {
				//handle error
				console.log(err);
		}
	})
},
cancelRequest(){
		if(typeof this.source ==='function'){
				this.source('终止请求')
		}
}
```

### 0.8. vue刷新当前页面
1. 使用`window.location.href window.location.replace() window.location.reload()`会出现空白，体验不是很好
2. 使用 `provide / inject`
简单的来说就是在父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量。
```html
<!-- app.vue -->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
```
```html
<!-- 需要跳转的页面： 前面会有这个 inject -->
<template>
    <button @click="refresh"></button>
</template>
<script>
    export default{
        name: 'refresh',
        inject: ['reload'],
        methods: {
              refresh () {
                // 后面想刷新当前页面的地方这样写：
                  this.reload()
              }
        }
    }
</script>
```

###  vue项目在当前页面做无线跳转，前进和后退都刷新页面数据

若有需求如下，有1个不定层级的列表，如果有子元素，则点击父级跳转到其下面的子元素，父子都在同一个页面去渲染，需保证渲染不同层级的时候根据向后台请求到的数据刷新页面，回退上一步（其实还是当前页面）也能刷新上一层级的数据

```html
<template>
  <div id="app">
    <!-- :key="this.$route.path" -->
    <router-view v-if="isRouterAlive"  />
  </div>
</template>
<script>
  export default {
    name: 'App',
    // provide(){
    //   return{
    //     reload:this.reload
    //   }
    // },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    watch:{
      $route(to,from){
        console.log('into app watch',to,from)
        // 同一页面跳转的时候，前进后退强制刷新
        if(to.path === from.path){
          console.log('same page 跳转')
          this.reload()
        }
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },
    },

  }
</script>
```

### 关于Element-ui中el-Upload上传图片不及时刷新的问题

**用`this.$forceUpdate`**来强制重新渲染
```html
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
<script>
  ...
handleAvatarSuccess(res, file) {

  // 强制重新渲染
  this.$forceUpdate()
  
  this.imageUrl = URL.createObjectURL(file.raw);
},
</script>
```




