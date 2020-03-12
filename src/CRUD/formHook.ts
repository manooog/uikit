import { UseFormHook, liveFormItem } from "../../types/index";
import { useState } from "react";

const formHook: UseFormHook = (options, getItemOption) => {
  const [form, setForm] = useState<any>({});

  const formItems: { [key: string]: liveFormItem } = {};

  for (const c of options.columns) {
    const _formOption = getItemOption(c);
    if (_formOption) {
      // 存在对应的表单项
      const userProps = _formOption.props
        ? _formOption.props(form, setForm)
        : {};
      formItems[c.prop] = {
        label: _formOption.label || c.label,
        comp: _formOption.comp,
        props: () => {
          return {
            /**
             * 2020.2.27
             * 如果仅作展示的话，没有值的时候则展示默认值
             */
            value: userProps.plaintext ? form[c.prop] || "--" : form[c.prop],
            onChange: (e: string) => setForm({ ...form, [c.prop]: e }),
            /**
             * value以及onChange均可被覆盖
             */

            ...userProps
          };
        },
        cloumn: c
      };
    }
  }

  return { form, setForm, formItems };
};

export default formHook;
