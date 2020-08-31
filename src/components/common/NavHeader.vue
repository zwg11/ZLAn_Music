<template>
  <div class="nav-header">
    <div class="main-nav">

      <div class="content">
        <h2 class="logo fl">网易云音乐</h2>
        <div class="other fr">
          <input type="text" class="search" placeholder="音乐/视频/电台/用户">
          <a href="javascript:;" class="creater txt">创作者中心</a>
          <a href="javascript:;" class="login txt">登录</a>
        </div>
        <ul class="m-nav">
          <li v-for="(title, index) in mainNavList" :key="index">
            <a href="javascript:;" class="item" :class="{'is-active':currentIndex === index}" @click="currentIndex = index">
              <p>{{title}}</p>
              <sub :class="{'tri':currentIndex === index}"></sub>
            </a>
          </li>
        </ul>
        
      </div>
    </div>
    <div class="bottom-nav" :class="{'hide': currentIndex !== 0}">
      <div class="content">
        <ul class="sub-nav">
          <li v-for="(title, index) in subNavList" :key="index">
            <a href="javascript:;" class="subItem"  @click="toRoute(index)">
              <span :class="{'subActive':currentSubIndex === index}">{{title}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'nav-header',
  data(){
    return{
      mainNavList:['发现音乐', '我的音乐','朋友','商城','音乐人','下载客户端'],
      currentIndex:0,
      subNavList:['推荐','排行榜','歌单','主播电台','歌手','新碟上架'],
      currentSubIndex:0,
      routeTo:['/discover','/discover/topList','/discover/playList','/discover/djradio','/discover/artist','/discover/album']
    }
  },
  mounted(){
    this.setCurrentSubIndex()
  },
  methods:{
    toRoute(ind){
      console.log(`to route ${ind}`);
      // this.currentSubIndex = ind;
      this.$store.commit('setSubIndex',ind);
      this.$router.push(this.routeTo[ind])
    },
    setCurrentSubIndex(){
      console.log(window.location.hash.slice(1));
      console.log(this.routeTo.indexOf(window.location.hash.slice(1)));
      this.currentSubIndex = this.routeTo.indexOf(window.location.hash.slice(1))
    }
  },
  computed:{
    // currentSubIndex(){
    //   console.log(window.location.hash);
    //   return this.routeTo.indexOf(window.location.hash.slice(1))
    // }
  },
  watch:{
    '$route':'setCurrentSubIndex'
  }
}
</script>
<style lang="scss">
@import "assets/css/base.scss";
  .nav-header{
    width: 100%;
    height: 104px;
    background-color: #242424;
    color: white;
    .logo{
      color: white;
      margin:0 20px;
      line-height: 70px;
    }
    .main-nav{
      background-color: #242424;
      border:none;
    }
    .content{
      width: 1100px;
      height: 100%;
      margin: 0 auto;
    }
    .other{
      height: 70px;
      line-height: 70px;

    }
    .search{
      // height: 50%;
      padding: 10px 10px 10px 30px;
      border-radius: 17px;
      // margin-right: 20px;
    }
    .txt{
      color: white;
      font-size: 12px;
      margin-left: 20px;
    }
    .m-nav,.sub-nav{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .item{
      position: relative;
      display: inline-block;
      line-height: 70px;
      padding: 0 20px;
      color: white;
      font-size: 14px;
    }
    .item:hover{

      background-color: black;
    }
    .is-active{
      background-color: black;
    }
    .tri{
      position: absolute;
      width: 0;
      height: 0;
      bottom: -1px;
      left: 50%;
      transform: translateX(-8px);
      border: 8px solid transparent;
      border-bottom: 8px solid #c20c0c;
    }
    .bottom-nav{
      width: 100%;
      height: 34px;
      background-color: #c20c0c;
      overflow: hidden;
      &.hide{
        height: 5px;
      }
    }
    
    .bottom-nav .sub-nav{
      margin-left: 130px;
      width: 100%;
    }
    .subItem{
      height: 34px;
      // line-height: 34px;
      color: white;
    }
    .subItem span{
      display: inline-block;
      margin: 8px 17px;
      height: 20px;
      line-height: 20px;
      padding:0 13px;
      border-radius: 17px;
    }
    .subItem span:hover{
      background-color: #980909;
    }
    .subActive{
      background-color: #980909;
      pointer-events: none;
    }
  }
</style>