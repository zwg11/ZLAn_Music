<template>
  <div class="record">
    <div class="pic">
      <img class="rd-p" :src="rdInfo.picUrl" alt="">
      <a href="javascript:;" class="bg" @click="thGetDetail(rdInfo.id)"></a>
      
      <a href="javascript:;" class="icon-play"></a>
      
    </div>
    <p class="name f-thide">
      <!-- <i class="icn" v-if="isIcn"></i> -->
      <a class="inf" href="javascript:;">{{rdInfo.name}}</a>
    </p>
    <p class="by f-thide">
      <a class="inf" href="javascript:;">{{rdInfo.artist.name}}</a>
    </p>
  </div>
</template>
<script>
import {throttle} from 'assets/Tools.js'
export default {
  name:'record',
  props:{
    rdInfo:{
      type:Object,
      default(){

        return{
          
        }
      }
    }
  },
  methods:{
    
    getRecord(id){
      console.log('to record');
      this.$router.push({path:'/discover/album', query:{
        id:id
      }})
    },
    thGetRecord(id){
      let thGet = throttle(this.getRecord, 1000);
      thGet(id);
    },
  }
}
</script>
<style lang="scss">
@import 'assets/css/config.scss';
@import 'assets/css/base.scss';
  .record{
    width: 100px;
    flex: 1;
    // height: 100px;
    .pic{
      position: relative;
      .rd-p{
        width: 100%;
        height: 100%;
      }
      .bg, .icon-play{
        position: absolute;
        display: block;
        
      }
      .bg{
        left: 0;
        top: 0;
        width: 118px;
        height: 100px;
        position: absolute;
        background-image: url('~assets/img/coverall.png');
        background-position: 0 -570px;
      }
      .icon-play{
        right: 10px;
        bottom: 5px;
        width: 22px;
        height: 22px;
        background-position: 0 -110px;
        background-image: url('~assets/img/iconall.png');
      }
    }
    .name,.by {
      max-width: 100%;
      text-align: left;

      .inf{
        color: black;
      }
    }
    
  }
</style>