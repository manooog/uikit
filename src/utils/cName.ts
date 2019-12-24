/**
 *
 * var c = cName('test')
 * c().v => test
 * c('b').v => test-b
 * c('b').m('active').v => test-b test-b--active
 * c('b').m('active').m('disabled').v => test-b test-b--active test-b--disabled
 */

export const cName = (pre: string) => {
  const add = function(
    this: { v: string; combineVal: string[] },
    str: string = "",
    septor: string = "-"
  ) {
    let val: string;

    if (septor === "-") {
      val = pre + (str ? septor + str : "");
      this.v = val;
      this.combineVal.push(val);
    } else if (septor === "--") {
      if (str) this.combineVal.push(this.v + septor + str);
    }

    return {
      m: (str?: string, flag: Function | boolean = true) => {
        if (typeof flag === "function") {
          flag = !!flag();
        }
        return add.call(this, flag ? str : "", "--");
      },
      v: this.combineVal.join(" ")
    };
  };

  return (str: string = "") => {
    const obj = {
      v: "",
      combineVal: []
    };
    return add.call(obj, str);
  };
};
