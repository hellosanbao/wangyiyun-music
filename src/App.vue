<template>
  <div id="app">
    <router-view :audioPlay="playMusic" :changeCurSongIndex="changeCurSongIndex" :curSongIndex="curSongIndex" :isPlay="isPlay"/>
    <div class="play-content" v-if="songMsg">
        <div class="play-fixed flex-middle">
            <div class="pic">
                <img v-lazy="songMsg.cover" alt="">
            </div>
            <div class="info flex1">
                <div class="name line-clamp1">{{songMsg.name}}</div>
                <div class="auth line-clamp1">{{songMsg.auth}}</div>
            </div>
            <div class="ctrl flex-middle">
                <div class="prev" @click="prev"><i class="iconfont icon-prev-song"></i> </div>
                <div class="center" @click="changeIsPlay(!isPlay)">
                    <i :class="['iconfont',{'icon-bofang':!isPlay,'icon-pasue-play':isPlay}]"></i>
                    <canvas width="120" height="120" ref='circle'></canvas>
                </div>
                <div class="next" @click="next"><i class="iconfont icon-next-song"></i></div>
                <div class="menu"><i class="iconfont icon-bflb"></i></div>
            </div>
            <audio :src="`http://music.163.com/song/media/outer/url?id=${songMsg.id}.mp3`" @ended="end"  @timeupdate = "timeupdate" ref="audioContext"></audio>
        </div>
    </div>
  </div>
</template>

<script>
import AudioPlay from "@/component/common/AudioPlay";
export default {
  name: "App",
  data(){
    return {
      isPlay:false,   //是否播放音乐
      songMsg:null,    //当前歌曲信息
      curSongIndex:-1,  //歌曲在当前列表中的索引
      songList:[]       //当前歌曲列表
    }
  },
  methods: {
    //播放音乐
    playMusic(item,songList,index){
      if(timer){
        clearTimeout(timer)
      }
      this.songMsg = item
      this.isPlay = true
      this.songList = songList
      this.changeCurSongIndex(index)
      let timer = setTimeout(()=>{
        this.$refs.audioContext.play()
      },1000)
    },
    changeIsPlay(isPlay){
      this.isPlay = isPlay
    },
    changeCurSongIndex(index){
      this.curSongIndex = index
    },
    selectPlaySong(songMsg){
      this.songMsg = songMsg
    },
    changeCurSong(tip) {
      this.changeCurSongIndex(this.curSongIndex + tip);
      var songMsg = this.songList[this.curSongIndex];
      this.selectPlaySong(songMsg);
      this.timer = setTimeout(() => {
        this.$refs.audioplay.play();
      }, 500);
    },
    next() {
      if (this.curSongIndex < this.songList.length - 1) {
        this.changeCurSong(1);
      } else {
        this.changeCurSongIndex(0);
        this.selectPlaySong(this.songList[this.curSongIndex]);
      }
    },
    prev() {
      if (this.curSongIndex > 0) {
        this.changeCurSong(-1);
      } else {
        this.changeCurSongIndex(this.songList.length - 1);
        this.selectPlaySong(this.songList[this.curSongIndex]);
      }
    },
    end() {
      this.next();
    },
    timeupdate() {
      const audioContext = this.$refs.audioContext;
      // console.log(audioContext.currentTime/audioContext.duration)
      if(audioContext){
        this.drawCircle(audioContext.currentTime / audioContext.duration);
      }else{
        setTimeout(()=>{
          this.drawCircle(audioContext.currentTime / audioContext.duration);
        },300)
      }
    },
    drawCircle(deg) {
      const context = this.$refs.circle.getContext("2d");
      let cir = 2 * deg;
      context.clearRect(0, 0, 120, 120);
      context.lineWidth = 10;
      context.strokeStyle = "#d43c33";
      context.beginPath();
      context.arc(60, 60, 45, 0, cir * Math.PI, false);
      context.stroke();
    }
  },
  watch: {
    isPlay(n) {
      var play = ()=>{
        if (n) {
          this.$refs.audioContext.play();
        } else {
          this.$refs.audioContext.pause();
        }
      }
      if(this.$refs.audioContext){
        play()
      }else{
        setTimeout(play,300)
      }
    },
    songMsg(n) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audioContext.play();
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
html {
  background: #fff;
  .play-content {
    height: 90px;
    .play-fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 90px;
      z-index: 9999;
      background: #fff;
      box-shadow: 0 -4px 4px 2px rgba(156, 155, 155, 0.07);
      // border-top: 1px solid #000;
      .pic {
        margin: 0 10px;
        flex: 0 0 70px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
      .info {
        .name {
          font-size: 26px;
        }
        .auth {
          font-size: 22px;
          color: #666;
        }
      }
      .ctrl {
        height: 90px;
        color: #555;
        font-size: 60px;
        .iconfont {
          margin: 0 6px;
        }
        .center {
          font-size: 80px;
          position: relative;
          canvas {
            position: absolute;
            left: 50%;
            top: calc(50% - 3px);
            transform: translate(-50%, -50%) scale(0.3) rotate(-90deg);
          }
        }
        .menu {
          font-size: 45px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
