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
          :src="playList[currentIndex].m_url" 
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
        <img class='m_img' :src="playList[currentIndex].m_img" alt="">
        <a href="javascript:;" class="mask"></a>
      </div>
      <!-- 播放信息显示 -->
      <div class="play">
        <div class="words">
          <a href="javascript:;" class="name f-thide" :title="playList[currentIndex].m_name">{{playList[currentIndex].m_name}}</a>
          <a  href="javascript:;" class="by f-thide">{{playList[currentIndex].m_by}}</a>
          <a href="javascript:;" class="src" :title="playList[currentIndex].m_from"></a>
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
      playList:[
        {
          m_index: 0,
          m_img:"https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg",
          m_name:"倒数",
          m_by:"G.E.M.邓紫棋",
          m_url:"http://m7.music.126.net/20200728133036/5ae4ae28a4244cd2376a4f6067b6d832/ymusic/f370/248b/7eb6/2465d8966bb5aed27ca25813add52b49.mp3",
          m_from:'来自歌单',
        },
        {
          m_index: 1,
          m_img:"https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg",
          m_name:"有心人",
          m_by:"G.E.M.邓紫棋",
          m_url:"http://m7.music.126.net/20200729145539/bfcb588cab4c6a9fef8d2bd90ccf9a98/ymusic/0eb0/fd04/deaa/4e99cd9b69e8f26146c9d9b326ba3ce6.mp3",
          m_from:'来自歌单',
        }
      ]

    }
  },
  mounted(){
    this.$refs.audio.volume = 0.2
  },
  methods:{
    // 设置播放列表并立即播放
    setMusics(){
      
    },
    // 将音乐加入当前播放列表，可选择是否立即播放
    addMusic(){

    },
    // 控制音乐的播放和暂停
    playM(){
      if(this.onPlay){
        this.$refs.audio.pause()
      }else{
        this.$refs.audio.play()  
      }
      this.onPlay = !this.onPlay
      // console.log(this.onPlay); 
      // this.duration = formatSecond(this.$refs.audio.duration)
    },
    // 切换音乐
    switchM(ind){
      console.log('switch');
      const len =  this.playList.length;
      if(len === 0) return;
      let curI = this.currentIndex +  ind;
      if(curI < 0){
        this.currentIndex = len - 1;
      }
      else if(curI >= len){
        this.currentIndex = 0;
      }else{
        this.currentIndex = curI;
      }
      this.$refs.audio.src = this.playList[this.currentIndex].m_url;
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
      width: 40px;
      height: 40px;
    }
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
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