<template>
    <div class="footer">
        <el-row>
            <el-col :span="12">
                <div v-if="oneIcon" class="grid-content bg-purple ">
                    <img class="footer-image" src="../assets/images/icon_12.png">
                </div>
                <div v-if="!oneIcon" class="grid-content bg-purple ">
                    <img class="footer-image" src="../assets/images/icon_11.png">
                </div>
                <span>座位预定</span>
            </el-col>
            <el-col :span="12">
                <div v-if="twoIcon" class="grid-content bg-purple-light ">
                    <img class="footer-image" src="../assets/images/icon_4.png">
                </div>
                <div v-if="!twoIcon" class="grid-content bg-purple-light ">
                    <img class="footer-image" src="../assets/images/icon_5.png">
                </div>
                <span>我的预定</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Footer",

        data() {
            return {
                oneIcon: true,
                twoIcon: true
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

    .footer {
        color: #00afa5;
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-top: 1px solid #eee;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
    }

    .footer-image {
        width: 22px;
    }

</style>
