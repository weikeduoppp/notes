# CSS复习

## >>>、/deep/、::v-deep

都是`深度选择器`，可以操作`样式穿透`，用于局部修改UI组件库默认样式

区别是 `>>>` 只作用于 CSS，在 Less/Sass 中无法识别，所以用 deep 代替，在 Vue3.0之前用 `/deep/`，Vue3.0之后用 `::v-deep`

## position

- static 正常文档流 无定位
- relative 正常文档流 相对定位
- absolute 脱离文档流  绝对定位 相对上级有 position 属性且值不为 static 的元素定位，若没有则相对 body 定位
- fixed 脱离文档流 固定定位 相对于浏览器窗口定位
- sticky 根据窗口滚动自动切换 relative 和 fixed，由 top 决定

## 几种隐藏的区别

- visibility: hidden
- `display:none`：隐藏元素，会从页面中删除掉，所以会触发重排和重绘
- `opacity:0`：透明，会继续在文档流中占位，所以触发重绘。由是是作用于元素自身，所以子元素会继承，全部变透明，透明后可以触发点击事件
- `rgba(0,0,0,0)`：透明，会继续在文档流中占位，所以触发重绘。由于只作用于颜色或背景色，所以子元素不会继承，透明后可以触发点击事件

另外 `transition` 过渡不支持 `display:none`，其他三个是支持的

## 什么时候会导致重排

- 添加、删除、更新 DOM 节点
- display: none
- 动画
- 添加或改变字号、宽高等样式
- 用户行为，比如滚动、调整窗口大小

怎么减少重排影响呢？

- 避免使用大量 style 属性，而是用 class(样式集中改变)
- 让动画元素脱离文档流，这样不会影响到其他的布局分层
- 能用 CSS 动画的就不要用 JS 动画
- 尽量不要用 table 布局
- 减少重排范围

## margin 和 padding

margin 和 padding 对行内元素的影响，比如 span，默认设置不了宽高的，但是可以设置 margin 和 padding, 不过设置后 margin 和 padding 都只有水平方向有效果，垂直方向是没有效果的

两个div上下排列，都设置 margin 会怎样？

会发生边距重叠，margin 都大于0就取较大值，一正一负就相加，都负取较大绝对值

为什么会这样？就是由于 BFC

## 说一下 BFC

BFC就是`块级元素格式化上下文`，相当于一个容器，里面的布局不会影响到外面的元素。IFC就是`内联元素格式化上下文`

BFC渲染规则或特性：

- BFC元素垂直方向的边距会发生重叠，由 margin 决定
- BFC的区域不会与浮动元素的区域重叠
- BFC是一个独立的容器，子元素会影响外面元素
- 计算BFC高度的时候，浮动元素也会参与计算

怎么创建BFC或触发BFC：

- html 就是一个 BFC
- float值不为none,也就是说设置了浮动即可
- position的值为absolute或者fixed
- display值为table和flex相关的几个属性
- overflow为auto或hidden

BFC使用场景：

1. **外边距重叠**，如

   - 父子元素都设置了margin-top
   - 兄弟元素margin-bottom和margin-top会重叠
   - 空元素设置了上下margin值不一样

   这三种情况没有BFC的话，margin会重叠取margin较大的那个

2. **左边定宽，右边自适应**，只需要给右边创建BFC即可 

