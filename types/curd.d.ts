type makeColumns = (arg0: Column[]) => Column[];

type TypeColumnRender = (rowColumn: Column, item: any, index?: any) => any;
/**
 * 优先级 render => type => options
 */
type Column = {
  label: string;
  prop: string;
  width?: string | number;
  type?: "time";
  options?: Array<dictItem>; // 如果是字典类型，则需要给出字典的选项
  hide?: () => boolean;
  query?: formOption;
  edit?: formOption;
  render?: (
    render: (item: any, index?: any) => any,
    rowColumn: Column,
    item: any, // 实际数据
    index?: any
  ) => any;
};

/**
 * 表单项的属性生成器
 * 会将同步表单数据的方法下放
 *
 */
type makePropsMethod = (
  form: any,
  setForm: React.Dispatch<any>,
  item: formOption
) => { [key: string]: any } & { placeholder?: string };

type formOption = {
  label?: string;
  /**
   * 表单项的简单类型可以使用这个
   *
   * @type {('input' | 'radio' | 'select')}
   */
  type?: "input" | "radio" | "select";
  /**
   * 表单项的验证生成规则
   *
   * @type {any[]}
   */
  rule?: any[];

  props?: makePropsMethod;
  /**
   * 表单项的中文标签
   *
   * @type {string}
   */

  /**
   * 表单项使用的组件，优先使用这个字段，没有这个字段则使用type字段
   *
   * @type {*}
   */
  comp?: any;
};

type dictItem = {
  label: string;
  value: string | number;
};

export type Dict = {
  [key: string]: dictItem[];
};

interface queryParams {
  pageNo?: number;
  pageSize?: number;
  request?: Object;
}

interface ListConfig {
  mutiLine?: boolean; // 是否在列表中展示多行
}

interface ListOptions {
  columns: Column[];
  pageSize?: number;
  loadMethod: (p: queryParams) => Promise<{ items: any[]; count: number }>;
  opts?: ListConfig;
}

type liveColumnItem = Column & {
  render: (item: any, index?: any) => any;
};

type liveColumn = {
  columns: Array<liveColumnItem>;
  rules: any;
};

interface listHook {
  listData: { items: any[]; count: number };
  query: queryParams;
  setQuery: React.Dispatch<queryParams>;
  fetchData: (q?: queryParams) => void;
  onSave;
  onDelete;
  liveColumn: liveColumn;
}

type modify = (
  str?: string,
  flag?: Function | boolean
) => { v: string; m: modify };

interface Utils {
  makeTime: (val: any, needTime?: boolean) => string;
  cName: (prefix: string) => (str?: string) => { m: modify; v: string };
}
export const utils: Utils;

export const useListHook: (op: ListOptions) => listHook;

interface liveFormItem {
  label: string;
  comp?: React.ComponentType;
  type?: "input" | "select" | "radio";
  props: () => { value: any; onChange: (e) => any; [key: string]: any };
  cloumn: Column;
}

// 类型声明，只能作值的声明
// type UseFormHook = <T extends { [key: string]: any }>(
//   op: ListOptions,
//   getItemOption: (col: Column) => undefined | formOption
// ) => [any, React.Dispatch<T>, { [key in keyof T]: liveFormItem }];

type UseFormHook = (
  op: ListOptions,
  getItemOption: (col: Column) => undefined | formOption
) => {
  form: any;
  setForm: React.Dispatch<any>;
  formItems: { [key: string]: liveFormItem };
};

// 值声明，只能用户值的使用
export const useFormHook: UseFormHook;
