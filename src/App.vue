<template>
  <div id="app">
    <router-view />
    <!-- loading 遮罩层 -->
    <transition name="el-fade-in">
      <div class="loading-modal" v-show="loading" />
    </transition>
    <!-- loading 加载动画 -->
    <transition name="el-fade-in">
      <div class="gloadingbar" v-show="loading">
        <div class="loader">
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__ball"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ApiExample } from "./api/example";
export default {
  computed: {
    ...mapGetters(["loading"])
  },
  mounted() {
    ApiExample.list({});
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
