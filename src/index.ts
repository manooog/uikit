/// <reference types="../types/index" />

import { makeTime } from "./CRUD/common/baseFunction";

export { default as useListHook } from "./CRUD/listHook";
export { default as useFormHook } from "./CRUD/formHook";
export { cName } from "./utils";

export const utils = { makeTime };
