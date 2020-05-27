<template>
    <div class="footer">
        <el-row>
            <el-col :span="12">
                <a @click="goToHome">
                    <div v-if="oneIcon == true" class="grid-content bg-purple ">
                        <img class="footer-image" src="../assets/images/icon_12.png">
                    </div>
                    <div v-if="oneIcon == false" class="grid-content bg-purple ">
                        <img class="footer-image" src="../assets/images/icon_11.png">
                    </div>
                    <span>座位预定</span>
                </a>
            </el-col>
            <el-col :span="12">
                <a @click="goToMy">
                    <div v-if="twoIcon == true" class="grid-content bg-purple-light ">
                        <img class="footer-image" src="../assets/images/icon_5.png">
                    </div>
                    <div v-if="twoIcon == false" class="grid-content bg-purple-light ">
                        <img class="footer-image" src="../assets/images/icon_4.png">
                    </div>
                    <span>我的预定</span>
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import router from "../router"
    import {ddAPI} from "../api/ddAPI";
    export default {
        name: "Footer",
        data() {
            return {
                oneIcon: true,
                twoIcon: false
            }
        },
        methods: {
            goToHome() {
                router.push({name: 'home'})

            },
            goToMy() {
                router.push({name: 'my-reserve'})
            },
            iconOne() {
                //切换图标
                this.oneIcon = true;
                this.twoIcon = false;
            },

            iconTwo() {
                // 切换图标
                this.oneIcon = false;
                this.twoIcon = true;
            }



        },
        watch: {
            $route(to,from){
                let path = to.path;
                if (path.includes("my-reserve")) {
                    this.iconTwo();
                } else {
                    this.iconOne();
                    ddAPI.disablePullToRefresh();
                }
            }
        }
    }
</script>

<style scoped>

    .footer {
        color: #00afa5;
        position: fixed;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid #eee;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
        background-color: #fff;
        height: 3rem;
    }

    .footer-image {
        width: 22px;
    }

</style>
