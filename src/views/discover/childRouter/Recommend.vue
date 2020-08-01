<template>
  <div class="recommend">
    <div class="container clearfix">
      <div class="leftContent fl">
        <swiper :banners='banners'></swiper>
        <div class="wrap">
          <hot-recommand
            :mList='albList'
            
          ></hot-recommand>
          <new-record :rdsList='rdsList'></new-record>
        </div>
      </div>
      <div class="rightContent fr">

      </div>

    </div>
  </div>
</template>
<script>
import {_getBanner,_getPersonalized,_getNewRecords} from 'network/discover.js'
import Swiper from 'components/common/swiper/Swiper.vue'
import HotRecommand from 'components/content/musicList/HotRecommand.vue'
import NewRecord from 'components/content/musicList/NewRecord.vue'
export default {
  name: 'recommend',
  components:{
    Swiper,
    HotRecommand,
    NewRecord
  },
  data(){
    return{
      banners:[],
      albList:[],
      rdsList:[]
    }
  },
  created(){
    // 获取轮播图
    _getBanner().then(res=>{
      this.banners = res.data.banners.slice(0, 8)
    }).catch(err=>{
      console.error(`network err:${err}`);
    });
    // 获取热门推荐
    _getPersonalized(8).then(res=>{
      console.log(res.data.result);
      this.albList = res.data.result;
    }).catch(err=>{
      console.error(`network err:${err}`);
    });
    // 获取新碟上架
    _getNewRecords({limit:5}).then(res=>{
      console.log(res.data);
      this.rdsList = res.data.albums
    }).catch(err=>{
      console.log(err);
    });
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';

  .recommend{
    background-color: #ffffff;
    .container{
      display: flex;
    }
    .leftContent{
      width: 75%;
      border: 1px solid $colorE;
      box-shadow: 1px 1px 2px $colorE,
      -1px 1px 2px $colorE;
      .wrap{
        padding: 20px 20px 40px 20px;
      }
    }
    .rightContent{
      width: 25%;
      background-color: burlywood;
    }
  }
</style>