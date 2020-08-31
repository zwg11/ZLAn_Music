<template>
<!-- 歌单 -->
  <div class="playList">
    <div class="container" @click="isActive = false">
      <list-header :title="curTitle" :hasplt='false'>
        <template>

          <button class="classic" @click.stop="isActive = !isActive">选择分类</button>
            <div class="category" v-show="isActive">
              <h3 class="hd">
                <a id="s-all" href="#/discover/playList" @click="getAlbs('全部')">全部风格</a>
              </h3>
              <dl 
                v-for="(cat, index) in categories" 
                :key="index"
                
                >
                <dt>{{cat.title}}</dt>
                <dd>
                  <a 
                    class="a-hover"
                    v-for="(item, ind) in cat.list" 
                    :key="ind" 
                    href="javascript:;"
                    @click="getAlbs(item.name)">
                    {{item.name}}
                  </a>
                </dd>
                
              </dl>
            </div>
        </template>
        <template #more>
          <button class="hot">热门</button>
        </template>
      </list-header>
      <div class="albs">
        <alb-block 
          v-for='alb in albList' 
          :key="alb.id"
          :albumInfo='alb'
        >
          <template>
            <a href="" class="des f-thide a-hover">{{alb.name}}</a>
            <br>
            <a class="cr f-thide a-hover">{{alb.creator}}</a>

          </template>
        </alb-block>
      </div>
      <div id="pager">
        <div class="pages">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListHeader from 'components/common/ListHeader.vue'
import {_getAllTag, singleAlbum,_getHighqualityFromNet} from 'network/discover.js'
import AlbBlock from 'components/common/album/AlbBlock.vue';
export default {
  name: 'playList',
  components:{
    ListHeader,
    AlbBlock
  },
  props:{
    
  },
  data(){
    return{
      curTitle: '全部',
      categories:[],
      isActive:false,
      albList:[]
      /**
       * "name": "电影中的钢琴曲｜最会讲故事²",
            "id": 156659312,
            "userId": 2445590,
            "createTime": 1453197525856,
            "updateTime": 1596532711182,
            "subscribedCount": 199945,
            "trackCount": 61,
            "cloudTrackCount": 0,
            "coverImgUrl": "http://p3.music.126.net/IZaKdskHvigujL5GZW-QtQ==/1377688069888740.jpg",
            "playCount": 7233317,
            'creator': {
              "nickname": "下一颗巧克力",
            }
       */
      
    }
  },
  mounted(){
    _getAllTag().then(res=>{
      for(let key in res.categories){
        // console.log(key);
        this.categories.push({
          // 'type': key,
          'title':res.categories[key],
          'list': []
        })
      }
      // console.log(res.sub[0]);
      // console.log(res.sub.length);
      for(let i = 0, len = parseInt(res.sub.length); i < len; i++){
        let type = res.sub[i]['category'];
        // console.log(res.sub[i]);
        let obj = {
            "name": res.sub[i].name,
            "resourceCount": res.sub[i].resourceCount,
            "hot": res.sub[i].hot,
          }
          // console.log(obj);
        // console.log(type);
        this.categories[type].list.push(obj)
      }


    }).catch(err=>{

    });
    _getHighqualityFromNet('全部', 35).then(res=>{
      console.log('获取到歌单');
      console.log(res);
      this.albList = res.playlists.map(val=>{
        return new singleAlbum(val)
      })
    }).catch(err=>{

    })
  },
  methods:{
    getAlbs(tag, limit = 35, offset=0){
      this.$router.push('/discover/playlist?tag=' + tag + '&limit=' + limit)
      _getHighqualityFromNet(tag, limit, offset).then(res=>{
        this.isActive = false
        this.curTitle = tag;
        // console.log('获取到歌单');
        // console.log(res);
        this.albList = res.playlists.map(val=>{
          return new singleAlbum(val)
        })
      }).catch(err=>{
        this.$toast.show('warn','网路异常，未获取到歌单信息')
      })
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';


.playList{
  .container{
    padding: 40px 30px;
    .classic{
      position: relative;
      height: 30px;
      padding: 0 10px;
      border: 1px solid lightgray ;
      border-radius: 3px;
      margin-left: 30px;
      // color: rgb(0, 140, 255);
      cursor: pointer;
    }
      .category{
        position: absolute;
        width: 720px;
        top: 80px;
        left: 60px;
        z-index: 1;
        background-color: $colorG;
        border-radius: 3px;
        box-shadow: -5px 5px 5px $colorF,
          3px 1px 2px $colorF,
          0 -2px 2px $colorF
        ;
        padding-bottom: 20px;
        &::after{
          content: '';
          // background-color: $colorG;
          position: absolute;
          width: 16px;
          height: 16px;
          // border-width: 10px;
          // border-style: solid;
          // border-color: transparent transparent $colorG transparent;
          box-shadow: -2px -2px 5px $colorE;
          transform: rotateZ(45deg);
          background-color: $colorG;
          top: -5px;
          left: 50px;
          z-index: -2;
        }
        .hd{
          border-bottom: 1px solid $colorE;
          padding: 10px 28px;
          text-align: left;
          font-size: 14px;
          #s-all{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border: 1px solid lightgray ;
            border-radius: 3px;
          }
        }
        dt{
          padding-top: 15px;
          float: left;
          width: 65px;
          font-weight: bold;
        }
        dd{
          padding: 15px 16px 0;
          border-left: 1px solid $colorE;
          margin-left: 70px;
          text-align: left;
          a{
            // white-space: nowrap;
            word-break: keep-all;
            padding: 0 10px;
            overflow-wrap: none;
            border-right: 1px solid $colorF;
          }
        }
      }
    .hot{
      background-color: $colorA;
      color: $colorG;
      height: 30px;
      padding: 0 10px;
      border: 1px solid lightgray ;
      border-radius: 3px;
      margin-left: 30px;
    }
    .albs{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;
      .alb{
        margin-top: 20px;
        margin-right: 70px;
        &:nth-child(5n){
          margin-right: 0;
        }
      }
      .des{
        display: inline-block;
        width: 100%;
      }
      .cr{
        margin-left: 20px;
        position: relative;
        &::before{
          position: absolute;
          content: 'by';
          left: -20px;
          color: $colorC;
        }
      }
    }
  }
}
</style>