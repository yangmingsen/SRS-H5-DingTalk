<template>
    <div class="my">
        <div class="my-left">未来预定</div>
        <div class="my-right">历史预定</div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "MyReserve"
    }
</script>

<style scoped>
 .my-left {
     width: 56px;
     height: 56px;
     background-color: #73ff42;
 }
    .my-right {
        width: 56px;
        height: 56px;
        background-color: #ff4424;
    }
</style>
