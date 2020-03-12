## 常用方法总结

本部分主要是笔者在工作开发时遇到的一些问题所做的笔记，如果出现错误，希望大家指出！

---

## 目录

  - [1. Date.parse和Date.getTime的区别](#1-dateparse和dategettime的区别)
  - [2. window.loaction中的页面调准href和替换replace和刷新reload](#2-windowloaction中的页面调准href和替换replace和刷新reload)
  - [3. 倒计时](#3-倒计时)
  - [4. 微信授权获取code](#4-微信授权获取code)

---

### 1. Date.parse()和Date.getTime()的区别

  - `Date.parse()`可解析一个日期时间字符串
  - `Date.getTime()`结合一个 Date 对象来使用
  
  ```js  
  var time1 = Date.parse('2018/07/11');
  var time2 = new Date('2018/07/11').getTime();
  var time3 = Date.parse(new Date());
  var time4 = new Date().getTime();
  var time1 = Date.parse('2018/07/11');
  ```

### 2. window.loaction中的页面调准href和替换replace和刷新reload

  - `window.location.href="url"：` 改变url地址； 
  - `window.location.replace("url")：` 将地址替换成新url，该方法通过指定URL替换当前缓存在历史里（客户端）的项目，
    因此当使用replace方法之后，你不能通过"前进"和"后 退"来访问已经被替换的URL(无历史纪录)，这个特点对于做一些过渡页面非常有用！
  - `window.location.reload()：` 强制刷新页面，从服务器重新请求！
    - 相对于点击刷新按钮: 如果把该方法的参数设置为 **true**，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。

### 3. 倒计时
  ```js
  export default {
    data () {
      return {
        state: {
          time: 60,
          smsSendBtn: false,
        }
      },
      methods:{
        countdown(){
          let that = this;
          this.state.smsSendBtn = true;
          let interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 60;
              that.state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }
      }
    }
  }
  ```

### 4. 微信授权获取code

```html
<template>
    <div class="icontent">
      <template v-if="token">
        <div>登录成功！</div>
      </template>
      <template>
        <div>登录中...</div>
      </template>
    </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/store'
  import { getOpenid } from '@/api/login'
  import axios from 'axios'

  export default {
    name: "getcode",
    data () {
        return {
            code: '',
            token: ''
        }
    },
    methods: {
      // 请求openid的方法，需要后端写法
      getopenid_data(data) {
        getOpenid(data).then(response => {
            // 获取token
            const data = response.data
            this.token = data.token
            localStorage.setItem('token',this.token)
            store.state.token = this.token
        })
      },
      getUrlParam (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let url = window.location.href.split('#')[0]
        let search = url.split('?')[1]
        if (search) {
            var r = search.substr(0).match(reg)
            if (r !== null) return unescape(r[2])
            return null
        } else {
            return null
        }
      }
    },
    created: function() {
      var code = this.getUrlParam('code')
      let appid = "wx61dbff19a640ddfd";
      // let redirectUrl = encodeURIComponent(window.location.href) // 获取页面url
      let redirectUrl = encodeURIComponent(window.location.href.split('#')[0]) //获取#之前的当前路径
      if (code == null || code == '') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      } else {
        this.code = code
        var data = {
          code: this.code
        }
        this.getopenid_data(data)
      }
    }
  }
</script>
```
```js
// 请求微信服务器获取code 方法
function getUserCode() {
  let appid = "wx61dbff19a640ddfd";
  // let redirectUrl = encodeURIComponent(window.location.href) // 获取页面url
  let redirectUrl = encodeURIComponent(window.location.href.split('#')[0]) //获取#之前的当前路径
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
// 路由变化时
router.beforeEach((to, from, next) => {
    let code = () => {
        // 获取暂存的code信息
        return window.sessionStorage.getItem("weCode")
    }
    
    if(!code){
        if (to.path !== '/author') {
            // // 暂存进入链接，以便获取code后返回
            // window.localStorage.setItem('authUrl', to.fullPath)
            //保存当前路由地址，授权后还会跳到此地址
            sessionStorage.setItem('wxRedirectUrl', to.fullPath)
            next("/author")
            return false
        }
    }
    
    next()

  // // 方法二

  //   //读取sessionStorage的user
  //   let user = JSON.parse(sessionStorage.getItem('user'));
  //    // 已登录
  //   if (user) {
  //     next();//释放路由 如果已经登录
  //   }
  //   if (!user) {
  //     const code = getUrlParam('code');//获取url 上面的code
  //     // 还未完成微信授权
  //     if (!code) {//假如没code
  //         getUserCode();//请求微信服务器获取code
  //     }
  //     // 已完成微信授权 假如已经获取到了code
  //     if (code) {
  //           //使用code 去登录
  //         axios.get("/xxxx", {//
  //             params: {
  //               code: code,
  //             }
  //         }).then(res => {
  //             if (res.status == 200) {
  //               let userInfo = res.data.userInfo;
  //               sessionStorage.setItem('user', JSON.stringify(userInfo));// 存sessionStorage<br>　　　　　　　　　　　　　　　　　　　　 next();
  //             } else {
                  
  //             }
  //         }).catch(err => {
  //             //登录失败，请刷新重试
  //         });
  //     }
  // }else{
  //   next();
  // }
})
```
author.vue
```html
<template>
  <div>
授权中。。。
  </div>
</template>
 
<script>
  
  import {
   getWxAuth
  } from '@/service/getData'
  import {
   GetQueryString 
  } from '@/utils/mixin';
  export default {
   data() {
     return {
      token: '',
     };
   },
   created() {
     this.token = window.localStorage.getItem("user_token");
     //判断当前的url有没有token参数,如果不存在那就跳转到微信授权的url
     //就是前面说的ReturnGetCodeUrl方法
  
     if (!GetQueryString("token")) {
      this.getUserCode();
     } else {
      // ......
      //判断一下后台返回的状态码msg，因为可能出现微信拿不到token的情况
      let msg = GetQueryString("msg")
      if (msg = 200) {
        this.token = GetQueryString("token");
        //存储token到本地
        window.localStorage.setItem("user_token", this.token);
        
        //获取beforeLoginUrl，我们的前端页面
        let redirectUrl = sessionStorage.getItem('wxRedirectUrl')
        this.$router.replace(redirectUrl)
 
        // let url = window.localStorage.getItem("authUrl");
        // //跳转
        // this.$router.push(url);
        // //删除本地beforeLoginUrl
        // removeLocalStorage("authUrl");
      }else{
      //msg不是200的情况，可能跳到404的错误页面
      }
     }
   }
  }
</script>
```
