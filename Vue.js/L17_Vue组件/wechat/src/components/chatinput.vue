<template>
    <div>
        <input type="text" @keydown.enter="send" v-model="inputContent">
        <button @click='send'>Send</button>
    </div>
</template>

<script>
export default {
    props:['sendEvt'],
    data(){
        return{
            inputContent:''
        }
    },
    methods:{
        send:function(){
            // 子类调用父类传进来的函数
            this.sendEvt(this.inputContent);
            // 清空输入框
            this.inputContent = '';
        }
    }
}
</script>