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
    .li-list{
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    
  }
</style>