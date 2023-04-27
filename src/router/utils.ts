import { h } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { type MenuOption } from "naive-ui";
import { Home } from "@vicons/ionicons5";
import { getType } from "@/utils";
import SvgIcon from "@/components/svg.vue";

export const processRoutes = (routes: RouteRecordRaw[], parentPath = "") => {
  return routes.map((route) => {
    const _route = Object.assign({}, route);
    const { children, path, meta = {} } = _route;
    _route.path = parentPath + path;
    _route.meta = meta;
    if (children && children.length) {
      _route.children = processRoutes(children, _route.path);
    } else {
      delete _route.children;
    }
    return _route;
  });
};

export const genSidersMenus = (
  routes: RouteRecordRaw[],
  parent?: RouteRecordRaw,
): MenuOption[] => {
  return routes.map((route) => {
    const menu = {
      label: route.meta?.title,
      key: route.name,
      path: (parent ? parent.path : "") + route.path,
      disabled: route.meta?.disabled,
      icon: () => {
        const data = getType(route.meta?.icon);
        if (data === "string") {
          return h(SvgIcon, { name: route.meta?.icon as string, size: "16px" });
        }

        // @ts-ignore
        if (data === "object" && route.meta.icon.render) {
          return h((route.meta?.icon as typeof Home) || Home);
        }
      },
      show: !route.meta?.hidden,
    } as MenuOption;

    if (route.children && route.children.length > 0) {
      menu.children = genSidersMenus(route.children, route);
      menu.path = "";
      menu.key = "";
    }

    return menu;
  });
};

export const generateRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const _routes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const { children, component, redirect } = route;

    if (children) {
      _routes.push(...generateRoutes(children));
    } else if (component) {
      const _route = Object.assign({}, route);
      delete _route.children;
      _routes.push(_route);
    } else if (redirect) {
      _routes.push(route);
    } else {
      // 无效路由
      if (!route.meta?.link) {
        console.log("该路由无效：", route);
      }
    }
  });

  return _routes;
};
