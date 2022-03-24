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
  this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        // 上一个promise的handle
        // 立即执行
        onFulfilled, // then回调
        onRejected,
        resolve, //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
        reject,
      });
    });
  };

  this.catch = function (onError) {
    this.then(null, onError);
  };

  this.finally = function (onDone) {
    this.then(onDone, onDone);
  };

  // 等状态fulfilled开始执行
  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }

    const cb =
      state === "fulfilled" ? callback.onFulfilled : callback.onRejected;
    const next = state === "fulfilled" ? callback.resolve : callback.reject;
    if (!cb) {
      // 如果没有回调函数 不会
      next(value);
      return;
    }
    // 异常处理 try catch
    try {
      const ret = cb(value);
      next(ret);
    } catch (error) {
      callback.reject(error);
    }
  }

  function reject(error) {
    const fn = () => {
      if (state !== "pending") return;

      if (error && (typeof error === "object" || typeof error === "function")) {
        const { then } = error;
        if (typeof then === "function") {
          then.call(error, resolve, reject);
          return;
        }
      }
      state = "rejected";
      value = error;
      handelCb();
    };
    setTimeout(fn, 0);
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
          then.call(newValue, resolve, reject);
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

  fn(resolve, reject);
}

/* 
    Promise.resolve({name:'winty'})
    Promise.reject({name:'winty'})
    等价于
    new Promise(resolve => resolve({name:'winty'}))
    new Promise((resolve,reject) => reject({name:'winty'}))

    Promise.resolve 的入参可能有以下几种情况：
      无参数 [直接返回一个resolved状态的 Promise 对象]
      普通数据对象 [直接返回一个resolved状态的 Promise 对象]
      一个Promise实例 [直接返回当前实例]
      一个thenable对象(thenable对象指的是具有then方法的对象) [转为 Promise 对象，并立即执行thenable对象的then方法。]  
  */

Promise.resolve = function (value) {
  if (value && value instanceof Promise) {
    //  一个Promise实例 [直接返回当前实例]
    return value;
  } else if (
    value &&
    (typeof value === "object" || typeof value === "function")
  ) {
    const { then } = value;
    //一个thenable对象
    return new Promise((resolve) => {
      then(resolve);
    });
  } else if (value) {
    return new Promise((resolve) => resolve(value));
  } else {
    return new Promise((resolve) => resolve());
  }
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

// 入参是一个 Promise 的实例数组，然后注册一个 then 方法，然后是数组中的 Promise 实例的状态都转为 fulfilled 之后则执行 then 方法。这里主要就是一个计数逻辑，每当一个 Promise 的状态变为 fulfilled 之后就保存该实例返回的数据，然后将计数减一，当计数器变为 0 时，代表数组中所有 Promise 实例都执行完毕。

Promise.all = function (arr) {
  var args = arr.slice();
  return new Promise(function (resolve, reject) {
    var remaining = args.length;
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
        // 后置-- 算计算之前的的数.  --前置 算计算之后的的数
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (error) {
        // 如果有报错
        reject(error);
      }
    }
    for (let i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

new Promise((resolve, reject) => {
  reject({ test: 1 });
}).then(
  (data) => {
    console.log("result1", data);
    // 我们常用的链式调用，是用在异步回调中，以解决"回调地狱"的问题
    //dosomething
    return test();
  },
  (err) => {
    console.log("rejected", err);
  }
);

function test(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ test: 2 });
    }, 5000);
  });
}
