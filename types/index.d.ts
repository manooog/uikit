declare module "fcbox-uikit" {
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
    query?: formOption;
    edit?: formOption;
    render?: (
      render: (item: any, index?: any) => any,
      rowColumn: Column,
      item: any, // 实际数据
      index?: any
    ) => any;
  };

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
    /**
     * 表单项的属性生成器
     * 会将同步表单数据的方法下放
     *
     */
    props?: (
      form: any,
      setForm: React.Dispatch<any>
    ) => { [key: string]: any } & { placeholder?: string };
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

  type Dict = {
    [key: string]: dictItem[];
  };

  interface queryParams {
    pageNo?: number;
    pageSize?: number;
    request?: Object;
  }

  interface ListOptions {
    columns: Column[];
    pageSize?: number;
    loadMethod: (p: queryParams) => Promise<{ items: any[]; count: number }>;
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
    cName: (prefix: string) => (str: string) => { m: modify; v: string };
  }
  export const utils: Utils;

  export const useListHook: (op: ListOptions) => listHook;

  interface liveFormItem {
    label: string;
    comp?: React.ComponentType;
    type?: "input" | "select" | "radio";
    props: () => { value: any; onChange: (e) => any; [key: string]: any };
    cloumn: Column
  }

  // 类型声明，只能作值的声明
  // type UseFormHook = <T extends { [key: string]: any }>(
  //   op: ListOptions,
  //   getItemOption: (col: Column) => undefined | formOption
  // ) => [any, React.Dispatch<T>, { [key in keyof T]: liveFormItem }];

  type UseFormHook = (
    op: ListOptions,
    getItemOption: (col: Column) => undefined | formOption
  ) => [any, React.Dispatch<any>, { [key: string]: liveFormItem }];

  // 值声明，只能用户值的使用
  export const useFormHook: UseFormHook;
}
