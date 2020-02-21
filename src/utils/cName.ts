import { uipre } from "../var/const";

type modifier = (str?: string, flag?: Function | boolean) => result;

type result = {
  v: string;
  m: modifier;
};

type thisObj = { v: string; combineVal: string[] };

type addFun = (this: thisObj, str: string, septor: string) => result;

type cName = (p: string) => (s?: string) => result;

/**
 * # 定义bem中的b
 * var c = cName('test')
 * c().v => test
 * # 定义bem中的e
 * c('b').v => test-b
 * c('b').m('active').v => test-b test-b--active
 * # 如果bem任一部分过长，则需要使用下划线来隔断
 * c('b').m('active').m('x_disabled').v => test-b test-b--active test-b--x_disabled
 *
 */

export const cName: cName = pre => {
  pre = uipre + "_" + pre;
  /**
   * 追加className
   * @param str 需要添加上去的字符串
   * @param septor 默认为‘-’，也就是定义e部分
   */
  const add: addFun = function(str = "", septor = "-") {
    let val: string;

    if (septor === "-") {
      val = pre + (str ? septor + str : "");
      this.v = val;
      this.combineVal.push(val);
    } else if (septor === "--") {
      if (str) this.combineVal.push(this.v + septor + str);
    }
    const that = this;
    return {
      m: function(str) {
        let flag: boolean | Function = true;

        if (arguments.length > 1) flag = arguments[1];

        if (typeof flag === "function") {
          flag = !!flag();
        }

        return add.call(that, flag ? str : "", "--");
      },
      v: this.combineVal.join(" ")
    };
  };

  return (str = "") => {
    const obj: thisObj = {
      v: "",
      combineVal: []
    };
    return add.call(obj, str);
  };
};
