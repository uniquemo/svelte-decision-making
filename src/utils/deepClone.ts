const deepClone = (target) => {
  if (typeof target !== 'object') {
    return target;
  }

  const data = Array.isArray(target) ? [] : {};
  for (const key in target) {
    data[key] = deepClone(target[key]);
  }

  return data;
}

export default deepClone;
