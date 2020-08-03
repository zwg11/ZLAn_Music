<template>
  <div class="audio-bar">
    <div class="hand" title="展开播放条"></div>
    <div class="content">
      <!-- 播放操作 -->
      <div class="btns fl">
        <a href="javascript:;" class="prv" @click="switchM(-1)">上一首</a>
        <a href="javascript:;" class="ply" :class="{'on':onPlay}" @click="playM">播放</a>
        <a href="javascript:;" class="nxt" @click="switchM(1)">下一首</a>
      </div>
      <div class="pic fl">
        <audio 
          :src="m_url" 
          ref="audio" 
          id="audio" 
          autoplay
          @timeupdate="audioTimeUpdate"
          @pause="musicPause"
          @error="musicErr"
          @play="playLoad"
          @playing="musicPlaying"
          @ended="musicEnded"
          
        ></audio>
        <img class='m_img' :src="playList[currentIndex].m_img || ''" alt="">
        <a href="javascript:;" class="mask"></a>
      </div>
      <!-- 播放信息显示 -->
      <div class="play">
        <div class="words">
          <a href="javascript:;" class="name f-thide" :title="playList[currentIndex].m_name || ''">{{playList[currentIndex].m_name || ''}}</a>
          <a  href="javascript:;" class="by f-thide">{{playList[currentIndex].m_by || ''}}</a>
          <a href="javascript:;" class="src" :title="playList[currentIndex].m_from || ''"></a>
        </div>
        <div class="m-pbar">
          <m-prog 
            :scale='m_pScale'
            @scaleChange='audioTimeChange'
            :isDragEnable='onPlay'
          ></m-prog>
          
          <span class="time">
            <span>{{currentTime}}</span>
            / {{duration}}
          </span>
        </div>
        
      </div>
      <!-- 分享收藏操作 -->
      <div class="oper fl">
        <a href="javascript:;" title="收藏" class="add icon"></a>
        <a href="javascript:;" title="分享" class="share icon"></a>
      </div>
      <!-- 播放相关操作，包括音量、播放顺序等 -->
      <div class="ctrl fl">
        <div class="m-vol" v-show="showVol">
          <div class="v-bar">
            <v-prog 
              @volChange='audioVolChange'
            ></v-prog>
          </div>
        </div>
        <a href="javascript:;" class="icon-vol icon" @click="volBarShow"></a>
        <a href="javascript:" class="icon icon-loop" title="循环"></a>
        <span class="icon-list fr">
          <a href="javascript:" class="icon lst-c" title="播放列表">{{playList.length}}</a>
        </span>

      </div>
      
    </div>
  </div>
