function getUrlParams(url) {
  try {
    url = decodeURIComponent(url);
    const reg = /([^?&=]+)=([^?&=]+)/g;
    const obj = {};
    url.replace(reg, (match, s1, s2) => {
      obj[s1] = s2;
    });
    return obj;
  } catch (error) {
    return false;
  }
}

function new_instance_of(leftValue, rightValue) {
  if (
    !leftValue ||
    !rightValue ||
    typeof leftValue !== "object" ||
    typeof rightValue !== "function"
  ) {
    throw Error("Right-hand side of " instanceof " is not an object");
  }

  let rightProto = rightValue.prototype; // 取右表达式的 prototype 值
  leftValue = leftValue.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftValue === null) {
      return false;
    }
    if (leftValue === rightProto) {
      return true;
    }
    leftValue = leftValue.__proto__;
  }
}

// console.log(new_instance_of(null, Object));
