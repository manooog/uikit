import { MenuProps, DynamicMenuProps } from "../../../types/UI";
import React, { useState, createContext, useEffect } from "react";
import { cName } from "../../utils";
import MenuItem from "./menuItem";
import "./styles/menu.less";

const c = cName("menu");

export const Ctx = createContext({ key: "", iconScale: 1 });

const Menu: React.FunctionComponent<MenuProps> = ({
  data,
  routeKey,
  onKeyChange,
  style,
  iconScale
}) => {
  iconScale = iconScale || 1;
  const [menus, setMenus] = useState<Array<DynamicMenuProps>>(data);
  const [activeKey, setActiveKey] = useState<string>(routeKey);

  const renderMenus = (menus || []).map(val => {
    val.expend = val.expend || false;

    const onItemClick = (item: DynamicMenuProps) => {
      setActiveKey(() => {
        onKeyChange && onKeyChange(item.combineKey);
        return item.combineKey;
      });

      if (item?.subs?.length > 0) {
        item.expend = !item.expend;
      }
      setMenus(() => menus.concat([]));
    };

    return (
      <MenuItem
        preKey=""
        source={val}
        onClick={onItemClick}
        {...val}
        key={val.key}
      />
    );
  });

  useEffect(() => {
    setMenus(() => data);
  }, [data]);

  useEffect(() => {
    setActiveKey(() => routeKey);
  }, [routeKey]);

  return (
    <Ctx.Provider value={{ key: activeKey || routeKey || "", iconScale }}>
      <div style={style} className={c().v}>
        {renderMenus}
      </div>
    </Ctx.Provider>
  );
};

export default Menu;
