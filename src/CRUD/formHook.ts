import { UseFormHook, liveFormItem } from "fcbox-uikit";
import { useState } from "react";

const formHook: UseFormHook = (options, getItemOption) => {
  const [form, setForm] = useState<any>({});

  const formItems: { [key: string]: liveFormItem } = {};

  for (const c of options.columns) {
    const _formOption = getItemOption(c);
    if (_formOption) {
      // 存在对应的表单项
      formItems[c.prop] = {
        label: _formOption.label || c.label,
        comp: _formOption.comp,
        props: () => {
          return {
            value: form[c.prop],
            onChange: (e: string) => setForm({ ...form, [c.prop]: e }),
            /**
             * value以及onChange均可被覆盖
             */

            ...(_formOption.props && _formOption.props(form, setForm))
          };
        },
        cloumn: c
      };
    }
  }

  return [form, setForm, formItems];
};

export default formHook;
