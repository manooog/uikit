import { useState, useEffect } from "react";
import {
  ListOptions,
  Column,
  liveColumn,
  queryParams,
  listHook
} from "fcbox-uikit";
import { makeRenders, removeEmpty } from "./common/baseFunction";

export default (options: ListOptions): listHook => {
  let [listData, setListData] = useState<any>({ items: [], count: 0 });
  let [query, setQuery] = useState<queryParams>({
    pageNo: 1,
    pageSize: 10,
    query: { request: {} }
  });

  const _options = {
    pageSize: 10,
    searchKey: "id",
    queryKey: "id",
    ...options
  };

  const renders = makeRenders();

  const _makeColumns = (columns: Column[]): liveColumn => {
    let rules: { [key: string]: any[] } = {};
    let items: Column[] = [];
    let _columns: Column[] = [];
    for (let c of columns) {
      let render;

      if (c.type && renders[c.type]) {
        if (c.type === "time") {
          //时间类型的列，固定宽度
          c.width = 170;
        }
        render = renders[c.type].bind(null, c);
      } else {
        // dict
        if (c.options) {
          render = renders["dict"].bind(null, c);
        } else {
          render = renders.default.bind(null, c);
        }
      }

      c.render = c.render ? c.render.bind(null, render, c) : render;

      _columns.push(c);
    }

    return {
      rules,
      columns: _columns
    };
  };

  /**
   * 获取列表数据
   *
   * @param {Params} [params]
   */
  function _fetchData(params?: queryParams) {
    let _params: queryParams = {
      ...query,
      ...params
    };
    if (params) {
      if (params.query) {
        _params = { ..._params, ...params.query };
      }
    }
    removeEmpty(_params);

    _options.loadMethod(_params).then(res => {
      setListData({
        items: res.items,
        count: res.count
      });
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

    _fetchData(params);
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
    _options.beforeDelete().then(() => {
      // let res = await deleteById(item[_options.searchKey]);
      fetchData();
    });
  };

  useEffect(() => {
    _fetchData();
  }, []);

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
