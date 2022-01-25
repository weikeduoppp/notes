### 版本1.15.3

[学习文档](https://www.liwenzhou.com/posts/Go/go_menu/)

## 安装

[地址](https://golang.org/)

## 初始

> 创建环境

```go
go mod init main.go
```



main.go

```go
package main

import "fmt"

// 函数外只能放置(变量/常量/函数/类型)的声明
var a string
// 非法
// fmt.Println(a)

// 入口函数
func main() {
	message := "213"
	fmt.Println(message)
}
	
```

执行

```go
go run main.go
```

格式化

```go
go fmt	
```

查看变量

```go
go env
```



# 基础



## 规则

```go
package main

import "fmt"

// 单行注释

/*
多行注释
*/

// Go语言函数外的语句必须以关键字开头
var name = "娜扎"
var age int

// age = 18

const (
	Num = 100
)

// main函数是入口函数
// 它没有参数也没有返回值
func main() {
	// 函数内部定义的变量必须使用
	// var isOK = true
	// fmt.Println(isOK)
	
}

```





## var+const+float+bool+fmt



```go
package main

// go fmt 格式化
import (
	"fmt"
	"math"
)

//  Go语言中标识符由字母数字和_(下划线）组成，并且只能以字母和_开头。 举几个例子：abc, _, _123, a123。

// 函数外只能放置(变量/常量/函数/类型)的声明
var a string

// 批量声明  需要事先声明 驼峰命名方式
var (
	number int
	isNum  bool
)

func foo() (int, bool) {
	return 9, true
}

// 非全局变量声明了需要使用
func _var() {
	number = 1
	isNum = true
	// noGobal := 2  // no use
	var name string = "san"
	message := "213"            // :=只能函数内部使用  -- 短变量声明
	fmt.Print(number)           // 打印
	fmt.Printf("name:%v", name) // %v占位符.
	fmt.Println(message)        // Println打印完加换行符

	// _ -> 匿名变量. 需要忽略某变量
	x, _ := foo()
	fmt.Println(x)
}

// 常量
const pi = 3.14

// 多个常量
const (
	SUCCESS = 200
	FAIL    = 400
)

// 省略了值则表示和上面一行的值相同 n1 = n2 = n3 = 100
const (
	p1 = 100
	p2
	p3
	p4
)

// iota: 常量计数器
// iota在const关键字出现时将被重置为0。
// ** const中每新增一行常量声明将使iota计数一次(iota可理解为const语句块中的行索引)。**
// 使用iota能简化定义，在定义枚举时很有用。

const (
	n1 = iota //0
	n2        //1
	n3        //2
	n4        //3
)

// 几个常见的iota示例:
// 使用_跳过某些值
const (
	a1 = iota // 0
	_         // 1
	a2 = iota // 2
	a3 = iota // 3
)

// iota声明中间插队
const (
	b1 = iota // 0
	b2 = 100
	b3 = iota // 2
	b4        // 3
)

// 定义数量级
const (
	_  = iota
	KB = 1 << (10 * iota) // 1024 (2^10)
	MB = 1 << (10 * iota) // 1024 * 1024 ( 2^20 )
	GB = 1 << (10 * iota)
	TB = 1 << (10 * iota)
	PB = 1 << (10 * iota)
)

func _const() {
	fmt.Println("n1: ", n1)
	fmt.Println("n2: ", n2)
	fmt.Println("n3: ", n3)
	fmt.Println("n4: ", n4)
	fmt.Println("b1: ", b1)
	fmt.Println("b2: ", b2)
	fmt.Println("b3: ", b3)
	fmt.Println("b4: ", b4)
}

// 浮点数 float32 float64
func _floatAndComplex() {
	fmt.Println(math.MaxFloat32)
	f1 := 1.223
	fmt.Printf("%T\n", f1) // Go默认float64.
	f2 := float32(1.214)
	fmt.Printf("%T\n", f2) // 显示声明

	var c1 complex64
	c1 = 1 + 2i
	var c2 complex128
	c2 = 2 + 3i
	fmt.Println(c1)
	fmt.Println(c2)
}

func _bool() {
	// bool默认false.  数值不能强制转换布尔型.  不参与数值运算
	var b1 bool // false
	b2 := true
	fmt.Printf("%T\n", b2) // bool
	fmt.Println(b1)
	fmt.Println(b2)
}

// fmt占位符
func _fmt() {
	n := 100
	fmt.Printf("%T\n", n) // 查看类型
	fmt.Printf("%v\n", n) // 查看值
	fmt.Printf("%b\n", n) // 查看二进制
	fmt.Printf("%d\n", n) // 查看十进制
	fmt.Printf("%o\n", n) // 查看八进制
	fmt.Printf("%x\n", n) // 查看十六进制

	s := "hello"
	fmt.Printf("%s\n", s)  // 查看字符串
	fmt.Printf("%#v\n", s) // 加# 多双引号 查看值
}

// 入口函数
func main() {
	fmt.Println("变量:")
	_var()
	fmt.Println()
	fmt.Println("常量:")
	_const()
	fmt.Println()
	fmt.Println("浮点数:")
	_floatAndComplex()
	fmt.Println()
	fmt.Println("布尔值:")
	_bool()
	fmt.Println()
	fmt.Println("fmt:")
	_fmt()
}

```

>  fmt.Sprintf("%v", T) 数字转字符串 

## string+byte+rune



```go
package main

// go fmt 格式化
import (
	"fmt"
	"strings"
)

//  Go语言中标识符由字母数字和_(下划线）组成，并且只能以字母和_开头。 举几个例子：abc, _, _123, a123。

// 函数外只能放置(变量/常量/函数/类型)的声明
var a string

func _string() {
	a = "123"
	b := "456"
	c := "str := \"c:\\Code\\lesson1\\go.exe\""
	fmt.Printf("变量:%v\n", a)
	// 转义符
	// \r	回车符（返回行首）
	// \n	换行符（直接跳到下一行的同列位置）
	// \t	制表符
	// \'	单引号
	// \"	双引号
	// \\	反斜杠
	fmt.Println("str := \"c:\\Code\\lesson1\\go.exe\"")
	fmt.Println(`
	123
	12
	`) // 多行

	// 	len(str)	求长度
	// +或fmt.Sprintf	拼接字符串
	// strings.Split	分割
	// strings.Contains	判断是否包含
	// strings.HasPrefix,strings.HasSuffix	前缀/后缀判断
	// strings.Index(),strings.LastIndex()	子串出现的位置
	// strings.Join(a[]string, sep string)	join操作
	fmt.Println(len(a))
	fmt.Println(fmt.Sprintf("%s213%s", a, b))
	ret := strings.Split(c, "\\")
	fmt.Printf("%T\n", ret)
	fmt.Println(ret)
	fmt.Println(strings.Contains(c, "\\"))
	fmt.Println(strings.HasPrefix(c, "str"))
	fmt.Println(strings.Index(c, "str"))
	fmt.Println(strings.Join(ret, "+"))
}

func _btye() {
	// 字符用单引号（’）包裹起来，如：a := '中'
	// 	uint8类型，或者叫 byte 型，代表了ASCII码的一个字符。
	// rune类型，代表一个 UTF-8字符。
	// 当需要处理中文、日文或者其他复合字符时，则需要用到rune类型。rune类型实际是一个int32
	d := '中'
	fmt.Println(d)

}

// Go 使用了特殊的 rune 类型来处理 Unicode，让基于 Unicode 的文本处理更为方便，也可以使用 byte 型进行默认字符串处理，性能和扩展性都有照顾。
// 遍历字符串
func traversalString() {
	s := "hello沙河사샤"
	for i := 0; i < len(s); i++ { //byte
		fmt.Printf("%v(%c) ", s[i], s[i]) // %c:字符
	}
	fmt.Println()
	for _, r := range s { //rune
		fmt.Printf("(%c) ", r)
		fmt.Println(r)
	}
	fmt.Println()
}

// 修字符串
func changeString() {
	// 要修改字符串，需要先将其转换成[]rune或[]byte，完成后再转换为string。无论哪种转换，都会重新分配内存，并复制字节数组。
	d := "abczAZ??"
	f := d + "汉字的数量"
	rune32 := []rune(f)
	fmt.Println(f)
	fmt.Printf("%T\n", f)
	fmt.Println(rune32)
	fmt.Printf("%T\n%c\n", rune32, rune32)
	var length int = 0
	for _, r := range rune32 {
		fmt.Printf("%c %v\n", r, r)
		if r > 122  {
			length = length + 1
		}
	}
	fmt.Println(length)
}

// 入口函数
func main() {
	fmt.Println("字符串:")
	_string()
	fmt.Println()
	fmt.Println()
	fmt.Println("字符:")
	_btye()
	traversalString()
	changeString()
}

```

## 整型

整型分为以下两个大类： 按长度分为：int8、int16、int32、int64 对应的无符号整型：uint8、uint16、uint32、uint64

其中，`uint8`就是我们熟知的`byte`型，`int16`对应C语言中的`short`型，`int64`对应C语言中的`long`型。

|  类型  |                             描述                             |
| :----: | :----------------------------------------------------------: |
| uint8  |                  无符号 8位整型 (0 到 255)                   |
| uint16 |                 无符号 16位整型 (0 到 65535)                 |
| uint32 |              无符号 32位整型 (0 到 4294967295)               |
| uint64 |         无符号 64位整型 (0 到 18446744073709551615)          |
|  int8  |                 有符号 8位整型 (-128 到 127)                 |
| int16  |              有符号 16位整型 (-32768 到 32767)               |
| int32  |         有符号 32位整型 (-2147483648 到 2147483647)          |
| int64  | 有符号 64位整型 (-9223372036854775808 到 9223372036854775807) |

### 特殊整型

|  类型   |                          描述                          |
| :-----: | :----------------------------------------------------: |
|  uint   | 32位操作系统上就是`uint32`，64位操作系统上就是`uint64` |
|   int   |  32位操作系统上就是`int32`，64位操作系统上就是`int64`  |
| uintptr |              无符号整型，用于存放一个指针              |

**注意：** 在使用`int`和 `uint`类型时，不能假定它是32位或64位的整型，而是考虑`int`和`uint`可能在不同平台上的差异。

**注意事项** 获取对象的长度的内建`len()`函数返回的长度可以根据不同平台的字节长度进行变化。实际使用中，切片或 map 的元素数量等都可以用`int`来表示。在涉及到二进制传输、读写文件的结构描述时，为了保持文件的结构不会受到不同编译目标平台字节长度的影响，不要使用`int`和 `uint`。

### 数字字面量语法（Number literals syntax）

Go1.13版本之后引入了数字字面量语法，这样便于开发者以二进制、八进制或十六进制浮点数的格式定义数字，例如：

`v := 0b00101101`， 代表二进制的 101101，相当于十进制的 45。 `v := 0o377`，代表八进制的 377，相当于十进制的 255。 `v := 0x1p-2`，代表十六进制的 1 除以 2²，也就是 0.25。

而且还允许我们用 `_` 来分隔数字，比如说： `v := 123_456` 表示 v 的值等于 123456。

我们可以借助fmt函数来将一个整数以不同进制形式展示。

```go
package main
 
import "fmt"
 
func main(){
	// 十进制
	var a int = 10
	fmt.Printf("%d \n", a)  // 10
	fmt.Printf("%b \n", a)  // 1010  占位符%b表示二进制
 
	// 八进制  以0开头
	var b int = 077
	fmt.Printf("%o \n", b)  // 77
 
	// 十六进制  以0x开头
	var c int = 0xff
	fmt.Printf("%x \n", c)  // ff
	fmt.Printf("%X \n", c)  // FF
}
```

## if+for



```go
package main

// go fmt 格式化
import (
	"fmt"
)


func _if() {
	// 作用域 age 单独声明再 if{}
	if age := 19; age > 18 {
		fmt.Println("大于18")
	} else {
		fmt.Println("否则")
	}
	// fmt.Println(age) // err
}
func _for() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	// 2
	a := 5
	for ; a < 10; a++ {
		fmt.Println(a)
	}

	// 3
	b := 5
	for b < 10 {
		fmt.Println(b)
		b++
	}
}
func _forrange() {
	str := "hello傻字"
	for i,r := range str {
		fmt.Printf("%v %c\n", i, r)
	}
}

func _ninenine() {
	for i := 1; i < 10; i++ {
		for j := 1; j < i+1; j++ {
			fmt.Printf("%v✖️%v=%v ",i,j,i*j)
		}
		fmt.Println()
	}
}


// 入口函数
func main() {
	fmt.Println("if流程控制:")
	_if()
	fmt.Println()
	fmt.Println()
	fmt.Println("for循环:")
	_for()
	fmt.Println()
	fmt.Println()
	fmt.Println("forrange:")
	_forrange()
	fmt.Println()
	fmt.Println("九九法:")
	_ninenine()
}

```

## for+switch+goto



```go
package main

// go fmt 格式化
import (
	"fmt"
)

func _for() {
	// 当i=5时就跳出for循环
	for i := 0; i < 10; i++ {
		if i == 5 {
			break // 跳出for循环
		}
		fmt.Println(i)
	}
	fmt.Println("over")

	// 当i=5时，跳过此次for循环（不执行for循环内部的打印语句），继续下一次循环
	for i := 0; i < 10; i++ {
		if i == 5 {
			continue // 继续下一次循环
		}
		fmt.Println(i)
	}
	fmt.Println("over")
}

func _goto() {
	// 跳出多层for循环
	var flag = false
	for i := 0; i < 10; i++ {
		// 单引号: 字符
		for j := 'A'; j < 'Z'; j++ {
			if j == 'C' {
				flag = true
				break // 跳出内层的for循环
			}
			fmt.Printf("%v-%c\n", i, j)
		}
		if flag {
			break // 跳出for循环（外层的for循环）
		}
	}

	// goto+label实现跳出多层for循环
	for i := 0; i < 10; i++ {
		for j := 'A'; j < 'Z'; j++ {
			if j == 'C' {
				goto A // 跳到我指定的那个标签
			}
			fmt.Printf("%v-%c\n", i, j)
		}
	}
A: // label标签
	fmt.Println("over")
}

func _switch() {
	a := 2
	switch {
	case a == 1:
		fmt.Println("1")
	default:
		fmt.Println("0")
	}

	// 多个判断
	switch a {
	case 1, 5, 3, 7:
		fmt.Println("奇数")
	case 2, 4, 6, 8:
		fmt.Println("偶数")
	}
	// 内部声明
	switch n := 3; n {
	case 1, 5, 3, 7:
		fmt.Println("奇数")
	case 2, 4, 6, 8:
		fmt.Println("偶数")
	}
}

func _op() {
	var (
		a uint8 = 2
		b uint8 = 5
	)
	// 关系运算符
	fmt.Println(a == b) // Go语言是强类型，相同类型的变量才能比较
	fmt.Println(a != b) // 不等于

	// 位运算:针对的是二进制数
	// 5的二进制表示：101
	// 2的二进制表示： 10

	// &:按位与 (两位均为1才为1)
	fmt.Println(5 & 2) // 000
	// |:按位或（两位有1个为1就为1）
	fmt.Println(5 | 2) // 111
	// ^:按位异或（两位不一样则为1）
	fmt.Println(5 ^ 2) // 111
	// <<:将二进制位左移指定位数
	fmt.Println(5 << 1)  // 1010 => 10
	fmt.Println(1 << 10) // 10000000000 => 1024
	// >>:将二进制位右移指定的位数
	fmt.Println(5 >> 2)  // 1 =>1
	var m = int8(1)      // 只能存8位 -> 127
	fmt.Println(m << 10) // 10000000000

	var x int
	x = 10
	x++    // x = x + 1
	x--    // x = x - 1
	x *= 2 // x = x * 2
	x /= 2 // x = x / 2
	x %= 2 // x = x % 2

	x <<= 2 // x = x << 2
	x &= 2  // x = x & 2
	x |= 3  // x = x | 3   ->  1 1 -> 3
	x ^= 4  // x = x ^ 4	 ->1 0 0 -> 1 1 1 ->  7
	x >>= 2 // x = x >> 2  -> 1

	fmt.Println(x)
}

// 入口函数
func main() {
	fmt.Println("break continue:")
	_for()
	fmt.Println()
	fmt.Println()
	fmt.Println("goto:")
	_goto()
	fmt.Println()
	fmt.Println("switch:")
	_switch()
	fmt.Println()
	fmt.Println("运算符:")
	_op()
}

```

## 复合数据类型-数组





```go
package main

// go fmt 格式化
import (
	"fmt"
)

func _array() {
	// 声明必须指定长度 类型
	// 数组的长度必须是常量，并且长度是数组类型的一部分。一旦定义，长度不能变。 [5]int和[10]int是不同的类型。
	var (
		a [3]uint
		b [4]uint
	)
	// a = b // 不同类型
	fmt.Println(a, b)

	// 初始化 (布尔值默认 false | uint, int, float: 0 | string: "")
	a1 := [2]int{1, 2}
	fmt.Println(a1)

	a2 := [...]string{"123", "213"} // 自动推断长度
	fmt.Println(a2)
	fmt.Println(len(a2))

	a3 := [3]string{0: "上海", 2: "深圳"} // 索引初始化.
	fmt.Println(a3)
	fmt.Println(a3[1] == "") // ""

	// 索引遍历
	for i := 0; i < len(a2); i++ {
		fmt.Println(a2[i])
	}

	// range遍历
	for i, v := range a3 {
		fmt.Println(i, v)
	}

	// 多维数组  多维数组只有第一层可以使用...来让编译器推导数组长度
	// [[1,2,3],[2,3], [4,5]]
	a4 := [...][2]int{[2]int{2, 3}, [2]int{1, 3}}
	fmt.Printf("%T %v\n", a4, a4)
}

// 数组是值类型，赋值和传参会复制整个数组。因此改变副本的值，不会改变本身的值。
func modifyArray(x [3]int) {
	x[0] = 100
	fmt.Println(x)
}

func modifyArray2(x [3][2]int) {
	x[2][0] = 100
	fmt.Println(x)
}

func _find() {
	a := [5]int{1, 3, 5, 7, 8}
	for i, j := range a {
		for l, k := range a[i+1:] {
			if j+k == 8 {
				fmt.Printf("(%d, %d)  ", i, l+i+1)
			}
		}
	}
}

func test() {
	a := [...]uint{2, 1, 3, 5, 4, 4, 7, 8, 7}
	// 找出和为8的两个下标
	for i := 0; i < len(a); i++ {
		for j := i + 1; j < len(a); j++ {
			if a[i]+a[j] == 8 {
				fmt.Printf("(%v,%v)", i, j)
			}
		}
	}


// 入口函数
func main() {

	fmt.Println()
	fmt.Println("数组:")
	_array()
	a := [3]int{10, 20, 30}
	modifyArray(a) //在modify中修改的是a的副本x
	fmt.Println(a) //[10 20 30]
	b := [3][2]int{
		{1, 1},
		{1, 1},
		{1, 1},
	}
	modifyArray2(b) //在modify中修改的是b的副本x
	fmt.Println(b)  //[[1 1] [1 1] [1 1]]
	test()
	// _find()
}

```

## 切片slice+ make()+append()+copy()

make + append(自动扩容, 上一次的两倍)

![image-20201125171612831](http://images.yewq.top/uPic/image-20201125171612831.png)

![image-20201125171736029](http://images.yewq.top/uPic/image-20201125171736029.png)

```go
package main

// go fmt 格式化
import (
	"fmt"
	"sort"
)

func _slice() {
	// !! 切片是引用类型  []T
	// var s1 []int
	var s2 []string
	// 初始化(底层数组)  自动扩容 容量: cap()
	s1 := []int{12, 3}
	fmt.Println(s1)
	fmt.Println(s2 == nil) // nil 空
	fmt.Println(cap(s1))   // 容量

	// 由数组得到切片
	a := [5]int{1, 3, 5, 7, 8}
	s3 := a[0:3]                                                    // [1, 3, 5]  [x:n]: 从x(不填为0)下标开始取到n(不包括n, 不填取到尾部)下标为止的切片 [0,3}
	fmt.Printf("%v  %T, 长度: %v 容量: %v\n", s3, s3, len(s3), cap(s3)) // 底层是从数组切出来的. 容量从开始下标开始算到尾部
	// 切片再切片
	s4 := s3[:1]
	fmt.Printf("%v , 容量: %v\n", s4, cap(s4))

	// 证明切片是引用类型 指向底层数组 修改的是底层数组
	a[1] = 1000
	fmt.Println(s3, s4)
	s3[0] = 22
	fmt.Println(s3, s4, a)

}

func _make() {
	// 使用make()函数创建切片 make([]T, size, cap)
	a1 := make([]int, 3, 5)
	fmt.Printf("%v  %T, 长度: %v 容量: %v\n", a1, a1, len(a1), cap(a1))
	// 证明切片长度为0. 要用len(T) == 0来判断.不是 T == nil
	// var s1 []int         //len(s1)=0;cap(s1)=0;s1==nil
	// s2 := []int{}        //len(s2)=0;cap(s2)=0;s2!=nil
	// s3 := make([]int, 0) //len(s3)=0;cap(s3)=0;s3!=nil
}

func _append() {
	// Go语言的内建函数append()可以为切片动态添加元素。 可以一次添加一个元素，可以添加多个元素，也可以添加另一个切片中的元素（x,T…）。
	var s []int
	s = append(s, 1)
	s = append(s, 2, 3)
	s2 := []int{4, 5, 6}
	s = append(s, s2...)
	fmt.Println(s)
	// 每次扩容后都是扩容前的2倍
	// $GOROOT/src/runtime/slice.go源码
	/*
		- 首先判断，如果新申请容量（cap）大于2倍的旧容量（old.cap），最终容量（newcap）就是新申请的容量（cap）。
		- 否则判断，如果旧切片的长度小于1024，则最终容量(newcap)就是旧容量(old.cap)的两倍，即（newcap=doublecap），
		- 否则判断，如果旧切片长度大于等于1024，则最终容量（newcap）从旧容量（old.cap）开始循环增加原来的1/4，即（newcap=old.cap,for {newcap += newcap/4}）直到最终容量（newcap）大于等于新申请的容量(cap)，即（newcap >= cap）
		- 如果最终容量（cap）计算值溢出，则最终容量（cap）就是新申请容量（cap）。
	*/
}

func _copy() {
	// copy(destSlice, srcSlice []T) copy()函数可以迅速地将一个切片的数据复制到另外一个切片空间中
	a := []int{1, 2, 3}
	b := make([]int, 3, 3)
	copy(b, a)
	fmt.Println(b)
	b[0] = 111
	fmt.Println(a)
	fmt.Println(b)
}

// 通过append从切片中删除元素
func _delete(index int) {
	// 从切片中删除元素
	a := []int{30, 31, 32, 33, 34, 35, 36, 37}
	// 要删除索引为2的元素
	a = append(a[:index], a[index+1:]...)
	fmt.Println(a) //[30 31 33 34 35 36 37]
}

func _test() {
	var a = make([]string, 5, 10)
	fmt.Println(a)
	for i := 0; i < 10; i++ {
		a = append(a, fmt.Sprintf("%v", i))
	}
	fmt.Println(a)
}
func _test2() {
	var a = make([]int, 5, 10)
	for i := 10; i > 0; i-- {
		a = append(a, i)
	}
	fmt.Println(a)
	sort.Ints(a)
	fmt.Println(a)

}

// fmt.Sprintf("%v", T) 数字转字符串

// 入口函数
func main() {

	fmt.Println()
	fmt.Println("slice:")
	_slice()
	fmt.Println("make:")
	_make()
	fmt.Println("append:")
	_append()
	fmt.Println("copy:")
	_copy()
	fmt.Println("delete:")
	_delete(0)
	fmt.Println("test:")
	_test()
	fmt.Println("test2:")
	_test2()
}

```

**切片的本质**

切片就是一个框，框住了一块连续的内存。

切片属于引用类型，真正的数据都是保存在底层数组里的。

## map

```go
package main

// go fmt 格式化
import (
	"fmt"
	"math/rand"
	"sort"
	"strings"
	"time"
)

func _map() {
	// var _nil map[string][int] // 未初始化 == nil
	// map[KeyType]ValueType
	a := map[string]string{
		"key":  "value",
		"key2": "valu2e",
	}
	fmt.Println(a["key"])
	// 如果key存在ok为true,v为对应的值；不存在ok为false,v为值类型的零值
	v, ok := a["key3"]
	fmt.Println(v, ok, a["key3"] == "") // 字符串的零值: ""
	if !ok {
		fmt.Println("key3不存在")
	}
	// make(map[KeyType]ValueType, [cap]) 一般事先估算容量.避免运行期间再动态扩容
	b := make(map[string]string, 10)
	b["a"] = "b"
	b["a2"] = "b2"
	b["a3"] = "b2"

	for k, v := range b {
		fmt.Println("键值: ", k, "值: ", v)
	}

	// delete(map, key)内置删除函数
	delete(b, "a")
	fmt.Println(b)
}

// 按照指定顺序遍历map
func _sort() {
	rand.Seed(time.Now().UnixNano()) //初始化随机数种子

	var scoreMap = make(map[string]int, 200)

	for i := 0; i < 100; i++ {
		key := fmt.Sprintf("stu%02d", i) //生成stu开头的字符串
		value := rand.Intn(100)          //生成0~99的随机整数
		scoreMap[key] = value
	}
	//取出map中的所有key存入切片keys
	var keys = make([]string, 0, 200)
	for key := range scoreMap {
		keys = append(keys, key)
	}
	//对切片进行排序
	sort.Strings(keys)
	//按照排序后的key遍历map
	for _, key := range keys {
		fmt.Println(key, scoreMap[key])
	}
}

func makeMapslice() {
	// 元素类型为map类型的切片
	s1 := make([]map[int]int, 10, 10)
	s1[0] = make(map[int]int, 2) // 需要初始化
	s1[0][0] = 111
	fmt.Println(s1[0])

	// 值为切片的map
	s2 := map[string][]int{
		"key": {1, 3},
	}
	fmt.Println(s2)
}

// find字符出现次数
func findCodeFrequency() {
	str := "how do you do"
	arr := strings.Split(str, " ")
	m := make(map[string]int, 10)
	for _, v := range arr {
		if _, ok := m[v]; !ok {
			m[v] = 1
		} else {
			m[v]++
		}
	}
	for k, v := range m {
		fmt.Println(k, v)
	}
}

// 回文判断
func palindromeJudgment() {
	str := "32去232"
	arr := strings.Split(str, "")
	fmt.Println(arr, len(arr))
	for i := 0; i < len(arr)/2; i++ {
		if arr[i] != arr[len(arr)-1-i] {
			fmt.Println("不是回文")
			break
		}
	}
}

func watch() {
	// 切片是引用类型
	type Map map[string][]int
	m := make(Map)
	s := []int{1, 2}
	s = append(s, 3)
	fmt.Printf("%+v\n", s) // [1,2,3]
	m["q1mi"] = s          // 切片
	fmt.Printf("%+v\n", m["q1mi"])
	s = append(s[:2], s[3:]...)
	fmt.Printf("%+v\n", s)
	fmt.Printf("%+v\n", m["q1mi"])
}

// 入口函数
func main() {

	fmt.Println()
	fmt.Println("map:")
	_map()
	fmt.Println("sort:")
	_sort()
	fmt.Println("makeMapslice:")
	makeMapslice()
	fmt.Println()
	fmt.Println("watch:")
	watch()
	fmt.Println()
	fmt.Println("findCodeFrequency:")
	findCodeFrequency()
	fmt.Println()
	fmt.Println("palindromeJudgment:")
	palindromeJudgment()
}

```



## 函数

```go
package main

// go fmt 格式化
import (
	"fmt"
	"strings"
)

func sum(x int, y int) (ret int) {
	ret = x + y
	return // 有命名return后可省略ret
}

func multiple() (x int, y int) { // 可多个返回值
	return 1, 3
}

// 多个相同类型可以省略. 只写最后
func multipleParams(x, y, z int) { // 可多个返回值
}

// 可选可变长
func optional(y ...int) {
	fmt.Println(y) // 切片slice  type: []int
}

func someFunc(x string) []int {
	if x == "" {
		return nil // 没必要返回[]int{}
	}
	return nil
}

// 传参都是拷贝(副本).
func _func() {
	fmt.Println(sum(1, 2))
	x, y := multiple()
	fmt.Println(x, y)
	optional()
	optional(1, 2, 3)
}

// 作用域: 全局. 函数内部. 语句块(if, for).

var num int = 1

// defer语句会将其后面跟随的语句进行延迟处理。在defer归属的函数即将返回时，将延迟处理的语句按defer定义的逆序进行执行
// defer执行时机: 在Go语言的函数中return语句在底层并不是原子操作，它分为给返回值赋值和RET指令两步。而defer语句执行的时机就在返回值赋值操作后，RET指令执行前
// defer注册要延迟执行的函数时该函数所有的参数都需要确定其值
func _defer() {
	defer func() {
		num++
	}()
	defer fmt.Println(111)
	defer fmt.Println(222) // 多个defer 后进先出

	// 用于 资源清理、文件关闭、解锁及记录时间 , websocket

	// defer 经典案例
	fmt.Println(f1())
	fmt.Println(f2())
	fmt.Println(f3())
	fmt.Println(f4())
	fmt.Println(f5())
}

func f1() int {
	x := 5
	defer func() {
		x++
	}()
	return x // ret = 5
}

func f2() (x int) {
	defer func() {
		x++
	}()
	return 5 // ret = x = 5  x++  return 6
}

func f3() (y int) {
	x := 5
	defer func() {
		x++
	}()
	return x // ret = y = x = 5
}
func f4() (x int) {
	defer func(x int) {
		x++
	}(x)
	return 5 // x = 5 函数传参是副本 不影响ret
}
func f5() (x int) {
	defer func(x *int) {
		(*x)++
	}(&x)
	return 5 // x = 5 函数传参是x内存地址 修改是x内存地址的值, ret=x=6
}

// 声明函数类型
type calculation func() int

func _funcType() {
	var c calculation
	c = f1
	fmt.Printf("%T\n", c)
	b := f1
	fmt.Printf("%T\n", b)
}

// 1.参数是函数 2.定义匿名函数
func f6(x func() int) func() int {
	// 函数内部不能声明带名字的函数
	var f1 = func(i int) int { return i } // 匿名函数
	f1(2)
	return x
}

//  闭包指的是一个函数和与其相关的引用环境组合而成的实体
func adder(x int) func(int) int {
	// 在生命周期内 变量x也一直有效
	return func(y int) int {
		x += y
		fmt.Println(x)
		return x
	}
}

// test func1(func2) // eg: 实现把需要传递两个参数的函数包装成不需要传递参数的函数
func func1(f func()) {
	fmt.Println("func1")
	f()
}
func func2(x, y int) {
	fmt.Println(x, y)
}

func func3(f func(int, int), x, y int) func() {
	return func() {
		f(x, y)
	}
}

/*
	你有50枚金币，需要分配给以下几个人：Matthew,Sarah,Augustus,Heidi,Emilie,Peter,Giana,Adriano,Aaron,Elizabeth。
	分配规则如下：
	a. 名字中每包含1个'e'或'E'分1枚金币
	b. 名字中每包含1个'i'或'I'分2枚金币
	c. 名字中每包含1个'o'或'O'分3枚金币
	d: 名字中每包含1个'u'或'U'分4枚金币
	写一个程序，计算每个用户分到多少金币，以及最后剩余多少金币？
	程序结构如下，请实现 ‘dispatchCoin’ 函数
*/
func _test() {
	var (
		coins = 50
		users = []string{
			"Matthew", "Sarah", "Augustus", "Heidi", "Emilie", "Peter", "Giana", "Adriano", "Aaron", "Elizabeth",
		}
		distribution = make(map[string]int, len(users))
	)
	/*
		1.先切割每个名字. 掌握每个字母包含几个
		2. 依次判断分配金币. 统计分配出去的金币
		3. 得出剩余
	*/
	for _, v := range users {
		slice := strings.Split(v, "")
		_map := findLetter(slice)
		distribution[v] = 0
		if _map["e"] != 0 {
			distribution[v] += _map["e"] * 1
			coins -= _map["e"] * 1
		}
		if _map["E"] != 0 {
			distribution[v] += _map["E"] * 1
			coins -= _map["E"] * 1
		}
		if _map["i"] != 0 {
			distribution[v] += _map["i"] * 2
			coins -= _map["i"] * 2
		}
		if _map["I"] != 0 {
			distribution[v] += _map["I"] * 2
			coins -= _map["I"] * 2
		}
		if _map["o"] != 0 {
			distribution[v] += _map["o"] * 3
			coins -= _map["o"] * 3
		}
		if _map["O"] != 0 {
			distribution[v] += _map["O"] * 3
			coins -= _map["O"] * 3
		}
		if _map["u"] != 0 {
			distribution[v] += _map["u"] * 4
			coins -= _map["u"] * 4
		}
		if _map["U"] != 0 {
			distribution[v] += _map["U"] * 4
			coins -= _map["U"] * 4
		}
	}
	fmt.Println(coins, distribution)
}
func findLetter(slice []string) map[string]int {
	// 优化: 在这处理分配
	_map := make(map[string]int, len(slice))
	for _, i := range slice {
		if _, ok := _map[i]; !ok {
			_map[i] = 1
		} else {
			_map[i]++
		}
	}
	return _map
}

// 入口函数
func main() {
	fmt.Println()
	fmt.Println("func:")
	_func()
	fmt.Println()
	fmt.Println("defer:")
	_defer()
	fmt.Println(num)
	fmt.Println()
	fmt.Println("_funcType:")
	_funcType()
	fmt.Println()
	fmt.Println("闭包:")
	f := adder(0)
	f(10)
	f(20)
	func1(func3(func2, 2, 3))
	fmt.Println()
	fmt.Println("测试:")
	_test()
}

```

### 分金币测试

```go
package main

import "fmt"

/*
你有50枚金币，需要分配给以下几个人：Matthew,Sarah,Augustus,Heidi,Emilie,Peter,Giana,Adriano,Aaron,Elizabeth。
分配规则如下：
a. 名字中每包含1个'e'或'E'分1枚金币
b. 名字中每包含1个'i'或'I'分2枚金币
c. 名字中每包含1个'o'或'O'分3枚金币
d: 名字中每包含1个'u'或'U'分4枚金币
写一个程序，计算每个用户分到多少金币，以及最后剩余多少金币？
程序结构如下，请实现 ‘dispatchCoin’ 函数
*/
var (
	coins = 50
	users = []string{
		"Matthew", "Sarah", "Augustus", "Heidi", "Emilie", "Peter", "Giana", "Adriano", "Aaron", "Elizabeth",
	}
	distribution = make(map[string]int, len(users))
)

func test() {
	left := dispatchCoin()
	fmt.Println("剩下：", left)
	fmt.Println("distribution：", distribution)
}

func dispatchCoin() int {
	for _, i := range users {
		_, ok := distribution[i]
		if !ok {
			distribution[i] = 0
		}
		rule := matchRule(i)
		distribution[i] = rule
	}
	return coins
}

func matchRule(s string) int {
	var result int
	for _, i := range s {
		// fmt.Println('e') // rune
		switch {
		case i == 'e' || i == 'E':
			result++
		case i == 'i' || i == 'I':
			result += 2
		case i == 'o' || i == 'O':
			result += 3
		case i == 'u' || i == 'U':
			result += 4
		}
	}
	coins -= result
	return result
}

```

## 

### 内置函数

```go
package main

// go fmt 格式化
import (
	"fmt"
)

/*
	new 分配内存, 主要分配值类型, 返回指针类型
	使用 panic/recover 模式处理错误
*/
func _func() {
	// panic: 程序崩溃
	f1()
	f2()
}

func f1() {
	defer func() {
		/*
			recover()必须搭配defer使用。
			defer一定要在可能引发panic的语句之前定义。
		*/
		err := recover()
		fmt.Println(err)
	}()
	panic("程序崩溃")
	fmt.Println("1")
}

func f2() {
	fmt.Println("2")
}

func _fmt() {
	/*
		Printf
		%T 类型
		%d 十进制
		%b 二进制
		%o 八进制
		%x 十六进制
		%c 字符
		%p 指针
		%f 浮点数
		%t 布尔值
		%% 百分号
	*/

	// 获取输入 fmt.Scan() Scan从标准输入扫描文本，读取由空白符分隔的值保存到传递给本函数的参数中，换行符视为空白符。
	var (
		name    string
		age     int
		married bool
	)
	// fmt.Scan(&name, &age, &married)
	// fmt.Scanf("1:%s 2:%d 3:%t", &name, &age, &married)
	fmt.Scanln(&name, &age, &married)
	fmt.Printf("扫描结果 name:%s age:%d married:%t \n", name, age, married)
}

// 入口函数
func main() {
	fmt.Println()
	fmt.Println("内置函数:")
	_func()
	fmt.Println()
	fmt.Println("fmt:")
	_fmt()
}

```



### 递归函数

```go
package main

// go fmt 格式化
import (
	"fmt"
)

func _func() {
	fmt.Println(f1(5))
}

// 阶乘
func f1(n uint32) uint32 {
	if n == 1 {
		return 1
	}
	return n * f1(n-1)
}

// 面试题.
/*
	假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
	每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
*/
func f2(n int) int {
	if n <= 2 {
		return n
	}
	var (
		i int = 1
		j int = 2
	)
	for k := 3; k <= n; k++ {
		i, j = j, i+j
	}
	return j
}

// 入口函数
func main() {
	fmt.Println()
	fmt.Println("阶乘:")
	_func()
	fmt.Println()
	fmt.Println("上台阶:")
	fmt.Println(f2(4))
}

```

## 结构体

```go
package main

// go fmt 格式化
import (
	"fmt"
	"unsafe"
)

type customInt int  // 自定义类型
type aliasInt = int // 类型别名

func _func() {
	var n customInt = 0
	var m aliasInt = 0
	fmt.Printf("%T\n", n)
	fmt.Printf("%T\n", m)
	// rune 是int32的别名
	var a rune = '中'
	fmt.Printf("%T\n", a)
}

// struct "类"  如果首字母大写.一般是公开的
type person struct {
	name     string
	age      uint8
	gender   string
	sayhello func(msg string)
}

func _struct() {
	var xo person
	xo.name = "xo"
	xo.age = 18
	xo.gender = "男"
	fmt.Println(xo)
	fmt.Printf("%T\n", xo)

	// 匿名结构体 临时
	var temp struct {
		name string
	}
	temp.name = "temp"
	fmt.Println(temp)
	fmt.Printf("%T\n", temp)

	// 初始化方式
	// 指针 ==  &person{}
	var A = new(person)
	(*A).name = "啊" // 指针赋值可以省略
	A.name = "啊"    // 在Go语言中支持对结构体指针直接使用.来访问结构体的成员。
	fmt.Println(A)
	fmt.Printf("%T\n", A)
	fmt.Printf("%p\n", A)  // A的地址
	fmt.Printf("%p\n", &A) // 值的地址

	// 1.键值
	B := person{
		name: "a",
		// ... 没有初始化的结构体，其成员变量都是对应其类型的零值。
	}

	// 2.填充顺序必须与字段在结构体中的声明顺序一致 也可以指针&
	C := &person{
		"C",
		18,
		"男",
		func(msg string) { fmt.Println(msg) },
	}

	fmt.Println(B)
	fmt.Println(C)

	// 结构体占用一块连续的内存。
	type test struct { // 升序
		a int8
		b int8
		c int8
		d int8
	}
	n := test{
		1, 2, 3, 4,
	}
	fmt.Printf("n.a %p\n", &n.a)
	fmt.Printf("n.b %p\n", &n.b)
	fmt.Printf("n.c %p\n", &n.c)
	fmt.Printf("n.d %p\n", &n.d)

	// 空结构体是不占用空间的。 调整结构体内成员变量的字段顺序就能达到缩小结构体占用大小
	var v struct{}
	fmt.Println(unsafe.Sizeof(v)) // 0
	// 在 Go 中恰到好处的内存对齐: https://segmentfault.com/a/1190000017527311?utm_campaign=studygolang.com&utm_medium=studygolang.com&utm_source=studygolang.com

}

// 构造函数
func newPerson(name string, age uint8, gender string) *person {
	// 当结构体体积比较大. 推荐返回结构体指针, 减少内存开销
	return &person{
		name:   name,
		age:    age,
		gender: gender,
		sayhello: func(msg string) {
			fmt.Println(msg)
		},
	}
}

// 方法和接收者
/*
	func (接收者变量 接收者类型) 方法名(参数列表) (返回参数) {
    函数体
	}
	接收者类型: 自定义类型(结构体/type)
*/
func (d person /* 值类型的接收者(副本) */) sayNo() { // 作用于特定类型的函数. (指定哪种接收者类型能用的函数) d 类似 this, self; 小写字母开头
	fmt.Printf("%v say no\n", d.name)
	// 如果有修改操作只是针对副本，无法修改接收者变量本身。
}

// 指针类型的接收者 由于指针的特性，调用方法时修改接收者指针的任意成员变量
func (d *person) setAge(newAge uint8) {
	d.age = newAge
}

/*
	什么时候应该使用指针类型接收者
	- 需要修改接收者中的值
	- 接收者是拷贝代价比较大的大对象
	- 保证一致性，如果有某个方法使用了指针接收者，那么其他的方法也应该使用指针接收者。
*/

//MyInt 将int定义为自定义MyInt类型
type MyInt int

//SayHello 为MyInt添加一个SayHello的方法
func (m MyInt) SayHello() {
	fmt.Println("Hello, 我是一个int。")
}

//  非本地类型不能定义方法，也就是说我们不能给别的包的类型定义方法。

// 入口函数
func main() {
	fmt.Println()
	fmt.Println("自定义类型,类型别名:")
	_func()
	fmt.Println()
	fmt.Println("struct:")
	_struct()
	fmt.Println()
	fmt.Println("struct-构造函数:")
	p := newPerson("dog", 18, "公")
	fmt.Println(unsafe.Sizeof(p)) // 8 如果不是指针的话, 则完整person空间 eg: 40
	fmt.Println(p.name)
	p.sayhello("hello, dog")
	p.sayNo()
	fmt.Println(p.age)
	p.setAge(22)
	fmt.Println(p.age)
	fmt.Println()
	fmt.Println("任意类型添加方法:")
	var m1 MyInt
	m1.SayHello() //Hello, 我是一个int。
	m1 = 100
	fmt.Printf("%#v  %T\n", m1, m1) //100  main.MyInt
}

```

## 接口

接口是一种类型,是一种特殊的类型,它规定了变量有哪些方法.

在编程中会遇到以下场景:

我不关心一个变量是什么类型,我只关心能调用它的什么方法.

## 包 (package)

https://www.liwenzhou.com/posts/Go/import_local_package_in_go_module/



![åä¸­çinit()æ§è¡æ¶æº](https://www.liwenzhou.com/images/Go/package/init01.png)

\* 想被别的包调用的标识符都要首字母大写!

\* 单行导入和多行导入

\* 导入包的时候可以指定别名

\* 导入包不想使用包内部的标识符,需要使用匿名导入

\* 每个包导入的时候会自动执行一个名为`init()`的函数,它没有参数也没有返回值也不能手动调用

\* 多个包中都定义了`init()`函数,则它们的执行顺序见下图:

![åä¹é´çinit()æ§è¡é¡ºåº](https://www.liwenzhou.com/images/Go/package/init02.png)

## 文件操作

打开文件, 通常我们通过 ` defer file.Close() `将文件关闭.

>  os.Open()

### 读

- file.read([]btye) int err
- bufio
- ioutil

```go
package main

import (
	"fmt"
	"io"
	"os"
)

// 在Go语言程序执行时导入包语句会自动触发包内部init()函数的调用。需要注意的是： init()函数没有参数也没有返回值。 init()函数在程序运行时自动被调用执行，不能在代码中主动调用它。

func init() {
	_func()
}

// file
func _func() {
	// func Open(name string) (file *File, err error)
	fmt.Println("os")
	file, err := os.Open("./init.go")
	if err != nil {
		fmt.Printf("open failed %v\n", err)
	}
	// 记得关闭文件
	defer file.Close()

	var content []byte
	var temp = make([]byte, 128)
	// func (f *File) Read(b []byte) (n int, err error)
	for {
		n, err := file.Read(temp[:])
		// 读到文件末尾时会返回0和io.EOF
		if err == io.EOF {
			fmt.Printf("已读取完 %v\n", err)
			break
		}
		if err != nil {
			fmt.Printf("read failed %v\n", err)
			return
		}
		content = append(content, temp[:n]...)
	}
	fmt.Println(string(content))
}

// bufio

func main() {
	// _func()
}


```

`!!注意点:`

![image-20201228145101597](https://images.yewq.top/image-20201228145101597.png)

### 写



`os.OpenFile()`函数能够以指定模式打开文件，从而实现文件写入相关功能。

```go
func OpenFile(name string, flag int, perm FileMode) (*File, error) {
	...
}
```

`name`：要打开的文件名 `flag`：打开文件的模式。 模式有以下几种：

|     模式      |   含义   |
| :-----------: | :------: |
| `os.O_WRONLY` |   只写   |
| `os.O_CREATE` | 创建文件 |
| `os.O_RDONLY` |   只读   |
|  `os.O_RDWR`  |   读写   |
| `os.O_TRUNC`  |   清空   |
| `os.O_APPEND` |   追加   |

`perm`：文件权限，一个八进制数。r（读）04，w（写）02，x（执行）01。

![image-20201224160642677](https://images.yewq.top/image-20201224160642677.png)

write/write.go

```go
package write

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

// os.OpenFile()函数能够以指定模式打开文件，从而实现文件写入相关功能。
/*
	func OpenFile(name string, flag int, perm FileMode) (*File, error) {
		...
	}

	os.O_WRONLY	只写
	os.O_CREATE	创建文件
	os.O_RDONLY	只读
	os.O_RDWR	读写
	os.O_TRUNC	清空
	os.O_APPEND	追加
*/
func writeFileDemo1() {
	file, err := os.OpenFile("xx.txt", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0666)
	if err != nil {
		fmt.Printf("write failed err: %v", err)
		return
	}
	defer file.Close()
	str := "hello ye"
	file.Write([]byte(str))
	file.WriteString("!!!!!")
}

// bufio.NewWriter
func writeFileDemo2() {
	file, err := os.OpenFile("xx.txt", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0666)
	if err != nil {
		fmt.Printf("write failed err: %v", err)
		return
	}
	defer file.Close()
	writer := bufio.NewWriter(file)
	writer.WriteString("存入缓存写入")
	// 写入
	writer.Flush()
}

// ioutil.WriteFile
func writeFileDemo3() {
	str := "ioutil.WriteFile"
	err := ioutil.WriteFile("xx.txt", []byte(str), 0666)
	if err != nil {
		fmt.Printf("write failed err: %v", err)
		return
	}
}

// CopyFile io.Copy()
func CopyFile(targetName string, srcName string) (written int64, err error) {
	// 1.打开文件 2.创建文件 3.复制
	file, err := os.Open(srcName)
	if err != nil {
		fmt.Printf("open failed %v\n", err)
		return
	}
	defer file.Close()
	targetFile, err := os.OpenFile(targetName, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		fmt.Printf("create failed %v\n", err)
		return
	}
	defer targetFile.Close()
	return io.Copy(targetFile, file)
}

// MyWriteFile 文件写入功能
func MyWriteFile() {
	// writeFileDemo1()
	// writeFileDemo2()
	writeFileDemo3()
	fmt.Println("文件复制")
	CopyFile("copy.txt", "./write/write.go")
}

```

bufio说明:

![bufio说明](https://images.yewq.top/image-20201228145758542.png)

read.go

```go
package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"17.文件操作os/write"
)

// 在Go语言程序执行时导入包语句会自动触发包内部init()函数的调用。需要注意的是： init()函数没有参数也没有返回值。 init()函数在程序运行时自动被调用执行，不能在代码中主动调用它。

func init() {
	fmt.Println()
	fmt.Println("指定读取多少:")
	_func()
	fmt.Println()
	fmt.Println("指定读取一行:")
	_readFileLine()
	fmt.Println()
	fmt.Println("指定读取整个文件:")
	_readFile()
}

// 指定读取多少
func _func() {
	// func Open(name string) (file *File, err error)
	fmt.Println("os")
	file, err := os.Open("./init.go")
	if err != nil {
		fmt.Printf("open failed %v\n", err)
		return
	}
	// 记得关闭文件
	defer file.Close()

	var content []byte
	var temp = make([]byte, 128)
	// func (f *File) Read(b []byte) (n int, err error)
	for {
		n, err := file.Read(temp[:])
		// 读到文件末尾时会返回0和io.EOF
		if err == io.EOF {
			fmt.Printf("已读取完 %v\n", err)
			break
		}
		if err != nil {
			fmt.Printf("read failed %v\n", err)
			return
		}
		content = append(content, temp[:n]...)
	}
	fmt.Println(string(content))
}

// bufio是在file的基础上封装了一层API，支持更多的功能。 缓存中操作
func _readFileLine() {
	file, err := os.Open("./init.go")
	if err != nil {
		fmt.Printf("open failed %v\n", err)
		return
	}
	defer file.Close()
	reader := bufio.NewReader(file)
	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			fmt.Printf("已读取完 %v\n", err)
			break
		}
		if err != nil {
			fmt.Printf("open failed %v\n", err)
			return
		}
		fmt.Print(line)
	}
}

// io/ioutil包的ReadFile方法能够读取完整的文件，只需要将文件名作为参数传入。
func _readFile() {
	content, err := ioutil.ReadFile("./go.mod")
	if err != nil {
		fmt.Printf("read file failed, err: %v", err)
		return
	}
	fmt.Println(string(content))
}

func _write() {
	write.MyWriteFile()
}

// mycat 模拟linux cat指令
func mycat() {
	var path string
	fmt.Scanf("cat %s", &path)
	content, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Printf("read file failed, err: %v", err)
		return
	}
	fmt.Println(string(content))
}

// useBufio 输入带空格的 eg:a b c
func useBufio() {
	reader := bufio.NewReader(os.Stdin) // 标准输入
	fmt.Println("请输入:")
	s, _ := reader.ReadString('\n')
	fmt.Printf("你输入的是: %v\n", s)
}

// cat命令实现
func cat(r *bufio.Reader) {
	for {
		buf, err := r.ReadBytes('\n') //注意是字符
		if err == io.EOF {
			break
		}
		fmt.Fprintf(os.Stdout, "%s", buf)
	}
}

func useCat() {
	flag.Parse() // 解析命令行参数
	if flag.NArg() == 0 {
		// 如果没有参数默认从标准输入读取内容
		cat(bufio.NewReader(os.Stdin))
	}
	// 依次读取每个指定文件的内容并打印到终端
	for i := 0; i < flag.NArg(); i++ {
		f, err := os.Open(flag.Arg(i))
		if err != nil {
			fmt.Fprintf(os.Stdout, "reading from %s failed, err:%v\n", flag.Arg(i), err)
			continue
		}
		cat(bufio.NewReader(f))
	}
}

func main() {
	fmt.Println()
	fmt.Println("文件写入")
	_write()
	fmt.Println()
	fmt.Println("模拟cat")
	// mycat() // 自己
	fmt.Println()
	fmt.Println("useBufio")
	// useCat() // 教程
	useBufio()
}

```

## 日志库

### 需求分析

1. 需要一个开关, 线上输出到日志文件. 开发输出到终端 ( 某级别不用打印 )
2. 支持往不同地方输出文件.
3. 日志分级别
   1. debug
   2. trace
   3. warning
   4. error
   5. fatal(打开某文件失败.)
4. 要包含时间,日志级别,行号,文件名,日志信息.
5. 日志文件需要切割.
   1. 按文件大小切割
   2. 按日期(小时)切割 
      1. 记录上次切割的时间 (>=(1h/1day)就切割)

## 反射

### 变量的内在机制

Go语言中的变量是分为两部分的:

- 类型信息：预先定义好的元信息。
- 值信息：程序运行过程中可动态变化的。

### 反射介绍

反射是指在程序运行期对程序本身进行访问和修改的能力。程序在编译时，变量被转换为内存地址，变量名不会被编译器写入到可执行部分。在运行程序时，程序无法获取自身的信息。

支持反射的语言可以在程序编译期将变量的反射信息，如字段名称、类型信息、结构体信息等整合到可执行文件中，并给程序提供接口访问反射信息，这样就可以在程序运行期获取类型的反射信息，并且有能力修改它们。

Go程序在运行期使用reflect包访问程序的反射信息。

在上一篇博客中我们介绍了空接口。 空接口可以存储任意类型的变量，那我们如何知道这个空接口保存的数据是什么呢？ 反射就是在运行时动态的获取一个变量的类型信息和值信息。

### reflect包

在Go语言的反射机制中，任何接口值都由是`一个具体类型`和`具体类型的值`两部分组成的(我们在上一篇接口的博客中有介绍相关概念)。 在Go语言中反射的相关功能由内置的reflect包提供，任意接口值在反射中都可以理解为由`reflect.Type`和`reflect.Value`两部分组成，并且reflect包提供了`reflect.TypeOf`和`reflect.ValueOf`两个函数来获取任意对象的Value和Type。

### ini文件 读取例子

```go
package main

import (
	"fmt"
	"io/ioutil"
	"reflect"
	"strconv"
	"strings"
)

// MysqlConf 数据库
type MysqlConf struct {
	Hostname string `ini:"hostname"`
	Port     int    `ini:"port"`
	Username string `ini:"usename"`
	Password string `ini:"password"`
}

// RedisConf ...
type RedisConf struct {
	Hostname string `ini:"hostname"`
	Port     int    `ini:"port"`
}

// Conf ...
type Conf struct {
	MysqlConf `ini:"mysql"`
	RedisConf `ini:"redis"`
}

// IniUnMarshal ini读取
func IniUnMarshal(filename string, d interface{}) (err error) {
	t := reflect.TypeOf(d)
	v := reflect.ValueOf(d)
	// 0 参数类型校验
	if t.Kind() != reflect.Ptr {
		err = fmt.Errorf("data type is not reflect.Ptr")
	}
	// 0.1 d => 指针类型 且是结构体
	if v.Elem().Kind() != reflect.Struct {
		err = fmt.Errorf("data type is not reflect.Struct")
	}
	content, err := ioutil.ReadFile(filename)
	if err != nil {
		return
	}
	lines := strings.Split(string(content), "\n")
	var sectionName string
	for idx, line := range lines {
		// 1 按行读取文件
		// 1.1 注释&&空行 跳过 去除首尾空格  # ;
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, ";") || strings.HasPrefix(line, "#") || len(line) == 0 {
			continue
		}

		// 1.2 [T] 获取节 首尾对应[] 防止内容空值. ==> tag
		if strings.HasPrefix(line, "[") {
			if !strings.HasPrefix(line, "[") || !strings.HasSuffix(line, "]") {
				err = fmt.Errorf("line: %d, syntax error", idx+1)
				return
			}
			section := strings.TrimSpace(line[1 : len(line)-1])
			if len(section) != 0 {
				// 找到结构体
				for i := 0; i < t.Elem().NumField(); i++ {
					field := t.Elem().Field(i)
					if field.Tag.Get("ini") == section {
						sectionName = field.Name
					}
				}
			} else {
				err = fmt.Errorf("line: %d, syntax error", idx+1)
				return
			}
		} else {
			if strings.HasSuffix(line, "]") {
				err = fmt.Errorf("line: %d, syntax error", idx+1)
				return
			}
			// 不包含
			if !strings.Contains(line, "=") {
				err = fmt.Errorf("line: %d, syntax error", idx+1)
				return
			}
			// 1.3 key=value 获取键值对 根据=切割
			index := strings.Index(line, "=")
			key := strings.TrimSpace(line[:index])
			value := strings.TrimSpace(line[index+1:])
			if len(key) == 0 {
				err = fmt.Errorf("line: %d, syntax error", idx+1)
				return
			}
			fieldValue := v.Elem().FieldByName(sectionName)
			fieldValueType := fieldValue.Type()
			if fieldValue.Kind() != reflect.Struct {
				err = fmt.Errorf("data中的%s字段应该是一个结构体", sectionName)
				return
			}
			// 寻找对应字段
			var fieldName string
			var fieldType reflect.Kind
			for i := 0; i < fieldValue.NumField(); i++ {
				field := fieldValueType.Field(i)
				if field.Tag.Get("ini") == key {
					fmt.Printf("找到%v字段, type is %v\n", key, field.Type)
					fieldName = field.Name
					fieldType = field.Type.Kind()
					break
				}
			}
			// fieldValue里找不到该字段
			if len(fieldName) == 0 {
				continue
			}
			currentField := fieldValue.FieldByName(fieldName)
			switch fieldType {
			case reflect.String:
				currentField.SetString(value)
			case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
				var valueInt int64
				valueInt, err = strconv.ParseInt(value, 10, 64)
				if err != nil {
					err = fmt.Errorf("line:%d value type error", idx+1)
					return
				}
				currentField.SetInt(valueInt)
			case reflect.Bool:
				var valueBool bool
				valueBool, err = strconv.ParseBool(value)
				if err != nil {
					err = fmt.Errorf("line:%d value type error", idx+1)
					return
				}
				currentField.SetBool(valueBool)
			case reflect.Float32, reflect.Float64:
				var valueFloat float64
				valueFloat, err = strconv.ParseFloat(value, 64)
				if err != nil {
					err = fmt.Errorf("line:%d value type error", idx+1)
					return
				}
				currentField.SetFloat(valueFloat)
			}
			// 检测到节 获取对应的结构体 分配赋值   v.FieldByName() v需要是结构体
		}

	}
	return
}

func main() {
	var conf Conf
	err := IniUnMarshal("./conf.ini", &conf)
	if err != nil {
		fmt.Printf("load ini failed, err: %v", err)
	}
	fmt.Printf("%#v\n", conf)
}

```



## 并发

### 并发与并行	

并发：同一时间段内执行多个任务（你在用微信和两个女朋友聊天）。

并行：同一时刻执行多个任务（你和你朋友都在用微信和女朋友聊天）。

Go语言的并发通过`goroutine`实现。`goroutine`类似于线程，属于用户态的线程，我们可以根据需要创建成千上万个`goroutine`并发工作。`goroutine`是由Go语言的运行时（runtime）调度完成，而线程是由操作系统调度完成。

Go语言还提供`channel`在多个`goroutine`间进行通信。`goroutine`和`channel`是 Go 语言秉承的 CSP（Communicating Sequential Process）并发模式的重要实现基础。

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// sync.WaitGroup
var wg sync.WaitGroup

func _func(i int) {
	fmt.Println("func", i)
}
func _func2(i int) {
	defer wg.Done()
	fmt.Println("func", i)
}
func _goroutine() {
	fmt.Println()
	fmt.Println("goroutine:")
	for i := 0; i < 2; i++ {
		go _func(i) // 单独开启一个goroutine  创建新的goroutine的时候需要花费一些时间
	}
	time.Sleep(time.Second)
}

func _wait() {
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go _func2(i) // 单独开启一个goroutine  创建新的goroutine的时候需要花费一些时间
	}
	wg.Wait()
}

// math/rand 随机数
func _rand() {
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < 5; i++ {
		r1 := rand.Int()
		r2 := rand.Intn(10) /// [0,n)的随机数
		fmt.Println(r1, r2)
	}
}

func main() {
	_goroutine()
	// main 就是一个goroutine.  main结束了. 其中创建的goroutine也会结束
	_rand()
	_wait()
}


```

## goroutine与线程

### 可增长的栈

OS线程（操作系统线程）一般都有固定的栈内存（通常为2MB）,一个`goroutine`的栈在其生命周期开始时只有很小的栈（典型情况下2KB），`goroutine`的栈不是固定的，他可以按需增大和缩小，`goroutine`的栈大小限制可以达到1GB，虽然极少会用到这么大。所以在Go语言中一次创建十万左右的`goroutine`也是可以的。

### goroutine调度模型

`GPM`是Go语言运行时（runtime）层面的实现，是go语言自己实现的一套调度系统。区别于操作系统调度OS线程。

- `G`很好理解，就是个goroutine的，里面除了存放本goroutine信息外 还有与所在P的绑定等信息。
- `P`管理着一组goroutine队列，P里面会存储当前goroutine运行的上下文环境（函数指针，堆栈地址及地址边界），P会对自己管理的goroutine队列做一些调度（比如把占用CPU时间较长的goroutine暂停、运行后续的goroutine等等）当自己的队列消费完了就去全局队列里取，如果全局队列里也消费完了会去其他P的队列里抢任务。
- `M（machine）`是Go运行时（runtime）对操作系统内核线程的虚拟， M与内核线程一般是一一映射的关系， 一个groutine最终是要放到M上执行的；

P与M一般也是一一对应的。他们关系是： P管理着一组G挂载在M上运行。当一个G长久阻塞在一个M上时，runtime会新建一个M，阻塞G所在的P会把其他的G 挂载在新建的M上。当旧的G阻塞完成或者认为其已经死掉时 回收旧的M。

P的个数是通过`runtime.GOMAXPROCS`设定（最大256），Go1.5版本之后默认为物理线程数。 在并发量大的时候会增加一些P和M，但不会太多，切换太频繁的话得不偿失。

单从线程调度讲，Go语言相比起其他语言的优势在于OS线程是由OS内核来调度的，`goroutine`则是由Go运行时（runtime）自己的调度器调度的，这个调度器使用一个称为m:n调度的技术（复用/调度m个goroutine到n个OS线程）。 其一大特点是goroutine的调度是在用户态下完成的， 不涉及内核态与用户态之间的频繁切换，包括内存的分配与释放，都是在用户态维护着一块大的内存池， 不直接调用系统的malloc函数（除非内存池需要改变），成本比调度OS线程低很多。 另一方面充分利用了多核的硬件资源，近似的把若干goroutine均分在物理线程上， 再加上本身goroutine的超轻量，以上种种保证了go调度方面的性能。

[点我了解更多](https://www.cnblogs.com/sunsky303/p/9705727.html)

### GOMAXPROCS

Go运行时的调度器使用`GOMAXPROCS`参数来确定需要使用多少个OS线程来同时执行Go代码。默认值是机器上的CPU核心数。例如在一个8核心的机器上，调度器会把Go代码同时调度到8个OS线程上（GOMAXPROCS是m:n调度中的n）。

Go语言中可以通过`runtime.GOMAXPROCS()`函数设置当前程序并发时占用的CPU逻辑核心数。

Go1.5版本之前，默认使用的是单核心执行。Go1.5版本之后，默认使用全部的CPU逻辑核心数。

## channel

单纯地将函数并发执行是没有意义的。函数与函数间需要交换数据才能体现并发执行函数的意义。

虽然可以使用共享内存进行数据交换，但是共享内存在不同的`goroutine`中容易发生竞态问题。为了保证数据交换的正确性，必须使用互斥量对内存进行加锁，这种做法势必造成性能问题。

Go语言的并发模型是`CSP（Communicating Sequential Processes）`，提倡**通过通信共享内存**而不是**通过共享内存而实现通信**。

如果说`goroutine`是Go程序并发的执行体，`channel`就是它们之间的连接。`channel`是可以让一个`goroutine`发送特定值到另一个`goroutine`的通信机制。

Go 语言中的通道（channel）是一种特殊的类型。通道像一个传送带或者队列，总是遵循先入先出（First In First Out）的规则，保证收发数据的顺序。每一个通道都是一个具体类型的导管，也就是声明channel的时候需要为其指定元素类型。



### channel类型

`channel`是一种类型，一种引用类型。声明通道类型的格式如下：

```go
var 变量 chan 元素类型
```

举几个例子：

```go
var ch1 chan int   // 声明一个传递整型的通道
var ch2 chan bool  // 声明一个传递布尔型的通道
var ch3 chan []int // 声明一个传递int切片的通道
```

### 创建channel

通道是引用类型，通道类型的空值是`nil`。

```go
var ch chan int
fmt.Println(ch) // <nil>
```

声明的通道后需要使用`make`函数初始化之后才能使用。

创建channel的格式如下：

```go
make(chan 元素类型, [缓冲大小])
```

channel的缓冲大小是可选的。

举几个例子：

```go
ch4 := make(chan int)
ch5 := make(chan bool)
ch6 := make(chan []int)
```

### channel操作

通道有发送（send）、接收(receive）和关闭（close）三种操作。

发送和接收都使用`<-`符号。

现在我们先使用以下语句定义一个通道：

```go
ch := make(chan int)
```

#### 发送

将一个值发送到通道中。

```go
ch <- 10 // 把10发送到ch中
```

#### 接收

从一个通道中接收值。

```go
x := <- ch // 从ch中接收值并赋值给变量x
<-ch       // 从ch中接收值，忽略结果
```

#### 关闭

我们通过调用内置的`close`函数来关闭通道。

```go
close(ch)
```

关于关闭通道需要注意的事情是，只有在通知接收方goroutine所有的数据都发送完毕的时候才需要关闭通道。通道是可以被垃圾回收机制回收的，它和关闭文件是不一样的，在结束操作之后关闭文件是必须要做的，但关闭通道不是必须的。

关闭后的通道有以下特点：

1. 对一个关闭的通道再发送值就会导致panic。
2. 对一个关闭的通道进行接收会一直获取值直到通道为空。
3. 对一个关闭的并且没有值的通道执行接收操作会得到对应类型的零值。
4. 关闭一个已经关闭的通道会导致panic。

### 无缓冲的通道

无缓冲的通道又称为阻塞的通道。我们来看一下下面的代码：

```go
func main() {
	ch := make(chan int)
	ch <- 10
	fmt.Println("发送成功")
}
```

上面这段代码能够通过编译，但是执行的时候会出现以下错误：

```bash
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
main.main()
        .../src/github.com/Q1mi/studygo/day06/channel02/main.go:8 +0x54
```

为什么会出现`deadlock`错误呢？

因为我们使用`ch := make(chan int)`创建的是无缓冲的通道，无缓冲的通道只有在有人接收值的时候才能发送值。就像你住的小区没有快递柜和代收点，快递员给你打电话必须要把这个物品送到你的手中，简单来说就是无缓冲的通道必须有接收才能发送。

上面的代码会阻塞在`ch <- 10`这一行代码形成死锁，那如何解决这个问题呢？

一种方法是启用一个`goroutine`去接收值，例如：

```go
func recv(c chan int) {
	ret := <-c
	fmt.Println("接收成功", ret)
}
func main() {
	ch := make(chan int)
	go recv(ch) // 启用goroutine从通道接收值
	ch <- 10
	fmt.Println("发送成功")
}
```

无缓冲通道上的发送操作会阻塞，直到另一个`goroutine`在该通道上执行接收操作，这时值才能发送成功，两个`goroutine`将继续执行。相反，如果接收操作先执行，接收方的goroutine将阻塞，直到另一个`goroutine`在该通道上发送一个值。

使用无缓冲通道进行通信将导致发送和接收的`goroutine`同步化。因此，无缓冲通道也被称为`同步通道`。

### 有缓冲的通道

解决上面问题的方法还有一种就是使用有缓冲区的通道。我们可以在使用make函数初始化通道的时候为其指定通道的容量，例如：

```go
func main() {
	ch := make(chan int, 1) // 创建一个容量为1的有缓冲区通道
	ch <- 10
	fmt.Println("发送成功")
}
```

只要通道的容量大于零，那么该通道就是有缓冲的通道，通道的容量表示通道中能存放元素的数量。就像你小区的快递柜只有那么个多格子，格子满了就装不下了，就阻塞了，等到别人取走一个快递员就能往里面放一个。

我们可以使用内置的`len`函数获取通道内元素的数量，使用`cap`函数获取通道的容量，虽然我们很少会这么做。

### for range从通道循环取值

当向通道中发送完数据时，我们可以通过`close`函数来关闭通道。

当通道被关闭时，再往该通道发送值会引发`panic`，从该通道取值的操作会先取完通道中的值，再然后取到的值一直都是对应类型的零值。那如何判断一个通道是否被关闭了呢？

我们来看下面这个例子：

```go
// channel 练习
func main() {
	ch1 := make(chan int)
	ch2 := make(chan int)
	// 开启goroutine将0~100的数发送到ch1中
	go func() {
		for i := 0; i < 100; i++ {
			ch1 <- i
		}
		close(ch1)
	}()
	// 开启goroutine从ch1中接收值，并将该值的平方发送到ch2中
	go func() {
		for {
			i, ok := <-ch1 // 通道关闭后再取值ok=false
			if !ok {
				break
			}
			ch2 <- i * i
		}
		close(ch2)
	}()
	// 在主goroutine中从ch2中接收值打印
	for i := range ch2 { // 通道关闭后会退出for range循环
		fmt.Println(i)
	}
}
```

从上面的例子中我们看到有两种方式在接收值的时候判断该通道是否被关闭，不过我们通常使用的是`for range`的方式。使用`for range`遍历通道，当通道被关闭的时候就会退出`for range`。

### 单向通道

有的时候我们会将通道作为参数在多个任务函数间传递，很多时候我们在不同的任务函数中使用通道都会对其进行限制，比如限制通道在函数中只能发送或只能接收。

Go语言中提供了**单向通道**来处理这种情况。例如，我们把上面的例子改造如下：

```go
func counter(out chan<- int) {
	for i := 0; i < 100; i++ {
		out <- i
	}
	close(out)
}

func squarer(out chan<- int, in <-chan int) {
	for i := range in {
		out <- i * i
	}
	close(out)
}
func printer(in <-chan int) {
	for i := range in {
		fmt.Println(i)
	}
}

func main() {
	ch1 := make(chan int)
	ch2 := make(chan int)
	go counter(ch1)
	go squarer(ch2, ch1)
	printer(ch2)
}
```

其中，

- `chan<- int`是一个只写单向通道（只能对其写入int类型值），可以对其执行发送操作但是不能执行接收操作；
- `<-chan int`是一个只读单向通道（只能从其读取int类型值），可以对其执行接收操作但是不能执行发送操作。

在函数传参及任何赋值操作中可以将双向通道转换为单向通道，但反过来是不可以的。

### 通道总结

`channel`常见的异常总结，如下图：![channel异常总结](https://www.liwenzhou.com/images/Go/concurrence/channel01.png)

关闭已经关闭的`channel`也会引发`panic`。

## 并发安全和锁

有时候在Go代码中可能会存在多个`goroutine`同时操作一个资源（临界区），这种情况会发生`竞态问题`（数据竞态）。类比现实生活中的例子有十字路口被各个方向的的汽车竞争；还有火车上的卫生间被车厢里的人竞争。

举个例子：

```go
var x int64
var wg sync.WaitGroup

func add() {
	for i := 0; i < 5000; i++ {
		x = x + 1
	}
	wg.Done()
}
func main() {
	wg.Add(2)
	go add()
	go add()
	wg.Wait()
	fmt.Println(x)
}
```

上面的代码中我们开启了两个`goroutine`去累加变量x的值，这两个`goroutine`在访问和修改`x`变量的时候就会存在数据竞争，导致最后的结果与期待的不符。

### 互斥锁

互斥锁是一种常用的控制共享资源访问的方法，它能够保证同时只有一个`goroutine`可以访问共享资源。Go语言中使用`sync`包的`Mutex`类型来实现互斥锁。 使用互斥锁来修复上面代码的问题：

```go
var x int64
var wg sync.WaitGroup
var lock sync.Mutex

func add() {
	for i := 0; i < 5000; i++ {
		lock.Lock() // 加锁
		x = x + 1
		lock.Unlock() // 解锁
	}
	wg.Done()
}
func main() {
	wg.Add(2)
	go add()
	go add()
	wg.Wait()
	fmt.Println(x)
}
```

使用互斥锁能够保证同一时间有且只有一个`goroutine`进入临界区，其他的`goroutine`则在等待锁；当互斥锁释放后，等待的`goroutine`才可以获取锁进入临界区，多个`goroutine`同时等待一个锁时，唤醒的策略是随机的。

### 读写互斥锁

互斥锁是完全互斥的，但是有很多实际的场景下是`读多写少`的，当我们并发的去读取一个资源不涉及资源修改的时候是没有必要加锁的，这种场景下使用读写锁是更好的一种选择。读写锁在Go语言中使用`sync`包中的`RWMutex`类型。

读写锁分为两种：读锁和写锁。当一个goroutine获取读锁之后，其他的`goroutine`如果是获取读锁会继续获得锁，如果是获取写锁就会等待；当一个`goroutine`获取写锁之后，其他的`goroutine`无论是获取读锁还是写锁都会等待。

读写锁示例：

```go
var (
	x      int64
	wg     sync.WaitGroup
	lock   sync.Mutex
	rwlock sync.RWMutex
)

func write() {
	// lock.Lock()   // 加互斥锁
	rwlock.Lock() // 加写锁
	x = x + 1
	time.Sleep(10 * time.Millisecond) // 假设读操作耗时10毫秒
	rwlock.Unlock()                   // 解写锁
	// lock.Unlock()                     // 解互斥锁
	wg.Done()
}

func read() {
	// lock.Lock()                  // 加互斥锁
	rwlock.RLock()               // 加读锁
	time.Sleep(time.Millisecond) // 假设读操作耗时1毫秒
	rwlock.RUnlock()             // 解读锁
	// lock.Unlock()                // 解互斥锁
	wg.Done()
}

func main() {
	start := time.Now()
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go write()
	}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go read()
	}

	wg.Wait()
	end := time.Now()
	fmt.Println(end.Sub(start))
}
```

需要注意的是**读写锁非常适合读多写少**的场景，如果读和写的操作差别不大，读写锁的优势就发挥不出来。



### sync.Once

说在前面的话：这是一个进阶知识点。

在编程的很多场景下我们需要确保某些操作在高并发的场景下只执行一次，例如只加载一次配置文件、只关闭一次通道等。

Go语言中的`sync`包中提供了一个针对只执行一次场景的解决方案–`sync.Once`。

`sync.Once`只有一个`Do`方法，其签名如下：

```go
func (o *Once) Do(f func()) {}
```

*备注：如果要执行的函数`f`需要传递参数就需要搭配闭包来使用。*

#### 加载配置文件示例

延迟一个开销很大的初始化操作到真正用到它的时候再执行是一个很好的实践。因为预先初始化一个变量（比如在init函数中完成初始化）会增加程序的启动耗时，而且有可能实际执行过程中这个变量没有用上，那么这个初始化操作就不是必须要做的。我们来看一个例子：

```go
var icons map[string]image.Image

func loadIcons() {
	icons = map[string]image.Image{
		"left":  loadIcon("left.png"),
		"up":    loadIcon("up.png"),
		"right": loadIcon("right.png"),
		"down":  loadIcon("down.png"),
	}
}

// Icon 被多个goroutine调用时不是并发安全的
func Icon(name string) image.Image {
	if icons == nil {
		loadIcons()
	}
	return icons[name]
}
```

多个`goroutine`并发调用Icon函数时不是并发安全的，现代的编译器和CPU可能会在保证每个`goroutine`都满足串行一致的基础上自由地重排访问内存的顺序。loadIcons函数可能会被重排为以下结果：

```go
func loadIcons() {
	icons = make(map[string]image.Image)
	icons["left"] = loadIcon("left.png")
	icons["up"] = loadIcon("up.png")
	icons["right"] = loadIcon("right.png")
	icons["down"] = loadIcon("down.png")
}
```

在这种情况下就会出现即使判断了`icons`不是nil也不意味着变量初始化完成了。考虑到这种情况，我们能想到的办法就是添加互斥锁，保证初始化`icons`的时候不会被其他的`goroutine`操作，但是这样做又会引发性能问题。

使用`sync.Once`改造的示例代码如下：

```go
var icons map[string]image.Image

var loadIconsOnce sync.Once

func loadIcons() {
	icons = map[string]image.Image{
		"left":  loadIcon("left.png"),
		"up":    loadIcon("up.png"),
		"right": loadIcon("right.png"),
		"down":  loadIcon("down.png"),
	}
}

// Icon 是并发安全的
func Icon(name string) image.Image {
	loadIconsOnce.Do(loadIcons)
	return icons[name]
}
```





## 网络编程

![image-20210202141254726](https://images.yewq.top/image-20210202141254726.png)

![image-20210202122426876](https://images.yewq.top/image-20210202122426876.png)

应用层(HTTP, FTP, SMTP) ->表 ->会 ->传输层
(端口号, UDP协议, TCP协议) ->网络层
(MAC地址,IP地址) ->数据链路层
(信号解析,以太网, MAC地址, 广播) ->物理层
(物理)

