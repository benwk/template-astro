export function flattenObject(obj, prefix = "", seenObjects = new WeakSet()) {
  let flatObject = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && !Array.isArray(value)) {
      if (seenObjects.has(value)) {
        throw new Error("Circular reference detected");
      }
      seenObjects.add(value);
      flatObject = {
        ...flatObject,
        ...flattenObject(value, newKey, seenObjects),
      };
    } else {
      flatObject[newKey] = value;
    }
  }

  return flatObject;
}
