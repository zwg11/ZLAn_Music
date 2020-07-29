<template>
  <div class="musicList">
    <div class="listHeader">
      <h2>{{title}}</h2>
      <a href="javascript:;" v-if="hasMore" @click="toUrl">更多</a>
    </div>
  </div>
</template>
<script>
import {_getBanner} from 'network/discover.js'
import Swiper from 'components/common/swiper/Swiper.vue'
export default {
  name: 'discover',
  components:{
    Swiper
  },
  props:{
    mList:{
      type:Array,
      default:[]
    },
    title:{
      type: String,
      default:'歌单列表'
    },
    hasMore:{
      type:Boolean,
      default:true
    },
    to:{
      type:String,
      default: ''
    }
  },
  data(){
    return{
      hasMore
    }
  },
  methods:{
    toUrl(){
      this.$router.push(this.to)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .musicList{
    .listHeader{
      height: 35px;
      line-height: 35px;
      border-bottom: 2px solid $colorA;
    }
    
  }
</style>