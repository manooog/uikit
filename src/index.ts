/// <reference types="../types/index" />

import { makeTime } from "./CRUD/common/baseFunction";
import { cName } from "./utils";

export { default as useListHook } from "./CRUD/listHook";
export { default as useFormHook } from "./CRUD/formHook";

export const utils = { makeTime, cName };
