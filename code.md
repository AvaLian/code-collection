# 引言

代码片段手机

---

## 目录

-   [百度网址统计](#section_baidu)
-   [让当前的元素滚动到浏览器窗口的可视区域内 scrollIntoView](#section_scrollIntoView)
-   [苹果设备 h5 页面软键盘收回后页面底部留白问题](#section_iphone)
-   [打字机效果](#section_print)

---

### <a name="section_baidu"></a>

### 百度网址统计

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

### <a name="section_scrollIntoView"></a>

### 让当前的元素滚动到浏览器窗口的可视区域内 `Element.scrollIntoView()`

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

### <a name="section_iphone"></a>

### 苹果设备 h5 页面软键盘收回后页面底部留白问题

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

### <a name="section_print"></a>

### 打字机效果

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
