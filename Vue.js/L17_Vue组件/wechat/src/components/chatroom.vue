<template>
    <div class='chatroot'>
        <h1>用户：{{currentUser.username}}</h1>
        <!-- 聊天列表 -->
        <div class="chatlist">
            <chatitem-com v-for="(item, index) in chatList" :key='index' :chatitem='item'>
                <!-- 使用插槽 -->
                {{item.chatcontent}}
            </chatitem-com>
        </div>
        <!-- 这里使用父传子方法 -->
        <chatinput-com :sendEvt='sendEvt'></chatinput-com>
    </div>
</template>

<script>
import chatinputCom from './chatinput.vue'
import chatitemCom from './chatitem.vue'

export default {
    data(){
        return {
            chatList:[
                {
                    user:{
                        username:'小明',
                        headerimg:require('../assets/img/1.jpg')
                    },
                    chatcontent:'你好'
                }
            ]
        }
    },
    props:['currentUser'],
    components:{
        chatinputCom,chatitemCom
    },
    methods:{
        sendEvt:function(value){
            this.chatList.push({
                user:{
                    username:'小明',
                    headerimg:require('../assets/img/1.jpg')
                },
                chatcontent:value
            });
            this.chatList.push({
                user:this.$root.$children[0].currentUser,
                chatcontent:new Date()
            });
        }
    }
}
</script>

<style scoped>
    h1{
        font-size: 30px;
        margin: 0 auto;
        text-align: center;
    }
    .chatroot{
        width: 500px;
        height: 700px;
        border: 1px solid #ccc;
    }
</style>