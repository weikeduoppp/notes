// 数组去重
// 1. Set
function arrUnique(arr) {
  return Array.from(new Set(arr))
}

// 2. Map


// 3. indexOf/includes/filter

// 数组扁平化

let arr = [1, [2, [3, [4, [5]]]]];

function flat(arr, res = []) {
  for (let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      flat(arr[i], res)
    } else {
      res.push(arr[i])
    }
  }
  return res;
}

console.log(flat(arr));