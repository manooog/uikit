import { MenuItemProps, MenuSourceProps } from "../../../types/UI";
import React, { useContext } from "react";
import { cName } from "../../utils";
import { Ctx } from "./menu";
import "./styles/menuItem.less";

const c = cName("menu_item");

const canSeeMenu = (v: MenuSourceProps): boolean => {
  let flag = true;
  if (typeof v.visible === "function") {
    flag = v.visible();
  } else if (v.visible === undefined) {
    flag = true;
  } else {
    flag = !!v.visible;
  }

  return flag;
};

const MenuItem: React.FC<MenuItemProps> = props => {
  let { isSub, onClick, preKey } = props;
  let { icon, name, expend, key, redirect } = props.source;

  const hasChildren =
    props.source?.subs?.length > 0 &&
    props.source.subs.filter(canSeeMenu).length > 0;

  const ctx = useContext(Ctx);

  let active = false;

  const pos = ctx.key
    .replace(/^\//, "")
    .split("/")
    .indexOf(key);

  switch (pos) {
    case 0:
      if (ctx.key.length > key.length) {
        active = hasChildren ? false : true;
      } else {
        active = true;
      }
      break;

    case -1:
      break;

    default:
      active = true;
      break;
  }

  props.source.combineKey = redirect
    ? redirect
    : (preKey + "/" + key).replace(/^\//, "");

  return (
    <>
      <div
        className={
          c()
            .m("active", active)
            .m("expend", expend)
            .m("not_level_one", isSub).v
        }
        onClick={() => onClick(props.source)}
      >
        {icon && (
          <div
            className={c("icon").v}
            style={{ backgroundImage: `url(${icon})` }}
          ></div>
        )}
        <div className={c("label").v}>{name}</div>
        {hasChildren && <div className={c("angle").v}></div>}
        {active && <div className={c("mark").v}></div>}
      </div>
      {hasChildren &&
        expend &&
        props.source.subs.map(_val => (
          <MenuItem
            preKey={preKey + "/" + key}
            onClick={() => {
              onClick(_val);
            }}
            source={_val}
            {..._val}
            isSub
            key={_val.key}
          />
        ))}
    </>
  );
};
export default MenuItem;
