<template>
  <div id="app">
    <div class="content">
      <chatroom-com :currentUser="currentUser"></chatroom-com>
      <userlist-com :userlist="userlist" @chooseUser='toggleUser'></userlist-com>
    </div>
  </div>
</template>

<script>
import chatroomCom from './components/chatroom.vue'
import userlistCom from './components/userlist.vue'

export default {
  name: 'App',
  components: {
    chatroomCom, userlistCom
  },
  data(){
    return {
      msg:'Wechat',
      userlist:[
        {
          username:'小明',
          headerimg:require('./assets/img/1.jpg')
        },
        {
          username:'小皮',
          headerimg:require('./assets/img/2.jpg')
        },
        {
          username:'小黑',
          headerimg:require('./assets/img/3.jpg')
        },
        {
          username:'小绿',
          headerimg:require('./assets/img/4.jpg')
        },
        {
          username:'班长',
          headerimg:require('./assets/img/5.jpg')
        }
      ],
      currentUser:{
        username:'小明',
        headerimg:require('./assets/img/1.jpg')
      }
    }
  },
  methods:{
    toggleUser:function(index){
      this.currentUser = this.userlist[index];
    }
  }
}
</script>

<style scoped>
  .content{
    display: flex;
    width: 800px;
    height: 700px;
    margin: 20px auto;
  }
</style>
