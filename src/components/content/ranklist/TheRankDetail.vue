<template>
  <div class="rk-detail">
    <div class="base-info">
      
      <!-- 图片 -->
      <div class="img">
        <img :src="baseinfo.img" alt="">
      </div>
      <!-- 基本信息 -->
      <div class="info">
        <h3 class="title">
          <!-- 一些装饰 -->
          <slot name="tip"></slot>
          {{baseinfo.name}}
        </h3>
        <div class="description">
          <slot name="description">
            {{baseinfo.description}}
          </slot>
        </div>
        <div class="btns">
          <a href="javascript:;" class="btn b-button b-line" @click="plyAlb"><i class="b-button b-i"><em class="b-button b-ply"></em>播放</i> </a>
          <a href="javascript:;" class="btn">收藏<i>({{baseinfo.subscribedCount}})</i></a>
          <a href="javascript:;" class="btn">分享<i>({{baseinfo.shareCount}})</i></a>
          <a href="javascript:;" class="btn">下载</a>
          <a href="javascript:;" class="btn">评论数<i>({{baseinfo.commentCount}})</i></a>
        </div>
        <slot name="others"></slot>
      </div>
    </div>
    <!-- 歌曲列表头部 -->
    <div class="m-title">
      <p class="tt">歌曲列表
        <span class="sub">{{baseinfo.trackCount}}首歌</span>
        <span class="plyCount">播放：<strong class="st">{{baseinfo.playCount}}</strong>次</span>
      </p>
      
    </div>
    <rank-musics
      :rk_musics='rk_musics'
    ></rank-musics>
  </div>
</template>
<script>
import RankMusics from './rankdetail/RankMusicsList'
import {throttle} from 'assets/Tools.js'
import {_getMusicListDetail} from 'network/detail.js'
export default {
  name: 'rk-detail',
  components:{
    RankMusics
  },
  props:{
    baseinfo:{
      type:Object,
      default:{
        img:'', // 图片
        name:'', // 标题
        description:'', // 描述
        shareCount:0, // 分享数
        playCount:0, // 播放数
        trackCount:0, // 歌曲数
        subscribedCount:0, // 订阅数
        commentCount:0, // 评论数
        updateTime:'',   // 更新时间
        id:0 // 歌单id
      }
    },
    rk_musics:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    // 播放歌单
    plyAlb(){
      console.log('play album');
      // let thGetMusicListDetail = throttle(_getMusicListDetail)
      // 获取歌单歌曲信息
      _getMusicListDetail(this.baseinfo.id).then(res => {
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
  .rk-detail{
    .base-info{
      padding: 40px;
      // display: flex;
      // justify-content: flex-start;
      .img{
        float: left;
        width: 144px;
        height: 144px;
        padding: 2px;
        border: 1px solid rgb(158, 154, 154);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        margin-left: 164px;
        .title{
          text-align: left;
          font-size: 22px;
          font-weight: 500;
          margin: 10px 0 16px 0;
        }
        .description{
          font-size: 14px;
          
          margin: 10px 0 20px 0;
          text-align: left;
        }
        .btns{
          display: flex;
          justify-content: flex-start;
          .b-line{
            width: 66px;
          }
          .b-i{
            display: inline-block;
            padding: 0 7px 0 8px;
            // width: 61px;
          }
          .b-ply{
            // display: inline-block;
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            overflow: hidden;
          }
          .btn{
            display: inline-block;
            margin-right: 10px;
            font-size: 13px;
            height: 31px;
            line-height: 31px;
            // border: 1px rgb(121, 107, 107) gray;
            // border-radius: 3px;
            // padding: 0 8px; 
          }
          
        }
        
      }
    }
    .m-title{
      padding: 0 40px;
      margin-bottom: 5px;
      .tt{
        text-align: left;
        font-size: 20px;
        font-weight: bold;
      }
      .sub,.plyCount{
        font-size: 14px;
        font-weight: lighter;
      }
      .plyCount{
        float: right;
      }
      .st{
        color: $colorA;
      }
    }
  }
</style>