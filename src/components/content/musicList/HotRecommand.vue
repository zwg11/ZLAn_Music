<template>
  <div class="hot-recommand">
    <list-header
      title="热门推荐"
      :hasMore='true'
      @to='toMore'
    ></list-header>
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
      
    }
  },
  
  methods:{
    toMore(){
      this.$bus.$emit('discoverToChild',2)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .hot-recommand{
    margin-bottom: 50px;
    .listHeader{
      height: 35px;
      line-height: 35px;
      border-bottom: 2px solid $colorA;
      margin-bottom: 20px;
    }
    .tab{
      float: left;
    }
    .v-hd,.icon{
      background-image: url('~assets/img/index.png');
      vertical-align: middle;
    }
    .v-hd{
      float: left;
      height: 33px;
      font-size: 20px;
      padding: 0 10px 0 34px;
      background-position: -225px -156px;
    }
    .more{
      float: right;
      a{
        color: black;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .icon{
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background-position: 0 -240px;
    }
    .li-list{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    
  }
</style>