## css实例效果
### CSS3 linear-gradient线性渐变实现虚线等简单实用图形

`border-style:dashed`Chrome和Firefox浏览器下，颜色区的宽高比是3:1，颜色区和透明区的宽度比例是1:1,
![dashed在chrome下虚线的实虚比例](/img/dashed_chrome.png)
IE浏览器下颜色区的宽高比是2:1，颜色区和透明区的宽度比例也是2:1
![dashed在Ie下虚线的实虚比例](/img/dashed_ie.png)
```css
.dashed {
    height: 1px; //设置虚线的高度
    background: linear-gradient(to right, #000000, #000000 5px, transparent 5px, transparent);
    background-size: 15px 100%; // 15px设置实虚线的当前是1：2
}
```
##### linear-gradient自定义虚线边框
![linear-gradient自定义虚线边框](/img/dashed_border.png)
>以上的基本原理是通过两层线性渐变背景去覆盖，第一层是在padding-box容器内（及虚线边框的容器内的白色部分，如果换成border-box那肯定把虚线也覆盖了,content-box质保函内容，不包含padding），用这一层去覆盖repeating-linear-gradient生成的条纹背景。具体的虚线的颜色和间距都可以通过repeating-linear-gradient生成的条纹背景去调整
```css
div {
    padding: 1em;
    border: 18px dashed transparent;
    background: linear-gradient(white,white) padding-box,
    repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em);
}
```
### css实现三角的各种方法


