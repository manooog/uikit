export type MenuProps = {
  data: Array<MenuSourceProps>;
  routeKey: string;
  onKeyChange?: (key: string) => void;
};

declare const Menu: React.ComponentType<MenuProps>;

export type MenuSourceProps = {
  name: string | React.ComponentType;
  icon?: string;
  key: string;
  subs?: Array<MenuSourceProps>;
  visible?: any;
};

export type DynamicMenuProps = MenuSourceProps & {
  expend?: boolean;
  subs?: Array<DynamicMenuProps>;
  combineKey?: string;
};

export type MenuItemProps = {
  isSub?: boolean;
  onClick?: (item: DynamicMenuProps) => void;
  source: DynamicMenuProps;
  preKey?: string;
};

export default Menu;
