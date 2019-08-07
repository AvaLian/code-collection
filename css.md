# 引言

CSS 代码总结

---

## 目录

-   [基础知识](#section_base)
-   [你不知道的 css](#section_css)
-   [ios](#section_ios)

---

### <a name="section_base"></a>

## 基础 css 总结

### placeholder 输入提示设置

```css
:-webkit-input-placeholder {
	/* WebKit browsers */
	font-size: 20px;
	color: red;
}
:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	font-size: 20px;
	color: red;
}
::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	font-size: 20px;
	color: red;
}
:-ms-input-placeholder {
	/* Internet Explorer 10+ */
	font-size: 20px;
	color: red;
}
```

### css 单行、多行文本省略号

```css
.ellipsis {
	width: 200px; /*必须是固定宽度值*/
	overflow: hidden; /*超出部分隐藏*/
	text-overflow: ellipsis; /*超出部分显示省略号*/
	white-space: nowrap; /*规定段落中的文本不进行换行 */
}
.ellipsis-more {
	width: 200px; /*必须是固定宽度值*/
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden; /*超出部分隐藏*/
}
```

注：

1. 将 height 设置为 line-height 的`整数倍`，防止超出的文字露出。
2. 给 `p::after` 添加渐变背景可避免文字只显示一半。
3. 由于 ie6-7 不显示 content 内容，所以要添加标签兼容 ie6-7（如：<span>…<span/>）；兼容 ie8 需要将::after 替换成`:after`。

### 图文不可选择

```css
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

### css -表单验证

`pointer-events`更像是 JavaScript，它能够：阻止用户的点击动作产生任何效果;阻止缺省鼠标指针的显示;阻止 CSS 里的 hover 和 active 状态的变化触发事件;阻止 JavaScript 点击动作触发的事件。

-   `auto`：默认值，表示指针事件已启用；此时元素会响应指针事件，阻止这些事件在其下面的元素上触发。
-   `none`：表示在元素上禁用指针事件；此时该元素将不响应指针事件，但它下面的元素可以响应指针事件，就像元素不存在于它们之上一样。
-   `inherit`：表示该元素将从其父级继承其 pointer-events 值。

```html
<section class="container">
	<input type="text" name="tel" placeholder="请输入手机号码" pattern="^1[3456789]\d{9}$" required /><br />
	<input type="text" name="smscode" placeholder="请输入验证码" pattern="\d{4}" required /><br />
	<button type="submit"></button>
</section>
```

```scss
input {
	// 验证通过时按钮的样式
	&:valid {
		& ~ button {
			pointer-events: all;
			cursor: pointer;

			&::after {
				content: '提交👍';
			}
		}
	}

	// 验证不通过时按钮的样式
	&:invalid {
		& ~ button {
			pointer-events: none; // 去除点击事件，让按钮无法点击

			&::after {
				content: '未通过验证😒';
			}
		}
	}
}
```

---

### <a name="section_css"></a>

## 你未必知道的 49 个 CSS 知识点

1. 【负边距】💘 负边距的效果。注意左右负边距表现并不一致。左为负时，是左移，`右为负时，是左拉`。上下与左右类似
   ![负边距](https://user-gold-cdn.xitu.io/2019/7/30/16c3f20e0bfc9f24?imageslim)
2. 【shape-outside】❤ 不要自以为是了。你以为自己是方的，在别人眼里你却是圆的
   ![shape-outside](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4d63509b4f0?imageslim)

---

### <a name="section_ios"></a>

## ios 下 css 问题总结

### css 隐藏输入框的光标

安卓下处理方法

```css
// 1.隐藏光标
input {
	color: transparent;
}
2.显示文字 input {
	color: transparent;
	text-shadow: 0 0 0 #000;
}
```

ios 下采取的方法是将输入框光标移走

```css
input {
	opacity: 0;
	z-index: 999;
	outline: none;
	border: none;
	color: transparent;
	text-indent: -999em;
	margin-left: -100%;
	width: 200%;
}
```

### ios 滚动不流畅问题之 `-webkit-overflow-scrolling:touch`

在移动端上，在你用`overflow-y:scorll`属性的时候，你会发现滚动的效果很木，很慢，这时候可以使用`-webkit-overflow-scrolling:touch`这个属性，让滚动条产生滚动回弹的效果，就像 ios 原生的滚动条一样流畅。

> `-webkit-overflow-scrolling` 属性控制元素在移动设备上是否使用滚动回弹效果.

    `auto`: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
    `touch`: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

```css
html,
body {
	height: 100%;
}
main {
	padding: 50px 0;
	height: 100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
```

#### 探究`-webkit-overflow-scrolling:touch`偶尔卡住或不能滑动的 bug

-   如果出现偶尔卡住不动的情况，那么在使用该属性的元素上`不设置定位`或者`手动设置定位为static`
-   如果添加`动态内容`页面不能滚动，让`子元素height+1`
