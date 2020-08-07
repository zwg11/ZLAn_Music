<template>
  <div class="recommend m-bg">
    <div class="container clearfix">
      <div class="leftContent fl">
        <swiper :banners='banners'></swiper>
        <div class="wrap itm">
          <hot-recommand
            :mList='albList'
            
          ></hot-recommand>
          <new-record :rdsList='rdsList'>
          </new-record>
          <board></board>
        </div>
      </div>
      <div class="rightContent fr">
        <div class="download">
            <!-- <a href="/download" title="下载客户端" id='side-download'>下载客户端</a> -->

        </div>
        <div class="artist">
          <h3 class="hd">
              <span class="v-hd">入驻歌手</span>
              <a href="" class="more a-hover">查看全部></a>
          </h3>
          <ul class="asts flex-ul">
            <li v-for="(artist,index) in artists" :key="index" class="ast">
              <img :src="artist.img" alt="" class="img">
              <div class="info">

                <h3 class="name">{{artist.name}}</h3>
                <p class="title">{{artist.title}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="hot-anchor">
          <h3 class="hd">
              <span class="v-hd">热门主播</span>
          </h3>
          <ul class="anchors flex-ul">
            <li v-for="(anchor,index) in anchors" :key="index" class="anchor">
              <img :src="anchor.img" alt="" class="img">
              <div class="info">

                <p class="title">热度：{{anchor.hot_rank}}</p>
                <h3 class="name">{{anchor.name}}</h3>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import {_getBanner,_getPersonalized,_getNewRecords,_getRankList,_getTopArtists,_getTopAnchors} from 'network/discover.js'
import Swiper from 'components/common/swiper/Swiper.vue'
import HotRecommand from 'components/content/musicList/HotRecommand.vue'
import NewRecord from 'components/content/musicList/NewRecord.vue'
import Board from 'components/common/board/Board.vue'
export default {
  name: 'recommend',
  components:{
    Swiper,
    HotRecommand,
    NewRecord,
    Board
  },
  data(){
    return{
      banners:[],
      albList:[],
      rdsList:[],
      rkList:[],
      artists:[],
      anchors:[]
    }
  },
  created(){
    // 获取轮播图
    _getBanner().then(res=>{
      this.banners = res.banners.slice(0, 8)
    }).catch(err=>{
      console.error(`network err:${err}`);
    });
    // 获取热门推荐
    _getPersonalized(8).then(res=>{
      // console.log(res.result);
      this.albList = res.result;
    }).catch(err=>{
      console.error(`network err:${err}`);
    });
    // 获取新碟上架
    _getNewRecords().then(res=>{
      // console.log(res);
      this.rdsList = res.albums.slice(0,5)
    }).catch(err=>{
      console.log(err);
    });

    // 获取榜单
    _getRankList().then(res=>{
      this.rkList = res.list.slice(0,3)
    }).catch(err=>{
      console.log(err);
    })

    // 获取热门歌手
    _getTopArtists(5).then(res=>{
      console.log('热门歌手');
      console.log(res.artists);
      this.artists = res.artists.map(val=>{
        return {name:val.name, img:val.picUrl,id:val.id}
      });
      console.log(this.artists);
    })
    // 获取热门歌手
    _getTopAnchors(5).then(res=>{
      console.log('热门主播');
      console.log(res);
      this.anchors = res.data.list.map(val=>{
        return {name:val.nickName, img:val.avatarUrl, hot_rank:val.score,id:val.id}
      });
    })
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';

  .recommend{
    // background-color: #ffffff;
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
      .boards{
        display: flex;
        align-items: center;
      }
    }
    .rightContent{
      width: 25%;
      background-color: #fefefe;
      border-right: 1px solid $colorE;
      .download{
        background-image: url('~assets/img/download.png');
        width: 254px;
        height: 285px;
        #side-download{
          display: block;
          position: absolute;
          height: 56px;
          width: 215px;
          margin: 186px 0 0 19px;
          background-position: 0 -299px;
        }
        
      }
      .flex-ul{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 220px;
          margin: 5px auto;
          .info{
            padding-left: 10px;
            flex: 1;
            width: 145px;
            
            &:hover{
              cursor: pointer;
            }
            .name,.title{
              text-align: left;
              font-size: 12px;
            }
            
            .name{
              margin-top: 8px;
            }
          }
      }
      .artist{
        margin: 10px 0 20px 0;
        
        .img{
          float: left;
          width: 62px;
          height: 62px;
        }
        
        .ast{
          height: 62px;
          margin-top: 10px;
          display: flex;
          justify-content: flex-start;
          background-color: #f7f7f7;
          .info{
            border: 1px solid $colorE;
            border-left: none;
            border-radius: 3px;
          }

        }
        
        .name{
          font-weight: bold;
          font-size: 16px;

        }
      }
      .hot-anchor{
        margin-top: 10px;
        
        .img{
          float: left;
          width: 40px;
          height: 40px;
        }
        .anchor{
          height: 40px;
          
          margin-top: 10px;
          display: flex;
          justify-content: flex-start;
        
        }
      }
      .hd{
        width: 220px;
        margin: auto;
        height: 24px;
        line-height: 24px;
        border-bottom: 1px solid $colorD;
        font-size: 12px;
        .v-hd{
          float: left;
          font-weight: bold;
        }
        .more{
          float: right;
          font-weight: lighter;
          

        }
      }
    }
  }
</style>