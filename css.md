]# 引言

CSS 代码总结

---

## 目录

- [基础知识](#基础-css-总结)
    1. [placeholder 输入提示设置](#placeholder-输入提示设置)
    2. [css 单行、多行文本省略号](#css-单行-多行文本省略号)
    3. [图文不可选择](#图文不可选择)
    4. [css -表单验证](#css-表单验证)
- [你不知道的 css](#你未必知道的-49-个-CSS-知识点)
    1. []()
- [ios](#section_ios)

---

## 基础 css 总结

#### placeholder 输入提示设置

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

#### css 单行、多行文本省略号

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

#### 图文不可选择

```css
.not-select {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
```

#### css -表单验证

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

<!-- ### <a name="section_css"></a> -->

## 你未必知道的 49 个 CSS 知识点

1.  【负边距】💘 负边距的效果。注意左右负边距表现并不一致。左为负时，是左移，`右为负时，是左拉`。上下与左右类似
    ![负边距](https://user-gold-cdn.xitu.io/2019/7/30/16c3f20e0bfc9f24?imageslim)
2.  【shape-outside】❤ 文字环绕布局；【clip-path】绘制多边形 不要自以为是了。你以为自己是方的，在别人眼里你却是圆的
    `background-clip:content-box`会填充除了 padding 之外的空间
    `background-color:currentColor`中`currentColor`是指的文本的颜色
    `shape-outside`是不规则形状环绕布局的核心，属性要想生效，本身需要是`浮动 float` 元素。
    `shape-margin`很好理解，就是文字环绕图形时候，距离边界的位置，这个属性很有用。因为在 Shape 布局中，文字环绕有时候是无视 margin 属性的，想要撑开间距，多半还得用 shape-margin 属性。
    `shape-image-threshold`指图像环绕时候的半透明阈值，默认是 0.0，也就是图像透明度为 0 的区域边界才能环绕。同理，如果值是 0.5 表示透明度小于 0.5 的区域都可以文字环绕。

    ````css
    @supports (shape-outside: none) {
    	/* 以后遇到不规则形状布局，要有条件反射般的思维——CSS Shapes布局。CSS Shapes布局兼容性已经相当不错了，移动端可以放心使用。为了避免污染极少部分老旧手机，我们可以这么处理： */
    	shape-outside: none; // _ 关键字值 配合 border-radius实现环绕效果 _
    	shape-outside: margin-box;
    	shape-outside: content-box;
    	shape-outside: border-box;
    	shape-outside: padding-box;

    	shape-outside: circle(); //_ 函数值 配合 clip-path 实现环绕_
    	shape-outside: ellipse();
    	shape-outside: inset(10px 10px 10px 10px);
    	shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);

    	shape-outside: url(image.png); //_ <url>值 配合 -webkit-mask(遮罩使用的图片资源) 实现环绕_

    	shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px); //_ 渐变值  可配合shape-image-threshold 使用 _
    }
    ```

    ![shape-outside](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4d63509b4f0?imageslim)

    ````

3.  【BFC 应用】💓BFC 应用之阻止外边距合并（margin collapsing）（inner 设置了 margin,父层 outer 设置了背景，要想包含 inner 的所有，outer 需设置`overflow:hidden`）
    ![BFC 应用](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f22d3173c9?imageslim)
4.  【BFC 应用】💔BFC 应用之消除浮动的影响
    清除浮动可用`clear: both`和`overflower:hidden`,现在有多了一个方法`display: flow-root;`
    然后兼容低版浏览器问题，解决方法`.wrapper{display: flow-root;} @supports not (display:flow-root) { .wrapper::after { content: ''; display: table; clear:both; } }`

    ```css
    .clearfix:after {
    	/*伪元素是行内元素 正常浏览器清除浮动方法*/
    	content: '';
    	display: block;
    	height: 0;
    	clear: both;
    	visibility: hidden;
    }
    .clearfix {
    	*zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }

    .clearfix:after,
    .clearfix:before {
    	content: '';
    	display: table;
    }
    .clearfix:after {
    	clear: both;
    }
    .clearfix {
    	*zoom: 1;
    }
    ```

![消除浮动](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f22d3173c9?imageslim)

5.  【flex 不为人知的特性之一】💕flex 布局下 margin:auto 的神奇用法
    `margin:auto`可实现平均分布，左右分布等等效果
    ![flex](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f579c4de52?imageslim)
6.  【flex 不为人知的特性之二】💖flex 布局，当 flex-grow 之和小于 1 时，只能按比例分配部分剩余空间，而不是全部
    ![flex](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f642feaa48?imageslim)
7.  【input 的宽度】💗 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值
    ![input](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f6fef0a871?imageslim)
8.  【定位特性】💙 绝对定位和固定定位时，同时设置 left 和 right 等同于隐式地设置宽度
    ![定位](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f7f76af224?imageslim)
9.  【层叠上下文】💚 层叠上下文：小辈就是小辈，再厉害也只是个小辈(z-index 的按同级的去排布)
    ![层叠上下文](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f89327d07d?imageslim)
10. 【粘性定位】💛`position:sticky`，粘性定位要起作用，需要设置最后滞留位置。chrome 有 bug，firefox 完美
    `position:sticky`是`position:relative`和`position:fixed`的结合体——当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed
    position:sticky 有个非常重要的特性，那就是`sticky元素效果完全受制于父级元素们`。
    这和 position:fixed 定位有着根本性的不同，`fixed 元素直抵页面根元素`，其他父元素对其 left/top 定位无法限制。

    -   position:sticky`父级元素不能有任何 overflow:visible 以外的 overflow 设置，否则没有粘滞效果。`因为改变了滚动容器（即使没有出现滚动条）。
    -   父级元素也`不能设置固定的 height 高度值`，否则也没有粘滞效果。
    -   同一个父容器中的 sticky 元素，如果定位值相等，则会重叠；如果属于不同父元素，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。
    -   sticky 定位，不仅可以设置 top，基于滚动容器上边缘定位；还可以设置 bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置 left 和 right 值。
        设置 top 粘滞的元素随着往下滚动，是`先滚动后固定`；而设置 bottom 粘滞的元素则是`先固定，后滚动`

    ![粘性定位](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f943e923f9?imageslim)

11. 【相邻兄弟选择器】💜 相邻兄弟选择器之常用场景
    例如`ul> li+ li`
    ![相邻兄弟选择器](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f9f7e99a80?imageslim)
12. 【模态框】🖤 要使模态框背景透明，用 rgba 是一种简单方式
    模拟弹窗效果可设置`background:rgba(0,0,0,0.5)`实现半透明背景
    ![模态框](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4fb360585bf?imageslim)
13. 【三角形】💝css 绘制三角形的原理
    ![三角形](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4fc3a5fd756?imageslim)
14. 【table 布局】💞display:table 实现多列等高布局
    ![table 布局](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4fd6cc88002?imageslim)
15. 【定宽高比】♥css 实现定宽高比的原理：`padding 的百分比是相对于其包含块的宽度`，而不是高度
    ![定宽高比](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5000087a8d0?imageslim)
16. 【动画方向】🐹 动画方向可以选择 `animation-direction: alternate`，去回交替进行
    ![动画方向](https://user-gold-cdn.xitu.io/2019/7/29/16c3d501284cbcff?imageslim)
17. 【线性渐变应用】🐮css 绘制彩带的原理

    ```css
    /* background: repeating-linear-gradient(90deg, red, red 40px, blue 40px, blue 80px); */
    background: linear-gradient(90deg, red, red 40px, blue 40px, blue 80px);
    background-size: 80px;
    ```

    ![线性渐变应用](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5021ac977bb?imageslim)

18. 【隐藏文本】🐯 隐藏文字内容的两种办法`text-indent:-2000px`或`font-size:0`
    ![隐藏文本](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50308c15117?imageslim)
19. 【居中】🐰 实现居中的一种简单方式:父元素设置`display:flex`,子元素设置`margin:auto`
    ![居中](https://user-gold-cdn.xitu.io/2019/7/29/16c3d503b2a29f31?imageslim)
20. 【角向渐变】🐲 新的渐变：角向渐变。可以用来实现饼图
    `background: conic-gradient(red 0 30%, blue 30% 60%, green 60% 100%);`
    ![角向渐变](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50444a314cc?imageslim)
21. 【背景位置百分比】🐍background-position 百分比的正确理解方式：图片自身的百分比位置与容器同样的百分比位置重合
    ![背景位置百分比](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5051a3e4f1a?imageslim)
22. 【背景重复新值】🐴background-repeat 新属性值：round 和 space。前者表示凑个整，后者表示留点缝
    -   1.容器空间小于图片：`space` 背景图`不会产生缩放`，会被裁切; `round` 缩放背景图至容器大小（`非等比例缩放`）
    -   2.容器空间大于图片:space 在不缩放的前提下尽可能多的重复图片 round 充分利用容器空间，重复 n 次之后（x/y 轴方向）如果剩余空间大于等于 imgWidth\*50%则重复第 n+1 次，否则拉伸已经重复的背景图
        ![背景重复新值](https://user-gold-cdn.xitu.io/2019/7/29/16c3d505c290f434?imageslim)
23. 【背景附着】`background-attachment`指定背景如何附着在容器上，注意其属性值 local 和 fixed 的使用
    `local`:滚动元素背景图滚动,`fixed`:背景图静止，相对于视口固定
    ![背景附着](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50761cdf47c?imageslim)
24. 【动画延时】🐵 动画添加延迟时间`animation-delay`可以使步调不一致
    ![动画延时](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5089051201a?imageslim)
25. 【outline 使用】🐔 可以使用 outline 来描边，不占地方，它甚至可以在里面(`outline-offset`):`outline:10px solid red;outline-offset:-20px;`
    ![outline负值](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5092af1be9f?imageslim)
26. 【背景定位】🐶 当固定背景不随元素滚动时，背景定位是相对于视口的
    ![背景定位](https://user-gold-cdn.xitu.io/2019/7/29/16c3d509e173f40b?imageslim)
27. 【tab-size】🐷 浏览器默认显示 tab 为 8 个空格，tab-size 可以指定空格长度
    ![tab-size](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50ac1d21e4b?imageslim)
28. 【动画暂停】🥝CSS 动画其实是可以暂停的：比如可以在 hover 时候可设置`animation-play-state:paused;`,`running`代表运行，`paused`代表停止
    ![动画暂停](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50bcc76349f?imageslim)
29. 【object-fit】🍓 图片在指定尺寸后，可以设置 `object-fit` 为 `contain` 或 `cover` 保持比例
    可配合`object-position`一起使用，可设置 video、img 等
    ![object-fit](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50c9c447a1a?imageslim)
30. 【鼠标状态】🍒 按钮禁用时，不要忘了设置鼠标状态：`button:disabled{cursor:not-allowed}`
    ![鼠标状态](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50df31971f3?imageslim)
31. 【背景虚化】🍑 使用 CSS 滤镜实现背景虚化`filter:blue(2px)`
    ![背景虚化](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50e8cadbfc4?imageslim)
32. 【fill-available】🍏 设置宽度为 fill-available，可以使 inline-block 像 block 那样填充整个空间
    ![fill-available](https://user-gold-cdn.xitu.io/2019/7/29/16c3d50f694c5878?imageslim)
33. 【fit-content】🍎 设置宽度为 fit-content，可以使 block 像 inline-block 那样实现收缩宽度包裹内容的效果
    ![fit-content](https://user-gold-cdn.xitu.io/2019/7/29/16c3d510015a44fc?imageslim)
34. 【自定义属性】🍋CSS 自定义属性的简单使用

    ```css
    <div style='--color: red' > </div >
    	/* css 自定义属性是区分大小写的*/
    	body {
    	color: var(--color); //
    }
    .btn {
    	border: 2px solid var(--color, black);
    	background: transparent;
    }
    .btn:hover {
    	cursor: pointer;
    	background: var(--color, black);
    	color: white;
    }
    /* variations */
    :root {
    	--color: black; //全局
    }
    .btn.red {
    	--color: red; //局部
    }
    .btn.yellow {
    	--color: yellow;
    }
    ```

    ![自定义属性](https://user-gold-cdn.xitu.io/2019/7/29/16c3d510b10d731e?imageslim)
    [用法](https://www.w3cplus.com/css/everything-you-need-to-know-about-css-variables.html)

35. 【min-content/max-content】🍍 可以设置宽度为 min-content 和 max-content，前者让内容尽可能地收缩，后者让内容尽可能地展开
    ![min-content/max-content](https://user-gold-cdn.xitu.io/2019/7/29/16c3d511d0ea8214?imageslim)
36. 【进度条】🍊 使用渐变，一个 div 实现进度条

    ```css
    // 水波纹效果：(at前是半径，at后是位置，可为circle或ellipse)
    .radial-gradient {
    	width: 200px;
    	height: 100px;
    	background: red;
    	position: relative;
    }
    .radial-gradient:after {
    	content: '';
    	position: absolute;
    	height: 10px;
    	left: 0;
    	right: 0;
    	bottom: -10px;
    	background: radial-gradient(20px 15px ellipse at top, red 10px, transparent 11px);
    	background-size: 20px 10px;
    }
    ```

    `radial-gradient径向渐变`4 个关键字可以指定渐变终止点位置

    -   `closest-side` 渐变中心距离容器最近的边作为终止位置。
    -   `closest-corner` 渐变中心距离容器最近的角作为终止位置。
    -   `farthest-side` 渐变中心距离容器最远的边作为终止位置。
    -   `farthest-corner` 渐变中心距离容器最远的角作为终止位置。
        ![进度条](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51329e83a68?imageslim)

37. 【打印】🍉 可以在打印网页时，设置 page 相关属性。比如 page-break-before 属性来表示是否需要另起新页
    ![打印](https://user-gold-cdn.xitu.io/2019/7/29/16c3d514c5cc6473?imageslim)
38. 【逐帧动画】🍌 利用 CSS 精灵实现逐帧动画:`animation:move 2s steps(10) infinite`,@keyframes move`100%{background-position:-480px 0}`
    ![逐帧动画](https://user-gold-cdn.xitu.io/2019/7/29/16c3d515ef18723a?imageslim)
39. 【resize】🍐 普通元素也可以像 textarea 那样 resize
    ![resize](https://user-gold-cdn.xitu.io/2019/7/29/16c3d516e61e2885?imageslim)
40. 【面包屑】🍇 使用 before 伪元素实现面包屑
    ![面包屑](https://user-gold-cdn.xitu.io/2019/7/29/16c3d517babad7d8?imageslim)
41. 【sticky footer】🍈 使用 grid 布局实现 sticky footer
    ![sticky footer](https://user-gold-cdn.xitu.io/2019/7/29/16c3d518ab2c7e0f?imageslim)
42. 【动画填充状态】🍅CSS 可以设置动画开始前和结束时所保持的状态:`animation-fill-mode:forwards`
    ![动画填充状态](https://user-gold-cdn.xitu.io/2019/7/29/16c3d5195e6bea48?imageslim)
43. 【动画负延迟】🥑CSS 动画可以设置延迟时间为负数，表示动画仿佛开始前就已经运行过了那么长时间
    ![动画负延迟](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51a09f353d9?imageslim)
44. 【过渡】🍆 爱的魔力转圈圈
    ![过渡](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51b12aca6ff?imageslim)
45. 【动画案例】🍬 水波效果原理
    ![动画案例](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51c0ada68da?imageslim)
46. 【动画案例】🌸CSS 弹球动画效果的原理
    ![动画案例](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51d2d34833e?imageslim)
47. 【outline】🌻outline 属性的妙用
    ![outline](https://user-gold-cdn.xitu.io/2019/7/29/16c3d51e76666d72?imageslim)

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

### ios 滚动不流畅问题之 `-webkit-overflow-scrolling:touch` 上下拉动滚动条时卡顿、慢

在移动端上，在你用`overflow-y:scorll`属性的时候，你会发现滚动的效果很木，很慢，这时候可以使用`-webkit-overflow-scrolling:touch`这个属性，让滚动条产生滚动回弹的效果，就像 ios 原生的滚动条一样流畅。

> `-webkit-overflow-scrolling` 属性控制元素在移动设备上是否使用滚动回弹效果.

    `auto`: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
    `touch`: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

```css
body {
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
}
html,
body {
	height: 100%;
}
main {
	height: 100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
```

#### 探究`-webkit-overflow-scrolling:touch`偶尔卡住或不能滑动的 bug

-   如果出现偶尔卡住不动的情况，那么在使用该属性的元素上`不设置定位`或者`手动设置定位为static`
-   如果添加`动态内容`页面不能滚动，让`子元素height+1`

### 长时间按住页面出现闪退

```css
element {
	-webkit-touch-callout: none;
}
```

### iphone 及 ipad 下输入框默认内阴影和圆角

```css
input {
	-webkit-appearance: none;
	border-radius: 0; /*  ios上的下拉框会有圆角 */
	line-height: normal; /*手机上的line-height不能写成和height的值一样，会出现再次输入光标靠上的现象*/
	transform: translateZ(0); /*解决加入js后input框输入瞬间变白的现象*/
}
```

### ios 和 android 下触摸元素时出现半透明灰色遮罩

设置 alpha 值为 0 就可以去除本透明灰色遮罩，备注：transparent 的属性值在 android 下无效。

```css
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
```

### active 兼容处理 即 伪类：active 失效

```html
<!-- 方法一：body添加ontouchstart -->
<body ontouchstart=""></body>
```

```js
// 方法二：js给document绑定touchstart或touchend事件
<style>
a{
    color:#000;
}
a:active{
    color:#fff;
}
</style>
<a href='foo'>bar</a>
<script>
    document.addEventListentener('touchstart',function(){},false);)
</script>
```

### 1px 边框

```css
a::after {
	content: '';
	display: block;
	width: 100%;
	height: 1px;
	background: #333;
	position: absolute;
	left: 0;
	bottom: 0;
	transform: scaleY(0.5);
}
/* Retina屏的1px边框 */
element {
	border-width: thin;
}
```

### 旋转屏幕时，字体大小调整的问题

```css
html,
body,
form,
fieldset,
p,
div,
h1,
h2,
h3,
h4,
h5,
h6 {
	-webkit-text-size-adjust: 100%;
}
```

### transiton 闪屏

```css
/* 设置内联的元素在3D空间如何呈现：保留3D */
-webkit-transform-style: preserve-3D;
/* 设置进行转换的元素的背面在面对用户时是否课件：隐藏 */
-webkit-backface-visibility: hidden;
```

### 圆角 bug

某些 Android 手机圆角失效 `background-clip:padding-box`;

### 页面初始化

```css
html,
body {
	overflow: hidden; /*手机上写overflow-x:hidden;会有兼容性问题，如果子级如果是绝对定位有运动到屏幕外的话ios7系统会出现留白*/
	-webkit-overflow-scrolling: touch; /*流畅滚动,ios7下会有滑一下滑不动的情况，所以需要写上*/
	position: realtive; /*直接子级如果是绝对定位有运动到屏幕外的话，会出现留白*/
}
```

### 给不同屏幕大小的手机设置特殊样式

```css
@media only screen and (min-device-width: 320px) and (max-device-width: 375px) {
}
```

### select 下拉选择设置右对齐

```css
select option {
	direction: rtl;
}
```

### 通过 transform 进行 skew 变形，rotate 旋转会造成出现锯齿现象

```css
-webkit-transform: rotate(-4deg) skew(10deg) translateZ(0);
transform: rotate(-4deg) skew(10deg) translateZ(0);
outline: 1px solid rgba(255, 255, 255, 0);
```

### 字体 font-family

-   天猫：`font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif`;
-   Github：`font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`;
-   CSS-Tricks：`font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol`;
    -   `system-ui`，使用各个支持平台上的默认系统字体
    -   `-apple-system`， 在一些稍低版本 Mac OS X 和 iOS 上，它针对旧版上的 Neue Helvetica 和 Lucida Grande 字体，升级使用更为合适的 San Francisco Fonts
    -   `BlinkMacSystemFont`，针对一些 Mac OS X 上的 Chrome 浏览器，使用系统默认字体
    -   `segoe ui`，在 Windows 及 Windows Phone 上选取系统默认字体
    -   `Roboto`，面向 Android 和一些新版的的 Chrome OS
    -   Helvetica,Arial，在针对不同操作系统不同平台设定采用默认系统字体后，针对一些低版本浏览器的降级方案
    -   sans-serif，兜底方案，保证字体风格统一，至少也得是无衬线字体

```css
```
