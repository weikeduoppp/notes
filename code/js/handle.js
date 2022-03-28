function Promise(fn) {
  let state = "pending";
  let value = null;
  const callbacks = [];

  this.then = function (onFulfilled) {
    return new Promise((resolve, reject) => {
      handle({
        //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
        onFulfilled,
        resolve,
      });
    });
  };

  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }

    if (state === "fulfilled") {
      if (!callback.onFulfilled) {
        callback.resolve(value);
        return;
      }
      const ret = callback.onFulfilled(value); //处理回调 ret可能会是异步函数
      callback.resolve(ret); // 下一个 promise 的resolve
    }
  }
  function resolve(newValue) {
    const fn = () => {
      if (state !== "pending") return;
      // newValue
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) {
        const { then } = newValue;
        if (typeof then === "function") {
          // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
          //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
          then.call(newValue, resolve);
          return;
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

Promise.all = function (arr) {
  var args = arr.slice();
  return new Promise(function (resolve, reject) {
    let remaining = args.length;
    function res(i, val) {
      try {
        if (val && (typeof val === "object" || typeof val === "function")) {
          const { then } = val;
          if (typeof then === "function") {
            then.call(
              val,
              function (value) {
                res(i, value);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (error) {
        reject(error);
      }
    }
    for (let i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

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
