import { flattenObject } from "./json";
import { test, expect } from "vitest";

test("flattenObject: Flattens simple objects", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
  };

  const result = flattenObject(obj);
  expect(result).toEqual({
    key1: "value1",
    key2: "value2",
  });
});

test("flattenObject: Flattens nested objects", () => {
  const obj = {
    key1: {
      subKey1: "subValue1",
      subKey2: "subValue2",
    },
    key2: "value2",
  };

  const result = flattenObject(obj);
  expect(result).toEqual({
    "key1.subKey1": "subValue1",
    "key1.subKey2": "subValue2",
    key2: "value2",
  });
});

test("flattenObject: Throws error on circular reference", () => {
  const obj = {
    key1: "value1",
  };
  obj.circular = obj;

  expect(() => flattenObject(obj)).toThrow("Circular reference detected");
});
