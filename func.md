## 常用方法总结

本部分主要是笔者在工作开发时遇到的一些问题所做的笔记，如果出现错误，希望大家指出！

---

### 目录

  - [1. Date.parse()和Date.getTime()的区别](#1-Date.parse-和Date.getTime-的区别)
  - [2. window.loaction中的页面调准href、替换replace、刷新reload](#2-window.loaction中的页面调准href+替换replace+刷新reload)

#### 1. Date.parse()和Date.getTime()的区别

  - `Date.parse()`可解析一个日期时间字符串
  - `Date.getTime()`结合一个 Date 对象来使用
  
  ```js  
  var time1 = Date.parse('2018/07/11');
  var time2 = new Date('2018/07/11').getTime();
  var time3 = Date.parse(new Date());
  var time4 = new Date().getTime();
  var time1 = Date.parse('2018/07/11');
  ```

#### 2. window.loaction中的页面调准href+替换replace+刷新reload

  - `window.location.href=“url”：` 改变url地址； 
  - `window.location.replace(“url”)：` 将地址替换成新url，该方法通过指定URL替换当前缓存在历史里（客户端）的项目，
    因此当使用replace方法之后，你不能通过“前进”和“后 退”来访问已经被替换的URL(无历史纪录)，这个特点对于做一些过渡页面非常有用！
  - `window.location.reload()：` 强制刷新页面，从服务器重新请求！
    - 相对于点击刷新按钮: 如果把该方法的参数设置为 **true**，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。