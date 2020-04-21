import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../views/home")
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/about")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
