# CSS 实现div的全屏自适应显示

### 方法一 ：
```
#map{
	height:100%;
	width:100%;
	position:absolute;
	top:0;
	bottom:0;
	backgroung-color:red;
	z-index:0;
	overflow:hidden;
}
```
重点是top和bottom一起使用，可以强制定义盒模型的区域。
还会出现滚动条，所以把溢出设为hidden

### 方法二：
```
html,body{
	padding:0;
	margin:0;
	height:100%;
	overflow:hidden;
}
#map{
	height:100%;
	z-index:0;
	background-color:red;
}

```