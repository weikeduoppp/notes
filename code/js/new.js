function New(fn) [
  var obj = {}
  obj.__proto__ = fn.prototype;
  var res = fn.apply(obj, [...arguments.slice(1)])
  return typeof res === 'object' ? res : obj; 
]

// Promise.all([A, B])
Promise.all = function(arr) {
    let result = []
    return new Promise((resolve, reject)=>{
        let remaining = arr.length
        function res(val, i) {
            try {
                if (val && (typeof val === 'function' || typeof val === 'object')) {
                    const {
                        then
                    } = val;
                    if (typeof then === 'function') {
                        then.call(val,
                        function(value) {
                            res(value, i)
                        },
                        reject);
                        return; 
                    }
                }
                result[i] = val;
                if (--remaining === 0) {
                    resolve(result)
                }
            } catch(error) {
                reject(error)
            }

        }
        for (let i = 0; i < arr.length; i++) {
            res(arr[i], i)
        }
    })
}