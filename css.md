### css 隐藏输入框的光标

```css
// 1.隐藏光标
input {
	color: transparent;
}
2.显示文字 <style > input {
	color: transparent;
	text-shadow: 0 0 0 #000;
}
</style>
// ios下采取的方法是将输入框光标移走
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
