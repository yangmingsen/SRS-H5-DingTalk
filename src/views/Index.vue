<template>
<!--    <div class="main">-->
<!--        <router-view></router-view>-->
<!--        <Footer></Footer>-->
<!--    </div>-->
<div>
    <div class="main">
        <router-view></router-view>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
    import Footer from "./Footer";
    export default {
        name: "Index",
        components: {
            Footer
        },
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {

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