![img](https://images.yewq.top/9296ea4771fc42c8b928de0fabf95451~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

1. BFC可以**阻止浮动元素的覆盖**。父元素没有设置高度，子元素浮动了，不参与父元素高度计算，由于父元素高度为0，导致父元素的兄弟元素向上顶，与子元素重叠，只需给父元素创建BFC即可

## 常见样式兼容问题

- 不同浏览器默认 margin 和 padding 不一样
- **Chrome 默认文字最小12px，可添加 CSS 属性 -webkit-text-size-adjust:none; 解决，或用transform:scale()缩小**
- 超**链接访问过后 hover 和 active 样式就不出现了，解决办法是调整CSS属性顺序lvha：a:link{} a:visited{} a:hover{} a:active{}**
- Chrome 中 visibility 的值为 collapse和hidden是一样的，在Firefox,Opera和IE中，值为collapse和display:none是一样的
- CSS3 属性添加针对不同浏览器的前缀

## :before 和 ::before 的区别

- 单冒号是 `CSS2.1` 引入的，用于伪类，操作文档已有的元素，侧重于丰富选择器的选择能力
- 双冒号是 `CSS3` 引入的，用于伪元素，会创建文档树之外的元素，侧重于表达或定义不在语法定义范围内的抽象元素

## 如何利用标签提升渲染速度

### link标签

通过`rel`属性进行`预加载`，如

```html
<link rel="dns-prefetch" href="//xx.baidu.com">
复制代码
```

rel有几个属性：

- `dns-prefetch`：**浏览器会对href中的域名进行DNS解析并缓存，当再次请求该域名资源时，能省去查询IP的过程，从而减少时间损耗**
- `prefetch`/`preload`：都是预先下载并缓存某个资源，不同的是prefetch可能会在浏览器忙时被忽略，而preload则一定会预先下载
- `preconnect`：正式发送http请求前预先执行DNS解析、TCP握手、TLS协商。通过消除往返延迟来节省时间
- `prerender`：浏览器不仅会加载资源，还会解析执行页面，并进行预渲染

### script标签

由于浏览器底层运行机制，渲染引擎在解析HTML时遇到script标签引用文件是会暂停解析过程的，同时通过网络线程加载文件，文件加载后切换至js引擎执行相应代码，代码执行完成后再切换回渲染引擎继续渲染页面

可是首次渲染可能并不依赖这些js文件，这就延长了页面渲染的时间，所以为了减少这些时间损耗，可以通过script标签三个属性来实现：

- `async`：立即请求文件，但不阻塞渲染引擎，而是文件加载完毕后再阻塞渲染引擎并执行js先
- `defer`：立即请求文件，但不阻塞渲染引擎，等解析完HTML再执行js
- `H5`标准的`type="module"`：让浏览器按照ES6标准将文件当模板解析，默认阻塞效果和defer一样，也可以配合async在请求完成后立即执行

## SEO 和语义化

`SEO`就是搜索引擎优化，利用搜索引擎的搜索规则来提高网站的自然排名，比如对**网站的标题**、**关键字**、**描述**精心设置，比如网站的结构布局设计和网页代码优化

`语义化`就**根据内容结构化选择合适的标签和特有的属性去格式化文档内容**，在没有CSS的情况下也能呈现出很好的内容结构，代码结构，便于开发者阅读和维护，同时也利于SEO

## 水平垂直居中

### 不固定宽高

**posolute + translate**

```css
.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**vertical-align + 伪元素**

```css
.box {
    width: 300px;
    height: 300px;
    text-align: center;
}
.box:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}
...
<div class="box">
    <span class="content">vertical-align + 伪元素</span>
</div>

```

**flex**

**grid**

```css
.grid {
    display: grid;
    height: 300px;
    background-color: aliceblue;
    /* item在这个单元格中的位置justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下） */
    align-items: center;
    justify-items: center;
    /* justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。 */
    justify-content: center;
    align-content: center;
}

...
<div class="grid">
	<div class="content">grid content</div>
</div>
```

**table-cell**

```css
.box {
    width: 300px;
    height: 300px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
...
<div class="table-cell">
    <span class="content">table-cell content</span>
</div>
```

**writing-mode**

```html
.box {
    width: 300px;
    height: 300px;
    writing-mode: vertical-lr;
    text-align: center;
}
.content {
    writing-mode: horizontal-tb;
    display: inline-block;
    width: 100%;
}
...
<div class="box">
    <div class="content">
        <span>这碗又大又圆，这面又长又宽</span>
    </div>
</div>
```

### 总结

不固定宽高: 

- **posolute + translate**
- flex
- grid 
  - justify-content: center; align-content: center;
- vertical-align + 伪元素
  - text-align: center;
  - 子元素 inline-block
  - :after {
        content: '';
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
- table-cell
  -  display: table-cell;
      text-align: center;
      vertical-align: middle;
- **writing-mode**
  - 一层writing-mode: vertical-lr;   text-align: center;
  - 二层writing-mode: horizontal-tb; display: inline-block; width: 100%
  - 三层 display:inline-block;

