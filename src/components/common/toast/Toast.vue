<template>
  <div class="toast" v-show="isShow" :class="type">
    <p class="inf" >{{info}}</p>
  </div>
</template>
<script>
import {throttle} from 'assets/Tools'
export default {
  name:'toast',
  data(){
    return{
      info:'提示信息',
      isShow:false,
      type: 'warn'
    }
  },
  methods:{
    // 节流show
    thShow(type, info,time=2000,interval=1000){
      let th = throttle(this.show,interval);
      th(type,info,time)
    },
    show(type, info,time=2000){
      this.info = info;
      this.type = type;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false
      }, time);
    }
  }
}
</script>
<style lang='scss'>
.toast{
  position: fixed;
  top: 10px;
  left: 50%;
  height: 40px;
  min-width: 200px;
  transform: translateX(-50%);
  border-radius: 5px;
  background-color: whitesmoke;
  transition: all .5s linear;
  &.default{
    color: black;
    border: 1px solid #666;
  }
  &.warn{
    color: red;
    border: 1px solid red;
  }
  &.success{
    color: green;
    border: 1px solid greenyellow;
  }
  .inf{
    line-height: 40px;
    text-align: center;

  }

}
</style>