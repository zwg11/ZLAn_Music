<template>
  <div class="m-detail">
    <table class="m-table">
        <thead>
          <tr>
            <th class="rk-num"></th>
            <th class="rk-name">标题</th>
            <th class="rk-time">时长</th>
            <th class="rk-artist">歌手</th>
          </tr>
        </thead>
        <tbody>
          <tr class="m-detail" 
            v-for="(music,index) in rk_musics" 
            :key="index" 
            :class="{'top':index<3}"
          >
            <td class="rk-num rk">{{index+1}}</td>
            <td class="rk-name m-title">
              <div class="tn clearfix">

              </div>
                <a href="javascript:;" class="m-pic" v-show="index<3">
                  <img :src="music.pic" alt="" class="pic">
                </a>
                <span class="ply" @click="plyM(music.id)">&nbsp;</span>
                <a class="m-name a-hover">
                  {{music.name}}
                </a>
            </td>
            <td class="rk-time m-time">
              <span class="show">
                {{music.time}}
              </span>
              <div class="opt hshow">
                <a href="javascript:;" class="add u-icn" title="添加至播放列表" @click="addM(music.id)"></a>
                <a href="javascript:;" class="fav icn" title="收藏"></a>
                <a href="javascript:;" class="share icn" title="分享"></a>
                <a href="javascript:;" class="download icn" title="下载"></a>
              </div>
              </td>
            <td class="rk-artist m-artist">
              <a href="" class="a-hover">{{music.song}}</a>
              </td>
          </tr>
          <!-- constructor(songs){
        this.id=songs[0].id;
        this.name=songs[0].name;
        this.album=songs[0].al.name;
        this.song=songs[0].ar[0].name;
        this.pic=songs[0].al.picUrl;
        this.time=formatSecond(songs[0].dt)
    } -->
        </tbody>
      </table>
  </div>
</template>
<script>
export default {
  name:'rk-detail',
  props:{
    musicsDetail:{
      type:Object,
      default(){
        return{

        }
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
    plyM(id){
      this.$audio.playAMusic(id)
    },
    addM(id){
      this.$audio.addMusics({musicids:[id]})
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';

.m-detail{
  padding: 0 40px;
  .m-table{
    width: 100%;
    border-collapse: collapse;
    border:1px solid $colorE ;
    border-top: 3px solid $colorA;
    border-spacing: 0;
    margin-bottom: 30px;
    table-layout: fixed;
    thead{
      display: table-header-group;
      vertical-align: middle;
    }
    tr{
      text-align: left;
      height: 30px;
      line-height: 30px;
      &:nth-child(even){
        background-color: #f7f7f7;
      }
      &:hover .hshow{
        display: flex;
        align-items: center;
      }
      &:hover .show{
        display: none;
        
      }
    }
    th{
      height: 35px;
      // line-height: 38px;
      background-color: #f7f7f7;
      background-position: 0 0;
      background-repeat: repeat-x;
      padding: 0 5px;
      color: $colorC;
      border-right: 1px solid $colorE;
      box-shadow: 1px 0 2px $colorE;
    }
    td{
      padding-left: 10px;
    }
    
    .rk-num{
      width: 77px;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .top{
      height: 70px;
      line-height: 70px;
    }
    .rk-name{
      padding: 0 10px 0 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // overflow: hidden;
      // .tn{
      //   float: left;
      //   width: 100%;
      //   overflow: hidden;
      // }
      .m-name{
        cursor: pointer;
        margin-left: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
    } 
    .ply{
      margin-left: 10px;
    }
    .m-pic{
      width: 50px;
      height: 50px;
      display: block;
      .pic{
        width: 100%;
        height: 100%;
      }
    }
    .rk-time{
      width: 91px;
      
      .hshow{
        display: none;
        float: left;
        
      }
      .add{
        width: 13px;
        height: 16px;
        display: inline-block;
        background-position: 0 -700px;
        &:hover{
          background-position: -22px -700px;
        }
      }
      .fav,.share,.download{
        width: 17px;
        height: 16px;
        display: inline-block;
        margin-left: 4px;
      }
      .fav{
        background-position: 0 -174px;
        &:hover{
          background-position: -20px -174px;
        }
      }
      .share{
        background-position: 0 -195px;
        &:hover{
          background-position: -20px -195px;
        }
      }
      .download{
        background-position: -81px -174px;
        &:hover{
          background-position: -104px -174px;
        }
      }
    }
    .rk-artist{
      width: 26%;
    }
  }
}
</style>