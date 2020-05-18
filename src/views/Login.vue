<template>
</template>

<script>
    // @ is an alias to /src
    import router from "../router";
    import {ddAPI} from "../api/ddAPI";

    export default {
        name: "Login",
        components: {},
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
            let returnUrl = this.$route.query.returnurl
            ddAPI.loginAuth(returnUrl);
        }
    };
</script>

<style lang="less" scoped>
</style>
