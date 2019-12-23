declare module "fcbox-uikit" {
  type ColumnRender = (
    rowColumn: Column,
    /**
     * 当前行的数据
     */
    item: any,
    index?: any
  ) => any;

  type Column = {
    label?: string;
    prop: string;
    width?: string | number;
    type?: "time";
    dictProp?: string;
    options?: Array<dictItem>;
    hidden?: boolean | undefined;
    query?: {
      comp: any;
      label?: string;
      props: (
        hook: listHook
      ) => {
        onChange: any;
        value: any;
        [key: string]: any;
      };
    };
    edit?: editOption;

    render?: (
      render: (item: any, index?: any) => any,
      rowColumn: Column,
      /**
       * 当前行的数据
       */
      item: any,
      index?: any
    ) => any;
  };
  type makeColumns = (arg0: Column[]) => Column[];
  type editOption = {
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
    props?: (form: any, setForm: any, cur?: any) => any;
    /**
     * 表单项的简单类型可以使用这个
     *
     * @type {('input' | 'radio' | 'select')}
     */
    type?: "input" | "radio" | "select";
    /**
     * 表单项的中文标签
     *
     * @type {string}
     */
    label?: string;

    /**
     * 表单项使用的组件，优先使用这个字段，没有这个字段则使用type字段
     *
     * @type {*}
     */
    comp?: any;

    /**
     * 表单项的prop
     *
     * @type {string}
     */
    prop?: string;
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
    query?: {
      request?: Object;
      [key: string]: any;
    };
  }

  interface ListOptions {
    columns: Column[];
    pageSize?: number;
    loadMethod: (p: queryParams) => Promise<{ items: any[]; count: number }>;
    beforeDelete: any;
  }
  interface listProp {
    queryAction?: any[];
    hook: listHook;
    renderHandle?: (args: any) => any;
    renderTitle?: () => JSX.Element;
    renderGap?: () => JSX.Element;
    onSelectChange?: (selection: any) => void;
    /**
     * 表格高度固定
     */
    fixed?: boolean;
    /**
     * 填充queryBay的留白
     */
    filled?: boolean;
    noQuery?: boolean;
  }
  interface formProp {
    hook: listHook;
    ref?: any;
    formRef: any;
  }
  type liveColumn = {
    columns: Array<
      Column & {
        render: (item: any, index?: any) => any;
      }
    >;
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

  export const BaseList: React.ComponentType<listProp>;
  export const BaseForm: React.ComponentType<listProp>;

  export const cName: string;

  interface Utils {
    makeTime: (val: any, needTime?: boolean) => string;
  }
  export const utils: Utils;

  export const useListHook: (op: ListOptions) => listHook;
}
