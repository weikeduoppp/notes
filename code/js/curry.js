// 参数复用  使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

var curry = fn => judge = (...args) => args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)