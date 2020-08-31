<template>
  <div class="ranks">
    <h3 class="title">云音乐特色榜</h3>
      <ul class="rks">
        <li v-for="(item,index) in rank" 
          :key='index' 
          :class="{'li-selected':rankid == item.id}"
          @click="toRank(item.id)"
        >
          <div class="item">
            <div class="fl">
              <a href="javascript:;" class="img">
                <img :src="item.coverImgUrl" alt="">
              </a>

            </div>
            <p class="name">{{item.name}}</p>
            <p class="update">{{item.updateFrequency}}</p>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
import {_getMusicListDetail} from 'network/detail.js'
export default {
  name: 'topList',
  props:{
    rank:{
      type:Array,
      default(){
        return []
      }
    },
    rankid:{
      type:Number,
      default:0
    }
    
  },
  data(){
    return{
      curInd:-1
    }
  },
  methods:{
    toRank(id){
      // console.log('update rank content');
      // console.log(id);
      this.$emit('rkContentUpdate',id)
      // this.rankid = id
      
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
.ranks{

  .title{
    text-align: left;
    padding: 0 10px 12px 15px;
    font-weight: 800;
    font-size: 14px;
    margin-top: 20px;
  }
  .rks li{
    padding: 10px 0 10px 20px;
    height: 42px;
    zoom: 1;
    cursor: pointer;
  }
  .item{
    display: block;
  }
  .img{
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .name,.update{
    width: 150px;
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 8px;
    text-align: left;
  }
  .name{
    font-size: 12px;
    font-weight: 600;
  }
  .update{
    color: #999;
  }
  .li-selected{
    background-color: #e6e6e6;
  }

}
</style>