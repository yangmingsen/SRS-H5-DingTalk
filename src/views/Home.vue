<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png"/>
        <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
        <div class="home-date">
            <div class="home-date-show">{{dateMsg}}</div>
            <div class="show">code={{code}}</div>
            <div class="home-date-choose" @click="dateChoose">选择</div>
        </div>
        <div class="home-seat">
            <div class="home-seat-choose" @click="seatChoose">{{seatMsg}}</div>
        </div>
        <router-view></router-view>
        <Footer></Footer>
    </div>

</template>

<script>
    // @ is an alias to /src
    import Footer from "./Footer";
    import * as dd from 'dingtalk-jsapi';

    export default {
        name: "Home",
        components: {
            Footer
        },
        data() {
            return {
                dateMsg: "2020-05-08",
                seatMsg: "座位所属楼层选择 》",
                code:  ""
            }
        },
        methods: {
            seatChoose() {
                const that = this
                dd.ready(() => {
                    dd.biz.util.chosen({
                        source: [{
                            key: '10B 第五层', //显示文本
                            value: '10b-5' //值，
                        }, {
                            key: '10B 第六层', //显示文本
                            value: '10b-6' //值，
                        }, {
                            key: '10B 第七层', //显示文本
                            value: '10b-7' //值，
                        }, {
                            key: '13B 第五层', //显示文本
                            value: '13b-5' //值，
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

                            that.seatMsg = result.key
                            localStorage.setItem("seatMsg",result)
                            that.$router.push({name: "user-choose"});
                        },
                        onFail: function (err) {
                        }
                    })
                })
            },

            dateChoose() {
                const that = this
                dd.ready(() =>  {
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
                            localStorage.setItem("dateMsg",result.value)
                        },
                        onFail: function (err) {
                        }
                    })
                });
            },

            getUserInfo() {
                const that = this
                dd.ready(() => {
                    dd.runtime.permission.requestAuthCode({
                        corpId: 'dingfeefdd8ead408b2df5bf40eda33b7ba0', // 企业id
                        onSuccess: function (info) {
                            that.code = info.code // 通过该免登授权码可以获取用户身份
                        }});
                })
            }
        },
        mounted() {
            this.getUserInfo();
        }
    };
</script>

<style lang="less" scoped>
    .floor-choose {
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
