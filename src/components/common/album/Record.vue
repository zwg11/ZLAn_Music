<template>
  <div class="record">
    <div class="pic">
      <img class="rd-p" :src="rdInfo.picUrl" alt="">
      <a href="javascript:;" class="bg msk mska-2" @click="thGetRecord(rdInfo.id)"></a>
      
      <a href="javascript:;" class="icon-play" @click="plyRd(rdInfo.id)"></a>
      
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
import {_getMusicListDetail} from 'network/detail.js'
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
    plyRd(id){
      // 获取歌单歌曲信息
      _getMusicListDetail(id).then(res => {
        // 提取出所有歌的id
        const idList = res.playlist.trackIds.map(val=>{
          // console.log(val);
          return val.id
        })
        // console.log(idList);
        // this.$bus.$emit('toggleList', idList)
        this.$audio.toggleList(idList)
        // console.log('***********');
        // console.log(this.lst);
      }).catch(err=>{
        this.$toast.thShow('warn',err);
      })
    }
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
        display: block;
        
      }
      .bg{
        // left: 0;
        // top: 0;
        // width: 118px;
        // height: 100px;
        // position: absolute;
        // background-image: url('~assets/img/coverall.png');
        // background-position: 0 -570px;
      }
      .icon-play{
        display: none;
        position: absolute;
        right: 5px;
        bottom: 6px;
        width: 22px;
        height: 22px;
        background-position: 0 -85px;
        background-image: url('~assets/img/iconall.png');
        &:hover{
          background-position: 0 -110px;
        }
      }
      &:hover .icon-play{
        display: block;
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