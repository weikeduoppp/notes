function deepClone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    var obj = Array.isArray(target) ? [] : {};
    // 防止循环引用
    if (map.get(target)) {
      return map.get(target);
    }
    // 没有就先初始 放在后面不行
    map.set(target, obj);
    for (const key in target) {
      obj[key] = deepClone(target[key], map);
    }
    return obj;
  } else {
    return target;
  }
}

function deepClone2(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let obj = Array.isArray(target) ? [] : {};
    if (map.has(target)) {
      return map.get(target);
    }
    // 没有就存储
    map.set(target, obj);

    for (const key in target) {
      // 保证 key 不是原型属性
      if (Object.hasOwnProperty.call(target, key)) {
        obj[key] = deepClone2(target[key], map);
      }
    }
    return obj;
  } else {
    return target;
  }
}
