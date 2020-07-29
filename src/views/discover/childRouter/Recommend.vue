<template>
  <div class="recommend">
    <div class="container clearfix">
      <div class="leftContent fl">

        <swiper :banners='banners'></swiper>
        <div class="wrap">

        </div>
      </div>
      <div class="rightContent fr">

      </div>

    </div>
  </div>
</template>
<script>
import {_getBanner} from 'network/discover.js'
import Swiper from 'components/common/swiper/Swiper.vue'
export default {
  name: 'recommend',
  components:{
    Swiper
  },
  data(){
    return{
      banners:[]
    }
  },
  created(){
    _getBanner().then(res=>{
      this.banners = res.data.banners.slice(0, 8)
    }).catch(err=>{
      console.error(`network err:${err}`);
    })
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .recommend{
    .container{
      display: flex;
    }
    .leftContent{
      width: 75%;
      border: 1px solid $colorC;
      .wrap{
        padding: 20px 20px 20px 40px;
      }
    }
    .rightContent{
      width: 25%;
    }
  }
</style>