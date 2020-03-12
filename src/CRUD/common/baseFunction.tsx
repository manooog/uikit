import React from "react";

import dayjs from "dayjs";

// export const getRules = (items: formOption[]) => {
//   const container: { [key: string]: any } = {};
//   for (const item of items) {
//     if (item.prop && item.rule) {
//       container[item.prop] = item.rule;
//     }
//   }
//   return container;
// };

/**
 * 递归移除对象的空字段
 * 这个方法会改变原对象
 *
 * @param {{ [key: string]: any }} source
 */
export const removeEmpty = (source: { [key: string]: any }) => {
  for (const key in source) {
    let element = source[key];
    if (element === null || element === undefined) {
      delete source[key];
      continue;
    }
    if (element instanceof Date) {
      element = element.toISOString();
    }
    if (typeof element === "object" && !Array.isArray(element)) {
      // object
      removeEmpty(element);
      if (Object.keys(element).length === 0) {
        delete source[key];
      }
    } else {
      if (element === "") {
        delete source[key];
      }
    }
  }
};

export const makeTime = (val: any, needTime: boolean = true) => {
  let timestamp = +val;

  if (isNaN(timestamp)) {
    timestamp = val;
  }

  let str = timestamp
    ? dayjs(timestamp).format(`YYYY-MM-DD${needTime ? " HH:mm:ss" : ""}`)
    : "无";
  return str;
};
