function quickSort1(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  let left = low;
  let right = high;
  let flag = arr[left];
  while (left < right) {
    // 从右边开始找比flag小的
    while (left < right && flag <= arr[right]) {
      // 如果右边小right--
      right--;
    }
    // 找到比flag小的赋值过来 放到左边
    arr[left] = arr[right];
    while (left < right && flag >= arr[left]) {
      left++; 
    }
    // 找到比flag大的 放到右边
    arr[right] = arr[left];
  }
  // 当left = right 时. 该位置为pivot点 (flag)
  arr[left] = flag;
  quickSort1(arr, low, left - 1);
  quickSort1(arr, left + 1, high);
  return arr;
}

console.log(quickSort1([8, 11, 4, 3, 6, 6, 1, 9, 7, 2, 0]));