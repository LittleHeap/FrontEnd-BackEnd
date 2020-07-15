<template>
    <div class="userlist">
        <h1>用户列表</h1>
        <ul>
            <li v-for="(item, index) in userlist" :key="index" @click='chooseUser(index)'>
                <img :src="item.headerimg" alt="">
                <h3>{{item.username}}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    props:['userlist'],
    methods:{
        chooseUser:function(index){
            // 将选择用户的事件触发发送给到父元素
            this.$emit('chooseUser', index);
            console.log(index);
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

    .userlist{
        width: 300px;
        height: 700px;
        background: skyblue;
    }

    .userlist ul li{
        display: flex;
    }

    .userlist ul li img{
        width: 80px;
        height: 80px;
    }
</style>