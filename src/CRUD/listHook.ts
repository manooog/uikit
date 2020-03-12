import { useState, useEffect } from "react";
import {
  ListOptions,
  Column,
  liveColumn,
  queryParams,
  listHook,
  liveColumnItem,
  TypeColumnRender,
  formOption
} from "../../types/index";
import { removeEmpty } from "./common/baseFunction";
import { makeRenders } from "./common/tableColumnRender";

export default (options: ListOptions): listHook => {
  const renders = makeRenders(options.opts || {});
  let [listData, setListData] = useState<any>({ items: [], count: 0 });
  let [query, setQuery] = useState<queryParams>({
    pageNo: 1,
    pageSize: 10,
    request: {}
  });

  const _options = {
    pageSize: 10,
    searchKey: "id",
    queryKey: "id",
    ...options
  };

  const _combineEditItem = (item: liveColumnItem) => {};

  const _makeColumns = (columns: Column[]): liveColumn => {
    let rules: { [key: string]: any[] } = {};
    let _columns: Array<liveColumnItem> = [];
    let queryItems: { [key: string]: any } = {};

    for (let c of columns) {
      const _c: liveColumnItem = {
        ...c,
        render: (item: any, index?: any) => {}
      };

      let render: TypeColumnRender;

      if (_c.type && renders[_c.type]) {
        if (_c.type === "time") {
          //时间类型的列，固定宽度
          _c.width = 170;
        }
        render = renders[_c.type].bind(null, _c);
      } else {
        // dict
        if (_c.options) {
          render = renders["dict"].bind(null, _c);
        } else {
          // default
          render = renders.default.bind(null, _c);
        }
      }

      _c.render = c.render ? c.render.bind(null, render, _c) : render;

      _columns.push(_c);
    }

    return {
      rules,
      columns: _columns
    };
  };

  function _fetchData() {
    let _params: queryParams = {
      ...query
    };

    removeEmpty(_params);

    _options.loadMethod(_params).then(res => {
      if (res) {
        setListData({
          items: res.items,
          count: res.count
        });
      }
    });
  }

  const fetchData = function(params: queryParams = {}) {
    let pageNo: number = 1;

    if (params && params.pageNo) {
      pageNo = params.pageNo;
    }

    setQuery({
      ...query,
      ...params,
      pageNo
    });
  };

  // TODO:
  function deleteById(id: string, key: string = _options.queryKey) {}

  /**
   * 2019.10.29
   * 根据后端的要求，部分启用禁用的操作单独使用接口
   */
  const onSave = async (
    item: any,
    type: "update" | "insert" | "updateStatus"
  ) => {
    // let res = await post(`!${options.uri}${resourceType[type]}`, item);
    // if (res) {
    //   fetchData();
    // }
    // return res;
  };

  const onDelete = async (item: any) => {
    const resolve = async () => {
      // let res = await deleteById(item[_options.searchKey]);
      fetchData();
    };
  };

  useEffect(() => {
    _fetchData();
  }, [query]);

  return {
    listData,
    query,
    setQuery,
    fetchData,
    onSave,
    onDelete,
    liveColumn: _makeColumns(options.columns)
  };
};
