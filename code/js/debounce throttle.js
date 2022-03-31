// 应用场景：点击按钮，输入框模糊查询，词语联想等
// 防抖 函数延迟指定时间执行 在指定时间内多次触发, 只执行最后的那一次
function debounce(fn, time) {
  let timeout = null;
  return function () {
    // 每一次点击判断有延迟执行的任务就停止
    if (timeout !== null) clearTimeout(timeout);
    // 否则就开启延迟任务
    timeout = setTimeout(fn, wait);
  };
}

// 节流 频繁触发的时候，比如滚动或连续点击，在指定的间隔时间内，只会执行一次
function throttle(fn, time) {
  let date = Date.now()
  return function() {
    let now = Date.now();
    if(now - date > time) {
      fn.call(this, arguments)
      date = now;
    }
  }
}