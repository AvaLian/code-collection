<!-- TOC -->

- [1. vue cli框架中`vue.config.js`中引入全局less变量](#1-vue-cli框架中vueconfigjs中引入全局less变量)
- [2. vue中微信授权](#2-vue中微信授权)
  - [2.1. 本地微信授权](#21-本地微信授权)

<!-- /TOC -->

## 1. vue cli框架中`vue.config.js`中引入全局less变量

```js
// vue.config.js
module.exports = {
  ...
  outputDir: process.env.VUE_OUTPUT_DIR, // 生成文件的目录名称
  css: {
    loaderOptions: {
      less: {
        // 全局引入变量和 mixin
        globalVars: {
          hack: `true; @import '~@/assets/less/variable.less';@import '~@/assets/less/mixin.less';`,
        },
      },
    },
  }
}
```
```css
/* variable.less */
@color_theme: #ffcd32;
/* mixin.less */
.no-wrap(){
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```
引入后，在less文件中和vue文件中可以直接引用variable中的变量or mixin中的公共方法
```css
/* 在其他less文件中引用 */
.test{
    color:@color_theme;
    .no-wrap()
}
```
```html 
<!-- 在vue文件中引用  -->
<style lang="less">
.t1{
    color:@color_theme;
    .no-wrap()
}
</style>
```

## 2. vue中微信授权

### 2.1. 本地微信授权

1. 把auth.html放到服务器上，不用非得是根目录，如`https://probd.bullbigdata.com/wxpp/auth.html`
2. 授权时候判断环境是本地时，redirect_ur为`https://probd.bullbigdata.com/wxpp/auth.html?backUrl=${window.location.href}`

```js
// 公众号授权
export function wxLogin(appid, url, scope = "snsapi_base", state = "STATUS") {
  let redirect_uri = encodeURIComponent(url || window.location.href);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
}
// 企业微信授权
export function wxQYLogin(appid,AgentId,url,scope = "snsapi_base",state = "STATUS") {
  console.log("into wxQYLogin");
  let redirect_uri = encodeURIComponent(url || window.location.href);
  console.log("redirect_uri", redirect_uri);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&agentid=${AgentId}&state=${state}#wechat_redirect`;
}
if (process.env.NODE_ENV === "development") {
    // 本地企业微信授权
    let localAuthUrl = `https://probd.bullbigdata.com/wxpp/auth.html?backUrl=${window.location.href}`;
    console.log("development", localAuthUrl);
    wxQYLogin(wx_appid, wx_agentid, localAuthUrl);
} else {
    // 线上企业微信网页授权
    wxQYLogin(wx_appid, wx_agentid);
}
```