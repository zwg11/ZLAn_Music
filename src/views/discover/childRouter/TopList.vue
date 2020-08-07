<template>
  <div class="top-list m-bg">
    <div class="container">
      <div class="side">
        <div class="sp-rank">
          <ranks :rank='sp_rank' :rankid='rkId' @rkContentUpdate='initContent'></ranks>
        </div>
        <div class="global-rank">
          <ranks :rank='global_rank' :rankid='rkId' @rkContentUpdate='initContent'></ranks> 
        </div>
      </div>
      <div class="main">main</div>
    </div>
  </div>
</template>
<script>
import Ranks from 'components/content/ranklist/Ranks.vue'
import {_getRankList} from 'network/discover.js'
export default {
  name: 'topList',
  components:{
    Ranks
  },
  props:{
    
  },
  data(){
    return{
      sp_rank:[1],
      global_rank:[],
      rkId:0,
      select_rank:{}
    }
  },
  mounted(){
    this.initRkData()
    
    
  },
  methods:{
    // 初始化排行榜数据
    initRkData(){
      console.log('toplist mounted');
      this.rkId = this.$route.params.id || 19723756;
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
    },
    // 初始化右面的榜单内容
    initContent(id){
      // console.log(id);
      this.rkId = parseInt(id)
      
    },
    // 根据当前的路由参数看是否要更新内容
    toOtherRank(id){
      if(this.$route.params.id != id){
        console.log('update route');
        this.$router.push({path:'/discover/toplist',query:{id}})
      }
    }
  },
  watch:{
    'route'(to,from){
      this.$router.go(0)
      console.log('路由变了');
      let that = this;
      if(to.params.id != from.params.id){
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