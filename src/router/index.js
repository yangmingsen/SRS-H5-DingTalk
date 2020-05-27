import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:sysCode(\\w+)/",
    component: () => import("../views/Index"),
    redirect: "home",
    children: [
      {
        // path: "",
        name: "home",
        path: "",
        component: () => import("../views/Home")
        // redirect: {name: "default-blank"},
        // children: [
        //   {
        //     name: "default-blank",
        //     path: "default-blank",
        //     component: () => import("../components/DefaultBlank")
        //   },
        //   {
        //     name: "user-choose",
        //     path: "user-choose",
        //     component: () => import("../components/UserChoose")
        //   }
        // ]
      },
      {
        name: "login",
        path: "login",
        component: () => import("../views/Login")
      },
      {
        name: "my-reserve",
        path: "my-reserve",
        component: () => import("../views/MyReserve")
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
