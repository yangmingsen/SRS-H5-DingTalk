<template>
    <div class="my">
        <div class="my-top">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content my-top-menu">
                        <div class="my-top-menu-one">未来预定</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content my-top-menu">
                        <div class="my-top-menu-two">历史预定</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-body">
            <div v-if="switchPage == 0" class="my-body-blank"></div>
            <div v-if="switchPage == 1" class="my-body-reserved">
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content my-body-reserved-content-icon">

                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content my-body-reserved-content-right" >
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-floor">
                                            10B 第五层
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24"><div class="grid-content">
                                        <div class="my-body-reserved-content-right-SeatCode">
                                            033号座
                                        </div>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                    </div></el-col>
                                    <el-col :span="8"><div class="grid-content ">
                                        <div class="my-body-reserved-content-right-cancelButton">
                                            取消选定
                                        </div>
                                    </div></el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div v-if="switchPage == 2" class="my-body-history"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyReserve",
        data() {
            return {
                switchPage: 1 //0 未来预定(无数据)空白页, 1 未来预定(有数据)页, 2 历史预定页
            }
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>

    .my {
        .my-body {
            width: 100%;
            height: 530px;
            overflow-y: scroll;
            .my-body-reserved {
                .my-body-reserved-content {
                    border: 1px solid #C3EEF4;
                    border-radius: 10px;
                    margin: 3px 0;

                    .my-body-reserved-content-icon {
                        background-image: url("../assets/images/icon_3 .png");
                        background-repeat: no-repeat;
                        background-size: 62%;
                        height: 5rem;
                        background-position-x: center;
                        background-position-y: 6px;
                    }

                    .my-body-reserved-content-right {
                        text-align: left;
                        padding-left: 9px;


                        .my-body-reserved-content-right-floor {
                            margin-top: 3px;
                            font-size: 1.2rem;
                        }

                        .my-body-reserved-content-right-SeatCode {
                            font-size: 1.8rem;
                            font-weight: bold;
                        }

                        .my-body-reserved-content-right-date {
                            font-size: 0.9rem;
                            padding-top: 3px;
                            color: #4D4D4D;
                        }

                        .my-body-reserved-content-right-cancelButton {
                            border: 1px solid #37C9DA;
                            text-align: center;
                            margin-right: 5px;
                            margin-bottom: 5px;
                            border-radius: 6px;
                            background-color: #37C9DA;
                            color: #ffffff;
                            padding: 2px 0;
                        }

                    }
                }
            }
        }
    }


    .my-top {
        border: 1px solid #E6E6E6;
        height: 4rem;
        margin-left: -4%;
        width: 110%;

        .my-top-menu {
            margin-top: 0.5rem;
            margin-bottom: 7%;
            height: 3rem;
            font-size: 1.3rem;

            .my-top-menu-one {
                background-color: #00AEA9;
                margin-left: 45%;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                padding: 11px 0;
                color: #ffffff;
            }

            .my-top-menu-two {
                background-color: #EAF9FC;
                margin-right: 45%;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                padding: 11px 0;
                color: #00afa5;
            }

        }


    }

</style>
