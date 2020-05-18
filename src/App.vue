<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {ddAPI} from "./api/ddAPI";
import {ApiExample} from "./api/example";
import router from "./router";
export default {
  computed: {
    ...mapGetters(["loading"])
  },
  mounted() {
    localStorage.setItem("isLogin",0); //是否登录 0=未登录，1=登录
    //localStorage.setItem("loginNum",0); //0表示第一次尝试登录，最大尝试登陆次数为2, 超多2退出app

    let isLogin = localStorage.getItem("isLogin");
    if (isLogin == 0) {
     // router.push({ name: 'login', query: { returnurl: router.history.current.fullPath }})
     // router.push({ name: 'login', query: { returnurl: "home" }})
    }

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
