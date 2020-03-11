## 1. 引言

兼容问题总结

---

## 1.1. 目录

<!-- TOC -->

- [1. 引言](#1)
- [1.1. 目录](#11)
	- [1.1.1. <a name="section_base"></a>](#111-a-namesection-base-a)
- [1.2. 移动端兼容问题总结](#12)
	- [1.2.1. `viewport-fit=cover`](#121-viewport-fitcover)
	- [1.2.2. format-detection](#122-format-detection)
	- [1.2.3. html5 调用安卓或者 ios 的拨号功能](#123-html5--ios)
	- [1.2.4. 启动画面](#124)
	- [1.2.5. 桌面图标](#125)
	- [1.2.6. 移动端点透问题](#126)

<!-- /TOC -->

-   [基础](#section_base)

---

### 1.1.1. <a name="section_base"></a>

## 1.2. 移动端兼容问题总结

### 1.2.1. `viewport-fit=cover`

iphoneX 的“刘海”为相机和其他组件留出了空间，同时在底部也留有可操作区域。那么网站边尴尬了~被限制在了这样的“安全区域”内，两边会出现一道白条。
解决的方案是：

1. 给 body 添加一个 background；
2. 添加 viewport-fit=cover meta 标签，使页面占满整个屏幕。

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```

### 1.2.2. format-detection

-   禁用自动识别页面中的电话号码 `<meta name="format-detection"content="telephone=no">`

### 1.2.3. html5 调用安卓或者 ios 的拨号功能

```js
<a href="tel:4008106999,1034">400-810-6999 转 1034</a>
<a href="tel:15677776767">点击拨打15677776767</a>
```

### 1.2.4. 启动画面

```html
<link rel="apple-touch-startup-image" href="start.png" />
<!--iPhone-->
<link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image" />
<!-- iPhone Retina -->
<link
	href="apple-touch-startup-image-640x920.png"
	media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)"
	rel="apple-touch-startup-image"
/>
```

### 1.2.5. 桌面图标

```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png" />
<!-- 上面的写法可能大家会觉得会有默认光泽，下面这种设置方法可以去掉光泽效果，还原设计图的效果！ -->
<link rel="apple-touch-icon-precomposed" href="touch-icon-iphone.png" />
```

### 1.2.6. 移动端点透问题

```html
<div id="haorooms">点头事件测试</div>
<a href="www.jb51.net">www.jb51.net</a>
<!-- div是绝对定位的蒙层,并且z-index高于a:击蒙层时 div事件时，发现a链接被触发，这就是所谓的点透事件 -->
$("#haorooms").on("touchend", function (event) { event.preventDefault(); });
```
