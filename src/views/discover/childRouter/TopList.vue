<template>
  <div class="top-list m-bg">
    <div class="container">
      <div class="side">
        <div class="sp-rank">
          <ranks :rank='sp_rank' :rankid='rkId' @rkContentUpdate='toOtherRank'></ranks>
        </div>
        <div class="global-rank">
          <ranks :rank='global_rank' :rankid='rkId' @rkContentUpdate='initContent'></ranks> 
        </div>
      </div>
      <div class="main">
        <rank-detail
          :baseinfo='rk_baseinfo'
          :rk_musics='rk_musics'
        ></rank-detail>
      </div>
    </div>
  </div>
</template>
<script>
import Ranks from 'components/content/ranklist/Ranks.vue'
import RankDetail from 'components/content/ranklist/TheRankDetail.vue'
import {_getRankList} from 'network/discover.js'
import {_getMusicListDetail,baseInfo,songDetail} from 'network/detail.js'
export default {
  name: 'topList',
  
  components:{
    Ranks,
    RankDetail
  },
  props:{
    
  },
  data(){
    return{
      sp_rank:[1],
      global_rank:[],
      rkId:0,
      select_rank:{},
      rk_baseinfo: {
        img:'', // 图片
        title:'', // 标题
        description:'', // 描述
        shareCount:0, // 分享数
        playCount:0, // 播放数
        trackCount:0, // 歌曲数
        subscribedCount:0, // 订阅数
        commentCount:0, // 评论数
        updateTime:''
        
      },
      rk_musics:[] // 排行榜中的音乐
      
    }
  },
  mounted(){
    this.initRkData()
    
    
  },
  methods:{
    // 初始化排行榜数据
    initRkData(){
      console.log('toplist mounted');
      console.log(this.$route.query.id);
      this.rkId = parseInt(this.$route.query.id) || 19723756;
      _getRankList().then(res=>{
        this.sp_rank = res.list.slice(0,4).map(val=>{
          return {
            coverImgUrl:val.coverImgUrl,
            updateFrequency:val.updateFrequency,
            name: val.name,
            id: val.id
          }
        });
        this.global_rank = res.list.slice(4).map(val=>{
          return {
            coverImgUrl:val.coverImgUrl,
            updateFrequency:val.updateFrequency,
            name: val.name,
            id: val.id
          }
        });
        this.select_rank = res.list.filter(val=>{
          return val.id == this.rkId
        })[0]

        this.initContent(this.select_rank.id)
      }).catch(err=>{
        this.$toast.thShow('warn','网络异常，无法获取排行榜相关数据')
      })

      _getMusicListDetail(this.rkId).then(res=>{
        // console.log(res);
        this.rk_baseinfo = new baseInfo(res.playlist, this.rkId)
        console.log('榜单列表');
        // console.log(res.playlist);
        this.rk_musics = res.playlist.tracks.map(val=>{
          return new songDetail(val)
        })
        // console.log(this.rk_musics);
      })
    },
    // 初始化右面的榜单内容
    initContent(id){
      // console.log(id);
      this.rkId = parseInt(id)
      // this.toOtherRank(this.rkId)
      // this.initRkData()
    },
    // 根据当前的路由参数看是否要更新内容
    toOtherRank(id){
      if(this.$route.params.id != id){
        console.log('update route');
        this.$router.push({path:'/discover/toplist',query:{id}})
        this.initRkData()
      }
    }
  },
  watch:{
    'route'(to,from){
      this.$router.go(0)
      console.log('路由变了');
      let that = this;
      if(to.query.id != from.query.id){
        initContent(to.params.id)
      }
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
.top-list{
  .container{
    display: flex;
    border-left: 1px solid $colorE;
    border-right: 1px solid $colorE;
  }
  .side{
    flex-basis: 240px;
    width: 240px;
    padding-top: 40px;
    background-color: #f9f9f9;
    border-right: 1px solid $colorE;
    box-sizing: border-box;
  }
  
  .main{
    flex: 1;
    
  }
}
</style>