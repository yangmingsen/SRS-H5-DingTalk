import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:sysCode(\\w+)/",
    component: () => import("../views/index"),
    children: [
      {
        name: "home",
        path: "home",
        component: () => import("../views/Home")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/dingtalk/",
  routes
});

export default router;
