function New(fn) [
  var obj = {}
  obj.__proto__ = fn.prototype;
  var res = fn.apply(obj, [...arguments.slice(1)])
  return typeof res === 'object' ? res : obj; 
]