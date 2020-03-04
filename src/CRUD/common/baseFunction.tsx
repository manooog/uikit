import React from "react";

import dayjs from "dayjs";
import { find } from "lodash";
import { formOption, TypeColumnRender } from "../../../types/index";

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

export const makeRenders = (): {
  [key: string]: TypeColumnRender;
} => {
  return {
    time: (rowColumn, item) => {
      return (
        <span style={{ width: "150px", display: "inline-block" }}>
          {makeTime(item[rowColumn.prop])}
        </span>
      );
    },
    dict: (rowColumn, item: any) => {
      let _laabel: string = "";
      try {
        _laabel = (find(
          rowColumn.options,
          opt => opt.value === item[rowColumn.prop]
        ) as any).label;
      } catch (error) {
        console.warn(
          `${rowColumn.prop}值为${item[rowColumn.prop]}的字典档没有找到`
        );
      }
      return <span>{_laabel}</span>;
    },
    indexPlus: (...args: any[]) => {
      return <div>{args.pop() + 1}</div>;
    },
    default: (rowColumn, item: any) => {
      return (
        <span style={{ whiteSpace: "normal" }}>
          {item[rowColumn.prop] || "无"}
        </span>
      );
    }
  };
};
