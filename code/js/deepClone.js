function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
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