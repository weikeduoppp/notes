Function.prototype.call = function (t) {
  var context = t || window;
  context.fn = this;
  var res = context.fn(...Array.from(arguments).slice(1));
  delete context;
  return res;
};

Function.prototype.apply = function (t) {
  var context = t || window;
  context.fn = this;
  var res = context.fn(...arguments[1]);
  delete context;
  return res;
};
/* 
  传参的模拟实现 二次传参
  一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
*/
// 不使用new的情况
Function.prototype.bind2 = function (t) {
  var context = t || window;
  var self = this;
  var prevArgs = Array.from(arguments).slice(1); // 二次传参
  var Fbound = function () {
    // 如果new 将this指向实例
    return self.apply(this instanceof Fbound ? this : context, [
      ...prevArgs,
      ...arguments,
    ]);
  };
  // 继承原函数
  Fbound.prototype = Object.create(self.prototype);
  return Fbound;
};

Function.prototype.bind = function (t) {
  var context = t || window;
  var self = this;
  var prevArgs = Array.from(arguments).slice(1); // 二次传参
  return function F(args) {
    // 如果new 直接new 实例
    return this instanceof F
      ? new self(...prevArgs, ...args)
      : self.apply(context, [...prevArgs, ...args]);
  };
};