</template>
<script>
import {formatSecond} from 'assets/Tools.js'
// import {throttle} from 'assets/Tools.js'
import {_getSongsDetail,songInf,_getMusicUrl} from 'network/detail.js'
import MProg from 'components/common/MProgress.vue'
import VProg from 'components/common/VProgress.vue'
export default {
  name: "audio-bar",
  components:{
    MProg,
    VProg
  },
  data(){
    return{
      currentIndex:0,
      onPlay:false,
      currentTime:'00:00',
      duration: '00:00',
      m_pScale:0.0,
      showVol:false,
      m_url:'',
      idList:[1466643383],
      playList:[
        {
          "m_id":1466643383,
          "m_name":"祝我快乐",
          "m_by":"汪苏泷",
          "m_img":"https://p1.music.126.net/jBAh_0-ErI-nhZCexazjQA==/109951165181706528.jpg",
          // "m_url":"http://m7.music.126.net/20200803174407/f4261f987301f3c0fa84977b96ca8c92/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3419125426/11d6/1b3f/46fa/4d03e653ba8c15dc62a6db8357ad6373.mp3"
        }
      ]

    }
  },
  mounted(){
    this.$refs.audio.volume = 0.2
    this.$bus.$on('playAMusic',this.playAMusic) // payload: {id:String}
    this.$bus.$on('addMusics',this.addMusics) // payload:{musics:Array,now:boolean}
    this.$bus.$on('toggleList',this.toggleList) // payload:ids:Array
  },
  methods:{
    // 设置播放列表并立即播放
    playAMusic(id){
      // 如果 原列表没有该音乐
      if(this.idList.indexOf(id) === -1){
        // 得到该歌的信息
        _getSongsDetail(id).then(res=>{ 
          // console.log(res);
          let inf = new songInf(res.songs[0]);
          // 将歌曲信息添加至列表
          this.addMs(inf)
          // 获取歌曲URL
          return _getMusicUrl(inf.m_id)
          
        }).then(res=>{ // 成功得到该歌曲的URL
          this.$toast.show('success', `加载音乐成功，正在尝试播放`)
          // 设置当前下标
          this.currentIndex = this.idList.indexOf(id)
          // 播放
          this.m_url = res.data[0].url
          this.playM()
        }).catch(err=>{
          this.$toast.show('warn', `网络异常，无法获取音乐数据`)
          console.log(err);
        })
      }
    },
    // 将一个或多个音乐加入当前播放列表，可选择是否立即播放
    addMusics(payload){
      console.log('添加音乐至列表');
      let lt = payload.musicids
      for(let musicid of lt){
      // 去掉列表中已经有的
        if(this.idList.indexOf(musicid) != -1){
          // Promise.all([_getSongsDetail(musicid),_getMusicUrl(musicid)]).then(res=>{
          lt.splice(this.idList.indexOf(musicid), 1)
        }
      }
      _getSongsDetail(lt.join(',')).then(res=>{
        // console.log(res);
        let infs = res.songs.map(val=>{
          return new songInf(val)
        })
        // 尝试添加进去
        for(let inf of infs){
          this.addMs(inf)
        }
        // 如果现在播放，获取该歌单的第一个歌的URL，播放他
        if(payload.now){
          return _getMusicUrl(payload.musicids[0])
          
        }else{
          return 0
        }
        // this.currentIndex = 0
        // this.$toast.show('success', `加载音乐成功，正在尝试播放`)
        // this.playM()
      }).then(res=>{
        if(res === 0) return;
        // 设置其播 放
        console.log('将要播放');
        console.log(res);
        this.m_url = res.data.url
        this.currentIndex = this.idList.indexOf(payload.musicids[0])
      }).catch(err=>{
        this.$toast.thShow('warn', `网络异常，无法获取音乐数据`)
        console.log(err);
      })
      
    },

    // 向当前播放列表添加音乐
    addMs(inf){
      let ind = this.idList.indexOf(inf.m_id)
      console.log(`音乐id:${inf.m_id}`);
      // console.log(inf);
      if( ind === -1){
        this.idList.push(inf.m_id);
        this.playList.push(inf);
      }  
    },
    // 切换播放列表
    toggleList(ids){
      console.log('添加音乐至列表');
      let mlist = [];
      let idArr = ids.join(',')
      // console.log(ids);
      
      _getSongsDetail(idArr).then(res=>{
        // console.log(res);
        // console.log(res.songs[0]);
        // console.log(res.songs);
        mlist = res.songs.map(val=>{
          return new songInf(val)
        })
        console.log('得到了该歌单的信息');
        // 重新设置当前播放列表
        this.idList = ids;
        this.playList = mlist;

        // 获取列表中第一个歌id的URL
        return _getMusicUrl(ids[0])
        // this.currentIndex = 0
        // this.$toast.show('success', `加载音乐成功，正在尝试播放`)
        // this.playM()
      }).then(res=>{
        console.log(res);
        this.m_url = res.data[0].url
        this.currentIndex = 0
      }).catch((err)=>{
        this.$toast.thShow('warn', `网络异常，无法添加音乐至列表`)
        console.log(err);
      })  
    },
    // 控制音乐的播放和暂停
    playM(){
      if(this.onPlay){
        this.$refs.audio.pause()
        this.onPlay = false
      }else{

        let pr = this.$refs.audio.play();
        if(pr !== undefined){
          pr.then(()=>{
            console.log('bofang...');
            // console.log(res);
            this.onPlay = true
            // this.$toast.show('success','音乐播放中。。。')
            // this.m_pScale = 0.0
          }).catch(err=>{
            console.log(err);
            this.$toast.show('warn','当前无法播放音频')
          })
        }
      }
      // this.onPlay = !this.onPlay
      // console.log(this.onPlay); 
      // this.duration = formatSecond(this.$refs.audio.duration)
    },
    // 切换音乐
    switchM(ind){
      console.log('switch');
      this.m_pScale = 0.0
      const len =  this.playList.length;
      if(len === 0) return;
      let curI = this.currentIndex +  ind;
      if(curI < 0){
        curI = len - 1;
      }
      else if(curI >= len){
        curI = 0;
      }
      _getMusicUrl(this.idList[curI]).then(res=>{
        console.log('dedao');
        this.m_url = res.data[0].url
        this.currentIndex = curI;
        
        // this.playM();
      }).catch(err=>{
        console.log('切换音频失败');
        console.log(err);
      })
      
    },
    audioTimeUpdate(){
      let _audio = this.$refs.audio
      this.currentTime = formatSecond(_audio.currentTime)
      this.m_pScale = parseFloat((_audio.currentTime/_audio.duration).toFixed(3))
      // console.log(this.m_pScale);
    },
    audioTimeChange(scale){
     
      let _audio = this.$refs.audio;
      _audio.currentTime = parseInt(_audio.duration * scale);
      // this.m_pScale = scale
      this.audioTimeUpdate();
    },
    musicPause(){
      console.log('pause');
      this.onPlay = false;
    },
    musicPlaying(){
      this.onPlay = true
      this.duration = formatSecond(this.$refs.audio.duration)
    },
    playLoad(){
      this.$refs.audio.play();
    },
    musicErr(){
      this.musicPause()
    },
    musicEnded(){
      this.switchM(1)
    },
    audioVolChange(volume){
      this.$refs.audio.volume = volume
    },
    volBarShow(){
      this.showVol = !this.showVol;
    }
  },
  beforeDestroy(){
    this.$bus.$off('playAMusic')
    this.$bus.$off('addMusics')
  }
}
</script>
<style lang="scss" scoped>
@import "assets/css/base.scss";
@import "assets/css/config.scss";
  .audio-bar{
    position: fixed;
    bottom: 0;
    /* height: 70px; */
    width: 100%;
    background-color: #242424;
    user-select: none;
    
  }
  .hand{
    position: absolute;
    top: -17px;
    width: 100%;
    height: 20px;
  }
  .content{
    position: relative;
    width: 980px;
    height: 53px;
    background-color: #242424;  
    /* background-color: aqua; */
    margin: 0 auto;
    .btns{
      width: 137px;
      padding: 6px 0 0 0;
      a{
        display: block;
        float: left;
        margin-top: 5px;
        margin-right: 8px;
        text-indent: -9999px;
        width: 28px;
        height: 28px;
      }
      .ply{
        width: 36px;
        height: 36px;
        margin-top: 0;
        margin-right: 8px;
      }
    } 
    .prv,.ply,.nxt, .mask, .src, .add, .share, .icon-vol, .icon-loop, .lst-c{
      background-image: url('~assets/img/playmusic/playbar.png');
    }
    .prv{
      background-position: 0 -130px;
      &:hover{
        background-position: -30px -130px;
      }
    }
    .ply{  
      background-position: 0 -204px;
      &:hover{
        background-position: -40px -204px;
      }
    }
    .ply.on{  
      background-position: 0 -165px;
      &:hover{
        background-position: -40px -165px;
      }
    }
    .nxt{
      background-position: -80px -130px;
      &:hover{
        background-position: -110px -130px;
      }
    }
    .pic{
      position: relative;
      margin: 6px 15px 0 0;
      width: 35px;
    }
    .m_img{
      width: 33px;
      height: 33px;
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 34px;
      height: 34px;
      display: block;
      background-position: 0 -80px;
    }
    .play{
      float: left;
      width: 608px;
      color: white;
      text-align: left;
      .words{
        height: 28px;
        line-height: 28px;
      }
      .name,.by,.src{
        float: left;
        display: block;
        max-width: 300px;
      }
      .name:hover,.by:hover{
        text-decoration: underline;
        
      }
      .name{
        
        color: white;
      }
      .by{
        margin-left: 10px;
        color: #9b9b9b;
      }
      .src{
        float: left;
        display: block;
        margin: 7px 0 0 13px;
        width: 14px;
        height: 14px;
        background-position: -110px -103px;
      }
    }
    .m-pbar{
      width: 493px;
      height: 9px;
      background-color: black;
      border-radius: 4px;
      position: relative;
      .rdy{
        background-color: $colorI;
      }
      .cur{
        background-color: $colorA;
        height: 9px;
        position: relative;
        border-radius: 4px;
        display: flex;
        align-items: center;
        .btn{
          position: absolute;
          width: 8px;
          height: 19px;
          // top: -5px;
          right: 0px;
          border-radius: 4px;
          background-color: $colorC;
          
        }
      }
      .time{
        position: absolute;
        right: -78px;
        top: -3px;
      }
    }
    .icon{
      display: inline-block;
      width: 25px;
      height: 25px;
      margin: 15px 2px 0 0;
    }
    .oper{
      width: 60px;
      height: 36px;
      .add{
        
        background-position: -88px -163px;
        &:hover{
          background-position: -88px -189px;
        }
      }
      .share{
        background-position: -114px -163px;
        &:hover{
          background-position: -114px -189px;
        }
      }
    }
    .ctrl{
      height: 36px;
      padding-left: 10px;
      .m-vol{
        position: absolute;
        top: -22px;
        width: 100px;
        height: 20px;
        background-color: $colorI;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        .v-bar{
          width: 80%;
          height: 5px;
        }
      }
      .icon-vol{
        background-position: -2px -248px;
        &:hover{
          background-position: -31px -248px;
        }
      }
      .icon-loop{
        background-position: -3px -344px;
        &:hover{
          background-position: -33px -344px;
        }
      }
      .icon-list{
        display: inline-block;
        width: 59px;
        height: 35px;
        .lst-c{
          width: 38px;
          color: #666;
          text-align: center;
          padding-left: 21px;
          background-position: -42px -69px;
          text-indent: 0;
          line-height: 25px;
          &:hover{
            background-position: -42px -99px;
          }
        }
      }
    }
  }
</style>