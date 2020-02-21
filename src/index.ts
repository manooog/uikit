import { makeTime } from "./CRUD/common/baseFunction";
import { cName } from "./utils";

export { default as useListHook } from "./CRUD/listHook";
export { default as useFormHook } from "./CRUD/formHook";

//UI

export { default as Menu } from "./UI/Menu";

//utils
export const utils = { makeTime, cName };
