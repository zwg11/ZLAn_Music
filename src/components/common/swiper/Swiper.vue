<template>
  <div class="swiper">
    
    <div class="pre" @click="brSwitch(-1)">
      <img src="~assets/img/swiper/prev.svg" alt="" class="switchImg">
    </div>
    <div class="next" @click="brSwitch(1)">
      <img src="~assets/img/swiper/next.svg" alt="" class="switchImg">     
    </div>
    <ul class="bnrs">
      <li v-for="(banner,index) in banners" 
        :key="index" class="bnr" 
        :class="{'appear':currentPage === index}"
        >
        <img :src="banner.imageUrl" alt="">
      </li>
    </ul>
    <ul class="pages">
      <li class='page' 
        v-for="(banner,index) in banners" 
        :key="index" 
        :class="{'active':currentPage === index}"
        @click="pageChange(index)">
      </li>
    </ul>
    
  </div>
</template>
<script>
export default {
  name:'swiper',
  props:{
    banners:{
      type:Array

    }
  },
  data(){
    return{
      currentPage:0,
      interval:null
    }
  },
  mounted(){
    this.interval = this.brInterval();
  },
  methods:{
    // 点击左右边的图切换
    brSwitch(ind){
      this.interval && clearInterval(this.interval);
      let page = this.currentPage + ind;
      let len = this.banners.length;
      if(len){
        if(page < 0){

          this.currentPage = len - 1;
        }else if(page >= len-1){
          this.currentPage = 0
        }else{
          this.currentPage = page;
        }
      }
      this.interval = this.brInterval();
    },
    // 点击底下的点切换图
    pageChange(ind){
      this.interval && clearInterval(this.interval);
      this.currentPage = ind
      this.interval = this.brInterval();
    },
    // 设置计时器以周期性切换轮播图
    brInterval(){
      let that = this;
      return setInterval(()=>{
        if(that.banners.length && that.currentPage >= that.banners.length-1){
          that.currentPage = 0;
        }else{
          that.currentPage ++;
        }
      },3000)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .swiper{

    
    height: 275px;
    position: relative;
    &:hover .pre,&:hover .next{
      visibility: visible;
    }
    
    .pre, .next{
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: rgba($color: #000000, $alpha: 0.3);
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      visibility: hidden;
      cursor: pointer;
    }
    .switchImg{
      position: absolute;
      top: 15%;
      right: 15%;
      width: 70%;
      height: 70%;
    }
    .pre{
      left: 0;
    }
    .next{
      right: 0;
    }
    .bnrs{
      position: relative;
      width: 100%;
      height: 100%;
    }
    .bnr{
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      transition: opacity .5s linear;
      &.appear{
        opacity: 1;
      }
      // width: 100%;
      // height: 100%;
    }
    img{
      
      width: 100%;
      height: auto;
      // filter: blur(10px);
    }
    .pages{
      position: absolute;
      bottom: 10px;
      width: 50%;
      left: 25%;
      height: 20px;
      // background-color: salmon;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .page{
        width: 10px;
        height: 8px;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        &.active{
          background-color: $colorA;
        }
      }
    }
  }
</style>