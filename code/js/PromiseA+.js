// PromiseA+ 只含 resolve 方法的 Promise 模型
function a() {}

// 可进行链式调用，且每次 then 返回了新的 Promise(2次打印结果不一致，如果是同一个实例，打印结果应该一致。
// 只输出第一次 resolve 的内容，reject 的内容没有输出，即 Promise 是有状态且状态只可以由pending -> fulfilled或 pending-> rejected,是不可逆的。
// then 中返回了新的 Promise,但是then中注册的回调仍然是属于上一个 Promise 的。

function Promise(fn) {
  let state = "pending";
  let value = null;
  const callbacks = [];
  // onFulfilled
  this.then = function (onFulfilled) {
    return new Promise((resolve, rejected) => {
      handle({
        // 上一个promise的handle
        // 立即执行
        onFulfilled, // then回调
        resolve, //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
      });
    });
  };

  // 等状态fulfilled开始执行
  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }
    if (state === "fulfilled") {
      // 状态fulfilled 执行回调
      if (!callback.onFulfilled) {
        // 如果没有回调函数 不会
        callback.resolve(value);
        return;
      }
      const ret = callback.onFulfilled(value); //处理回调 ret可能会是异步函数
      callback.resolve(ret); //处理下一个 promise 的resolve
    }
  }

  function resolve(newValue) {
    const fn = () => {
      // 只记录第一次resolve
      if (state !== "pending") return;

      // newValue
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) { 
        const { then } = newValue;
        if (typeof then === "function") {
          // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
          //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调 等待新promise状态fulfilled了再执行上个 promise的resolve 从而改变上个promise的状态
          then.call(newValue, resolve);
          return; // 把第一个 then 中产生的 Promise 的 resolve 函数的执行，延迟到 test 里面的 Promise 的状态为 onFulfilled 的时候再执行，
        }
      }

      state = "fulfilled";
      value = newValue;
      handelCb();
    };

    setTimeout(fn, 0); //基于 PromiseA+ 规范
  }

  function handelCb() {
    while (callbacks.length) {
      const fulfiledFn = callbacks.shift();
      handle(fulfiledFn);
    }
  }

  fn(resolve);
}

new Promise((resolve, reject) => {
  resolve({ test: 1 });
})
  .then((data) => {
    console.log("result1", data);
    // 我们常用的链式调用，是用在异步回调中，以解决"回调地狱"的问题
    //dosomething  
    return test(); 
  })
  .then((data) => {
    console.log("result2", data);
  });

function test(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ test: 2 });
    }, 5000);
  });
}


