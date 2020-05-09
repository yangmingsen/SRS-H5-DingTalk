<template>
    <div class="describe">
        1.可选 2.已选 3.当前选中

        <div class="c-1">可选</div>
        <div class="c-2" @click="showC2">已选</div>
        <div class="c-3" @click="showC3">选中</div>

        这是用户选择主页
    </div>
</template>

<script>
    import * as dd from 'dingtalk-jsapi';
    export default {
        name: "UserChoose",
        data() {
            return {

            }
        },
        methods: {
            showC2() {
                const that = this;
                dd.ready( () => {
                    dd.device.notification.alert({
                        message: "H033-杨铭森-流程IT",
                        title: "提示",//可传空
                        buttonName: "确定",
                        onSuccess : function() {
                            //onSuccess将在点击button之后回调
                            /*回调*/
                        },
                        onFail : function(err) {}
                    });
                });
            },
            showC3() {
                const that = this;
                dd.ready(() => {
                    dd.biz.util.multiSelect({
                        options:['选项1', '选项2', '选项3', '选项4'],
                        selectOption:['选项3'],
                        onSuccess : function(result) {
                            /* 返回用户选中的index数组，从0开始。 例如
                                 [ 2, 3 ]
                            */
                        },
                        onFail : function() {}
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .describe  {
        height: 300px;
        width: 100%;
        background-color: #d3f3ff;
        text-align: center;
    }
    .c-1 {
        height: 20px;
        width: 30px;
        background-color: #23fff5;
    }
    .c-2 {
        height: 20px;
        width: 30px;
        background-color: #ff90a3;
    }
    .c-3 {
        height: 20px;
        width: 30px;
        background-color: #f8ff6d;
    }
</style>
