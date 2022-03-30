Function.prototype.call = function(t) {
  var context = t || window;
  context.fn = this;
  var res = context.fn(...Array.from(arguments).slice(1));
  delete context;
  return res
}

Function.prototype.apply = function (t) {
  var context = t || window;
  context.fn = this;
  var res = context.fn(...arguments[1]);
  delete context;
  return res;
};