##### linear-gradient线性渐变生成气泡带三角
```css
.talk {
    display: inline-block;
    max-width: 80%;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 6px 10px;
    font-size: 14px;
    background-color: #fff;
    position: relative;
}
.talk::before {
    content: '';
    position: absolute;
    width: 6px; height: 6px;
    background: linear-gradient(to top, #ddd, #ddd) no-repeat, linear-gradient(to right, #ddd, #ddd) no-repeat, linear-gradient(135deg, #fff, #fff 6px, hsla(0,0%,100%,0) 6px) no-repeat;
    background-size: 6px 1px, 1px 6px, 6px 6px;
    transform: rotate(-45deg);
    left: -4px; top: 13px;
}
```
##### border-color实现三角
![border](/img/border.png)
```scss
@mixin triangle($width, $height, $color, $direction) {
  $width: $width/2;
  $color-border-style: $height solid $color;
  $transparent-border-style: $width solid transparent;
  height: 0;
  width: 0;

  @if $direction==up {
    // <!--只有下边框有颜色，其它为透明-->
    border-bottom: $color-border-style;
    border-left: $transparent-border-style;
    border-right: $transparent-border-style;
  }

  @else if $direction==right {
    border-left: $color-border-style;
    border-top: $transparent-border-style;
    border-bottom: $transparent-border-style;
  }

  @else if $direction==down {
    border-top: $color-border-style;
    border-left: $transparent-border-style;
    border-right: $transparent-border-style;
  }

  @else if $direction==left {
    border-right: $color-border-style;
    border-top: $transparent-border-style;
    border-bottom: $transparent-border-style;
  }
}
```
##### CSS3的clip-path属性实现三角
```css
.triangle{
    width: 10px;
    height: 10px;
    background: red;
    /* <!--将坐标（0，0），（5，10），（10，0）连成一个三角形--> */
    clip-path: polygon(0px 0px, 5px 10px, 10px 0px);
    /* <!--旋转180°，变成下三角--> */
    transform: rotate(180deg);
}

```
### css实现各种图形合集
![图形合集](/img/xingzhung.png)
```less
//饼图： conic-gradient(red 0 30%, blue 30% 60%, green 60% 100%);
.pie-gradient {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: conic-gradient(red 0 30%, blue 30% 60%, green 60% 100%);
}
//栅栏：linear-gradient+background-size
.linear-gradient {
    height: 100px;
    background: linear-gradient(90deg, red, red 40px, blue 40px, blue 80px);
    background-size: 80px;
}
// 向上三角
#triangle-up {
  width: 0;
  //设置left\right\bottom三边边框： 左右为宽度一般的透明边框，底部为高度的实色边框
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
// 左上三角
#triangle-topleft {
  width: 0;
  // 设置top\right2边边框：top为高度实色边框，right为宽度透明边框
  border-top: 100px solid red;
  border-right: 100px solid transparent;
}
// 弧形尾箭头
#curvedarrow {
  position: relative;
  width: 0;
  border-top: 90px solid transparent;
  border-right: 90px solid red;
  transform: rotate(10deg) translateX(100%);
}
#curvedarrow:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 30px solid red;
  border-radius: 200px 0 0 0;
  top: -120px; left: -90px;
  width: 120px; height: 120px;
  transform: rotate(45deg);
}
// 梯形
#trapezoid {
  border-bottom: 100px solid red;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  width: 100px;
}
// 等边四边形
#parallelogram {
  width: 150px;
  height: 100px;
  transform: skew(20deg);
  background: red;
}
// 六角星:1个向上的三角形和1个向下的三角形上下相交组合
#star-six {
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  position: relative;
}
#star-six:after {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
  position: absolute;
  content: "";
  top: 30px; left: -50px;
}
// 五角星：梯形+下三角形
#star-five {
  margin: 50px 0;
  position: relative;
  color: red;
  width: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid red;
  border-left: 100px solid transparent;
  transform: rotate(35deg);
}
#star-five:before {
  border-bottom: 80px solid red;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  position: absolute;
  top: -45px; left: -65px;
  content: '';
  transform: rotate(-35deg);
}
#star-five:after {
  position: absolute;
  color: red;
  top: 3px; left: -105px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid red;
  border-left: 100px solid transparent;
  transform: rotate(-70deg);
  content: '';
}
// 多边形-五边形：上三角形+下三角形
#pentagon {
  position: relative;
  width: 54px;
  box-sizing: content-box;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: red transparent;
}
#pentagon:before {
  content: "";
  position: absolute;
  top: -85px; left: -18px;
  border-width: 0 45px 35px;
  border-style: solid;
  border-color: transparent transparent red;
}
// 多边形-六边形：长方形+2三角形
#hexagon {
  width: 100px; height: 55px;
  background: red;
  position: relative;
}
#hexagon:before {
  content: "";
  position: absolute;
  top: -25px; left: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 25px solid red;
}
#hexagon:after {
  content: "";
  position: absolute;
  bottom: -25px; left: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 25px solid red;
}
// 多边形-八边形: 长方形+2梯形
#octagon {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
}
#octagon:before {
  content: "";
  width: 100px;
  position: absolute;
  top: 0; left: 0;
  border-bottom: 29px solid red;
  border-left: 29px solid #fff;
  border-right: 29px solid #fff;
  box-sizing: border-box;
}
#octagon:after {
  content: "";
  width: 100px;
  position: absolute;
  bottom: 0; left: 0;
  border-top: 29px solid red;
  border-left: 29px solid #fff;
  border-right: 29px solid #fff;
  box-sizing: border-box;
} 
// 爱心 : 2个长方形（top圆角) + rotate
#heart {
  position: relative;
  width: 100px; height: 90px;
}
#heart:before,
#heart:after {
  position: absolute;
  content: "";
  left: 50px; top: 0;
  width: 50px; height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
#heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
// 无限：2个正方形（3边圆角+1边无圆角）+ rotate
#infinity {
  position: relative;
  width: 212px; height: 100px;
  box-sizing: content-box;
}
#infinity:before,
#infinity:after {
  content: "";
  box-sizing: content-box;
  position: absolute;
  top: 0; left: 0;
  width: 60px; height: 60px;
  border: 20px solid red;
  border-radius: 50px 50px 0 50px;
  transform: rotate(-45deg);
}
#infinity:after {
  left: auto; right: 0;
  border-radius: 50px 50px 50px 0;
  transform: rotate(45deg);
}
// 菱形方块- 方法1：上三角+下三角；方法2：正方形+rotate
#diamond {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: red;
  position: relative;
  top: -50px;
}
#diamond:after {
  content: '';
  position: absolute;
  left: -50px;
  top: 50px;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-top-color: red;
}
#diamond2 {
  width: 80px;
  height: 80px;
  background: red;
  transform: rotate(45deg);
}
// 菱形盾构：上扁三角+下长三角
#diamond-shield {
  width: 0;
  border: 50px solid transparent;
  border-bottom: 20px solid red;
  position: relative;
  top: -50px;
}
#diamond-shield:after {
  content: '';
  position: absolute;
  left: -50px; top: 20px;
  border: 50px solid transparent;
  border-top: 70px solid red;
}
// 方块菱形-窄：上长三角+下长三角形
#diamond-narrow {
  width: 0;
  border: 50px solid transparent;
  border-bottom: 70px solid red;
  position: relative;
  top: -50px;
}
#diamond-narrow:after {
  content: '';
  position: absolute;
  left: -50px; top: 70px;
  border: 50px solid transparent;
  border-top: 70px solid red;
}
// 切割菱形-钻石般:梯形+下三角
#cut-diamond {
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 0 25px 25px 25px;
  width: 50px;
  box-sizing: content-box;
  position: relative;
  margin: 20px 0 50px 0;
}
#cut-diamond:after {
  content: "";
  position: absolute;
  top: 25px; left: -25px;
  border-style: solid;
  border-color: red transparent transparent transparent;
  border-width: 70px 50px 0 50px;
}
// 鸡蛋形状：border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
#egg {
  display: block;
  width: 126px;
  height: 180px;
  background-color: red;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
// 吃豆人：上+下+左三角形+（四边圆角）
#pacman {
  width: 0px; height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid red;
  border-left: 60px solid red;
  border-bottom: 60px solid red;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}
// 带尖角的说话泡：右三角+圆角矩形
#talkbubble {
  width: 120px; height: 80px;
  background: red;
  position: relative;
  border-radius: 10px;
}
#talkbubble:before {
  content: "";
  position: absolute;
  right: 100%; top: 26px;
  border-top: 13px solid transparent;
  border-right: 26px solid red;
  border-bottom: 13px solid transparent;
}
// 十二星：3正方形+rotate
#burst-12 {
  background: red;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;
}
#burst-12:before,
#burst-12:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
  background: red;
}
#burst-12:before {
  transform: rotate(30deg);
}
#burst-12:after {
  transform: rotate(60deg);
}
// 八角形:2正方形+rotate
#burst-8 {
  background: red;
  width: 80px; height: 80px;
  position: relative;
  text-align: center;
  transform: rotate(20deg);
}
#burst-8:before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  height: 80px; width: 80px;
  background: red;
  transform: rotate(135deg);
}
//阴阳八卦:长方形（上左右窄边框+底部跟高度一样的高边框+圆角）+圆（小圆+大边框：跟底色一致） +圆（小圆+大边框：跟边框色一致）
#yin-yang {
  width: 96px; height: 48px;
  background: #eee;
  border-color: red;
  border-style: solid;
  border-width: 2px 2px 50px 2px;
  border-radius: 100%;
  position: relative;
}
#yin-yang:before {
  content: "";
  position: absolute;
  top: 50%; left: 0;
  background: #fff;
  border: 18px solid red;
  border-radius: 100%;
  width: 12px; height: 12px;
}
#yin-yang:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: red;
  border: 18px solid #eee;
  border-radius: 100%;
  width: 12px;
  height: 12px;
}
//徽章缎带:圆+2斜三角
#badge-ribbon {
  position: relative;
  background: red;
  height: 100px; width: 100px;
  border-radius: 50px;
}
#badge-ribbon::before,
#badge-ribbon::after {
  content: '';
  position: absolute;
  border-bottom: 70px solid red;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  top: 70px; left: -10px;
  transform: rotate(-140deg);
}
#badge-ribbon::after {
  left: auto;
  right: -10px;
  transform: rotate(140deg);
}
// bilibili电视机:2个带扁圆角的长方形border-radius: 50% / 10%;
#tv {
  position: relative;
  width: 200px; height: 150px;
  margin: 20px 0;
  background: red;
  border-radius: 50% / 10%;
  color: white;
  text-align: center;
  text-indent: .1em;
}
#tv:before {
  content: '';
  position: absolute;
  top: 10%; bottom: 10%; right: -5%; left: -5%;
  background: inherit;
  border-radius: 5% / 50%;
}
//V形线条:2个y轴有一定扭曲的长方形transform: skew(0deg, 6deg);
#chevron {
  position: relative;
  text-align: center;
  padding: 12px;
  margin-bottom: 6px;
  height: 60px; width: 200px;
}
#chevron:before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 51%;
  background: red;
  transform: skew(0deg, 6deg);
}
#chevron:after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  height: 100%; width: 50%;
  background: red;
  transform: skew(0deg, -6deg);
}
//放大镜：带边框圆形+ratate长方形
#magnifying-glass {
  font-size: 10em;
  display: inline-block;
  width: 0.4em; height: 0.4em;
  border: 0.1em solid red;
  position: relative;
  border-radius: 0.35em;
}
#magnifying-glass:before {
  content: "";
  display: inline-block;
  position: absolute;
  right: -0.25em; bottom: -0.1em;
  border-width: 0;
  background: red;
  width: 0.35em; height: 0.08em;
  transform: rotate(45deg);
}
//月儿弯弯:正方形设置圆角+无虚化阴影
#moon {
  width: 80px; height: 80px;
  border-radius: 50%;
  box-shadow: 15px 15px 0 0 red;
}
//旗帜:长方形+底部背景色上三角
#flag {
  width: 110px; height: 56px;
  padding-top: 15px;
  position: relative;
  background: red;
}
#flag:after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  border-bottom: 13px solid #fff;
  border-left: 55px solid transparent;
  border-right: 55px solid transparent;
}
//圆锥体:三角形设置大圆角
#cone {
  width: 0; height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 100px solid red;
  border-radius: 50%;
}
//十字架:2个长方形
#cross {
  background: red;
  width: 20px; height: 100px;
  position: relative;
}
#cross:after {
  background: red;
  content: "";
  width: 100px; height: 20px;
  position: absolute;
  left: -40px; top: 40px;
}
//棒球踏板形状:上三角+长方形
#base {
  background: red;
  display: inline-block;
  height: 55px; width: 100px;
  margin-left: 20px;
  margin-top: 55px;
  position: relative; 
}
#base:before {
  border-bottom: 35px solid red;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  content: "";
  left: 0; top: -35px;
  position: absolute;  
}
//长长的指向图形:背景色右三角+长方形+右三角
#pointer {
  width: 200px; height: 40px;
  position: relative;
  background: red;
}
#pointer:after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
#pointer:before {
  content: "";
  position: absolute;
  right: -20px; bottom: 0;
  border-left: 20px solid red;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
// 锁:圆角矩形+上半圆角矩形+圆角长方形
#lock {
  font-size: 8px;
  position: relative;
  width: 18em; height: 13em;
  border-radius: 2em;
  top: 10em;
  box-sizing: border-box;
  border: 3.5em solid red;
  border-right-width: 7.5em;
  border-left-width: 7.5em;
  margin: 0 0 6rem 0;
}
#lock:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: 2.5em solid red;
  width: 14em; height: 12em;
  left: 50%;
  margin-left: -7em; top: -12em;
  border-top-left-radius: 7em;
  border-top-right-radius: 7em;
}
#lock:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: 1em solid red;
  width: 5em; height: 8em;
  border-radius: 2.5em;
  left: 50%; top: -1em;
  margin-left: -2.5em;
}

```
