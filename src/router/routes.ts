import { RouteRecordRaw } from "vue-router";
import { generateRoutes, processRoutes, genSidersMenus } from "./utils";

export * from "./utils";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
      icon: "home",
      disabled: false,
      hidden: false,
    },
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/hosts",
    name: "Hosts",
    meta: {
      title: "Hosts 管理",
      icon: "logo-header",
      disabled: false,
      hidden: false,
    },
    redirect: "/hosts/list",
    children: [
      {
        path: "/list",
        name: "List",
        meta: {
          title: "TTTTT",
          disabled: false,
          hidden: false,
          icon: "about",
        },
        component: () => import("@/pages/about/index.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于",
      disabled: false,
      icon: "about",
      hidden: false,
    },
    component: () => import("@/pages/about/index.vue"),
  },
  {
    path: "/error",
    name: "Error",
    meta: {
      title: "异常页面",
      icon: "local_fire_department",
      hidden: true,
    },
    children: [
      {
        path: "/404",
        name: "404",
        meta: {
          title: "404 - NotFound",
          hidden: true,
        },
        component: () => import("@/pages/404/404.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      hidden: true,
    },
    redirect: "/error/404",
  },
];

export const defaultRoute = "Home";

export const menus = genSidersMenus(routes);

const routeList = processRoutes(routes).filter(
  (item) => !!item.path || !!item.children?.length || !!item.redirect,
);

export default generateRoutes(routeList);
