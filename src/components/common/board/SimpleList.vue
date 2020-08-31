<template>
  <div class="simple-list">
    <dl class="dlist">
      <dt class="dtitle">
        <img class="j-img" :src="lst.coverImgUrl" alt="">
        <!-- <a href="javascript:;" class="msk msk-3"></a> -->
        <div class="tit fl">

          <a :href="'/#/discover/toplist?id=' + rankId" class="a-hover title">

            {{title}}
          </a>
          <div class="opt">
            <a href="javascript:;" class="ply ind-button" title="播放歌单" @click="plyAlb"></a>
            <a href="javascript:;" class="fav ind-button" title="收藏"></a>
          </div>
        </div>
      </dt>
      <dd class="ddetail">
        <ul>
          <li v-for="(dbd,index) in top" :key="index" class="l-bd" :class="{'m-bg':index%2===0}">
            <span class="no" :class="{'no-top':index<3}">{{index + 1}}</span>
            <a href="javascript:;" class="title f-thide a-hover" @click="getMUrl(dbd.id)">{{dbd.name}}</a>
            <div class="icns">
              <a href="javascript:;" class="ply ind-button" @click="getMUrl(dbd.id)"></a>
              <a href="javascript:;" class="add u-icn" @click="addMUrl([dbd.id])"></a>
              <a href="javascript:;" class="fav ind-button"></a>
            </div>
          </li>
        </ul>
        <div class="ft">
          <a :href="'/#/discover/toplist?id=' + rankId" class="to-all a-hover m-bg">查看全部></a>
        </div>
      </dd>
    </dl>
  </div>
</template>
<script>
// import {_getBanner,_getPersonalized,_getNewRecords,_getRankLists} from 'network/discover.js'
import {_getMusicListDetail} from 'network/detail.js'
export default {
  name: 'simple-list',
  props:{
    title:{
      type:String,
      default:'排行榜'
    },
    rankId:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      lst:[],
      top:[]

    }
  },
  mounted(){
    if (this.rankId != null) {
      _getMusicListDetail(this.rankId).then(res => {
        this.lst = res.playlist;
        this.top = this.lst.tracks.slice(0,10)
        // console.log('***********');
        // console.log(this.lst);
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  methods:{
    getMUrl(id){
      console.log(`音乐id:${id}`);
      // this.$bus.$emit('playAMusic',id)
      this.$audio.playAMusic(id)
    },
    addMUrl(ids){
      console.log('添加');
      // this.$bus.$emit('addMusics',{'musicids':ids,now:false})
      this.$audio.addMusics({'musicids':ids,now:false})
    },
    // 播放歌单
    plyAlb(){
      console.log('play album');
      
      // 提取出所有歌的id
      const idList = this.lst.trackIds.map(val=>{
        // console.log(val);
        return val.id
      })
      this.$audio.toggleList(idList)
     
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
.simple-list{
  
  .dtitle{
    display: block;
    height: 100px;
    padding: 20px 0 0 20px;
    .j-img{
      width: 80px;
      height: 80px;
      float: left;
    }
    .tit{
      margin: 6px 0 0 10px;
    }
    .title{
      font-size: 14px;
      font-weight: bold;
      display: block;
      // text-align: left;
      padding-left: 10px;
    }
    .opt{
      margin-left: 10px;
    }
  }
  .ddetail{
    margin-left: 0;
    // ul{
    //   padding-left: 10px;
    // }
  }
  
  .no{
    float: left;
    position: relative;
    width: 35px;
    height: 32px;
    line-height: 32px;
    margin-left: -35px;
    text-align: center;
    color: #666;
    font-size: 16px;
  }
  .no-top{
    color: #c10d0c;
  }
  .l-bd{
    // position: relative;
    padding-left: 35px;
    line-height: 32px;
    text-align: left;
    display: flex;
    // justify-content: space-between;
    &:hover .icns{
      display: block;
    }
    
  }
  .l-bd .icns{
    
    height: 32px;
    width: 72px;
    display: none;
  }
  .ply,.fav{
    float: left;
    margin-top: 7px;
    display: block;
    width: 17px;
    height: 17px;
    margin-right: 7px;
  }
  .add{
    background-image: url('~assets/img/icon.png');
    float: left;
    margin-top: 9px;
    display: block;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
  .ply{
    background-position: -267px -268px;
    &:hover{
      background-position: -267px -288px;
    }
  }
  .add{
    background-position: 0 -700px;
    &:hover{
      background-position: -22px -700px;
    }
  }
  .fav{
    background-position: -297px -268px;
    &:hover{
      background-position: -297px -288px;
    }
  }
  .to-all{
    display: block;
    padding-right: 20px;
    text-align: right;
    height: 32px;
    line-height: 32px;
    
  }
  .title{
    flex: 1;
    display: block;
  }
  
}
</style>