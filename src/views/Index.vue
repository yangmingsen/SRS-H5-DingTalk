<template>
<!--    <div class="main">-->
<!--        <router-view></router-view>-->
<!--        <Footer></Footer>-->
<!--    </div>-->
<div>
    <div class="main">
        <div>code={{code}}</div>
        <router-view></router-view>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
    import Footer from "./Footer";
    import * as dd from "dingtalk-jsapi";
    import {ApiExample} from "../api/example";
    import router from "../router";
    export default {
        name: "Index",
        components: {
            Footer
        },
        data() {
            return {
                code: ""
            }
        },
        methods: {
        },
        mounted() {
            const that = this;


            // dd.ready(() => {
            //     dd.runtime.permission.requestAuthCode({
            //         corpId: 'dingfeefdd8ead408b2df5bf40eda33b7ba0', // 企业id
            //         onSuccess: async function (info) {
            //             that.code = info.code; // 通过该免登授权码可以获取用户身份
            //         }
            //     });
            // })

        }
    }
</script>

<style scoped>

    .main {
        position: relative;
        padding: 0 2%;
    }

    @media screen and (min-width: 992px) {
        .main {
            padding: 0 1%;
        }
    }
</style>
