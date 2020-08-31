<template>
  <div class="alb">
    <div class="pic">
      <img :src="albumInfo.picUrl" alt="">
      <a href="javascript:;" class="msk msk-1" @click="thGetDetail(albumInfo.id)"></a>
      <div class="bottom">

        <span class="icon-headset"></span>
        <span class="l-c">{{albumInfo.playCount}}</span>
        <a href="javascript:;" class="icon-play" @click="playAlbum(albumInfo.id)"></a>
      </div>
    </div>
    <p class="describe">
      <!-- <i class="icn" v-if="isIcn"></i> -->
      <slot>

        <a class="dc" href="javascript:;">{{albumInfo.name}}</a>
      </slot>
    </p>
  </div>
</template>
<script>
import {throttle} from 'assets/Tools.js'
import {_getMusicListDetail} from 'network/detail.js'
export default {
  name:'alb-block',
  props:{
    albumInfo:{
      type:Object,
      default(){

        return{
          
        }
      }
    }
  },
  methods:{
    
    getDetail(id){
      console.log('to detail');
      this.$router.push({path:'/discover/playlist/detail', query:{
        id:id
      }})
    },
    thGetDetail(id){
      let thGet = throttle(this.getDetail, 1000);
      thGet(id);
    },
    playAlbum(albId){
      // const th_getMusicListDetail = throttle(_getMusicListDetail);
      // 获取歌单歌曲信息
      _getMusicListDetail(albId).then(res => {
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
  .alb{
    width: 140px;
    .pic{
      height: 140px;
      // background-image: url('~assets/img/coverall.png');
      // background-position: 0 -537px;
      color:#ccc;
      position: relative;
      
      img{
        width: 140px;
        height: 140px;
      }
      .bottom{
        background-image: url('~assets/img/coverall.png');
        background-position: 0 -537px;
        position: absolute;
        bottom: 0;
        height: 27px;
        width: 100%;
      }
    }
    .l-c{
      float: left;
      margin-top: 8px;
    }
    .icon-headset,.icon-play{
      background-image: url('~assets/img/iconall.png');
      display: inline-block;
    }
    .icon-headset{
      width: 14px;
      height: 11px;
      float: left;
      padding-left: 5px;
      line-height: 14px;
      margin: 9px 0 9px 5px;
      background-position: 0 -24px;
    }
    .icon-play{
      position: absolute;
      width: 16px;
      height: 17px;
      right: 10px;
      bottom: 5px;
      background-position: 0 0;
      &:hover{
        background-position: 0 -60px;

      }
    }
    .describe{
      margin: 5px 0 5px 0;
      line-height: 18px;
      text-align: left;
      .dc{
        color: $colorI;
        &:hover{
          text-decoration: underline;
        }
      }
    }

  }
</style>