import React, { CSSProperties } from "react";

import { find } from "lodash";
import { TypeColumnRender, ListConfig } from "../../../types/index";
import { makeTime } from "./baseFunction";

const spanStyleSingleLine: CSSProperties = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "inline-block"
};

const spanStyleMutiLine: CSSProperties = {
  wordBreak: "break-all",
  whiteSpace: "normal",
  textAlign: "justify"
};

export const makeRenders = (
  config: ListConfig
): {
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
        <div
          style={{
            ...(config.mutiLine ? spanStyleMutiLine : spanStyleSingleLine),
            width: "100%"
          }}
          title={item[rowColumn.prop]}
        >
          {item[rowColumn.prop] || "无"}
        </div>
      );
    }
  };
};
