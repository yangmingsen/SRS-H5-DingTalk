<template>
    <div class="home">
        <div class="filterarea">
            <div class="filterarea-date" @click="dateChoose">
                <el-input
                        suffix-icon="el-icon-date"
                        :readonly=true
                        v-model="dateMsg"
                        class="filterarea-date-input">
                </el-input>
            </div>
            <div class="filterarea-floor" @click="seatChoose">
                <el-input
                        suffix-icon="el-icon-caret-right"
                        :readonly=true
                        v-model="floorMsg"
                        class="filterarea-floor-input">
                </el-input>
            </div>
        </div>
        <div class="blankarea" v-show="isShowData">
            <img class="blankarea-img" src="../assets/images/bg_noData_chf.png">
            <div class="txt-empty">
                <div class="nodata">暂无数据</div>
                <div class="hintchoosefloor">请先选择您工作的楼层</div>
            </div>
        </div>
        <div class="choosearea" v-show="!isShowData">
            <div class="choosearea-10B5" v-show="floorSelect==1">10b5</div>
            <div class="choosearea-10B6" v-show="floorSelect==2">10b6</div>
            <div class="choosearea-10B7" v-show="floorSelect==3">10b7</div>
            <div class="choosearea-13B5" v-show="floorSelect==4">13b5</div>
        </div>
    </div>

</template>

<script>
    // @ is an alias to /src
    import * as dd from 'dingtalk-jsapi';
    import {ApiExample} from "../api/example"
    export default {
        name: "Home",
        components: {},
        data() {
            return {
                dateMsg: "2020-05-12",
                floorMsg: "座位所属楼层",
                isShowData: true, // true=用户没有选择楼层(默认),   false 用户选择了楼层
                floorSelect: 1 //1=10b5, 2=10b6, 3=10b7, 4=13b5
            }
        },
        methods: {
            seatChoose() {
                const that = this
                dd.ready(() => {
                    dd.biz.util.chosen({
                        source: [{
                            key: '10B 第五层', //显示文本
                            value: 1 //值，
                        }, {
                            key: '10B 第六层', //显示文本
                            value: 2 //值，
                        }, {
                            key: '10B 第七层', //显示文本
                            value: 3 //值，
                        }, {
                            key: '13B 第五层', //显示文本
                            value: 4 //值，
                        }],
                        selectedKey: '10B 第五层', // 默认选中的key
                        onSuccess: function (result) {
                            //onSuccess将在点击完成之后回调
                            /*
                            {
                                key: '选项2',
                                value: '234'
                            }
                            */
                            that.isShowData = false; //取消默认空白页
                            that.floorMsg = result.key;
                            // that.$router.push({name: "user-choose"});
                            that.floorSelect = result.value

                        },
                        onFail: function (err) {
                        }
                    })
                })
            },

            dateChoose() {
                const that = this;
                dd.ready(() => {
                    dd.biz.util.datepicker({
                        format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
                        value: that.dateMsg, //默认显示日期
                        onSuccess: function (result) {
                            //onSuccess将在点击完成之后回调
                            /*{
                                value: "2015-02-10"
                            }
                            */
                            that.dateMsg = result.value
                        },
                        onFail: function (err) {
                        }
                    })
                });
            }
        },
        mounted() {
            // if($route) {
            //     //this.isShowData = true
            //     //从后端查询座位信息，然后显示座位图
            // }
        }
    };
</script>

<style lang="less" scoped>

    //日期选择div
    .filterarea-date-input {
        font-size: 1rem;
        margin-top:0.8rem;
    }

    .filterarea-date-input /deep/ .el-input__inner {
        border: 1px solid #C3EFF4;
        color: #00afa5;
        border-radius: 10px;
    }

    //上图标
    .filterarea-date-input /deep/ .el-input__suffix {
        color: #00afa5;
        font-size: 1.2rem;
    }

    //楼层选择div
    .filterarea-floor-input {
        font-size: 1rem;
        margin-top:0.8rem;
    }
    .filterarea-floor-input /deep/ .el-input__inner {
        background-color: #E1F7F9;
        color: #00afa5;
        border: 1px solid #E1F7F9;
        border-radius: 10px;
    }
    //下图标
    .filterarea-floor-input  /deep/ .el-input__suffix {
        color: #00afa5;
        font-size: 1.2rem;
    }

    @media screen and (max-width: 992px) {
        .filterarea-date-input {
            margin-top: 0.6rem;
        }
        .filterarea-floor-input {
            margin-top: 0.6rem;
        }
    }

    //吉祥物配置
    .blankarea-img {
        margin-top: 8rem;
        width: 10rem;
    }

    .nodata {
        font-weight: bold;
    }

    .hintchoosefloor {
        margin-top: 0.6rem;
        color: #9a9a9a;
    }



</style>
