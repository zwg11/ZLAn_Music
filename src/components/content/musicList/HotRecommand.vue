<template>
  <div class="hot-recommand">
    <list-header
      title="热门推荐"
    >
      <template>
        <a class="a-hover comm-list" href="" v-for="(title,index) in hotRecommandClass " :key='index'>{{title}}</a>
      </template>
      <template #more>
        <a href="javascript:;" class="a-hover" @click="toMore" >更多</a>
        <i class="icon">&nbsp;</i>
      </template>
    </list-header>
    <div class="album-list">
      <ul class="li-list">
        <li v-for="(m,ind) in mList" :key="ind">
          <alb-block
            :albumInfo='mList[ind]'
          ></alb-block>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AlbBlock from 'components/common/album/AlbBlock.vue'
import ListHeader from 'components/common/ListHeader.vue'
// import {_getMusicListHot} from 'network/discover.js'
export default {
  name: 'hotRecommand',
  components:{
    AlbBlock,
    ListHeader
  },
  props:{
    mList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return{
      hotRecommandClass:['华语', '流行', '摇滚', '民谣', '电子']
    }
  },
  
  methods:{
    toMore(){
      this.$store.commit('setSubIndex',2)
      this.$router.push('/discover/playList')
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .hot-recommand{
    margin-bottom: 50px;
    .comm-list{
      padding: 0 20px;
      border-right: 1px solid lightgray;
      &:last-child{
        border: none;
      }
    }
    .li-list{
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background-position: 0 -240px;
    }
    
  }
</style>