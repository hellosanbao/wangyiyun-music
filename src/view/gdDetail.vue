<template>
    <div class="mian-content">
        <div class="loader" v-if="!showContent"></div>
        <div class="gd-wrap" v-if="showContent">
            <div class="gd-header">
                <div class="header-content">
                    <div class="header-info flex">
                        <div class="cover">
                            <img v-lazy="detail.coverImgUrl" alt="">
                            <div class="count"><i class="iconfont icon-erji"></i> {{detail.playCount | countFormat}}</div>
                        </div>
                        <div class="info">
                            <div class="title line-clamp2">{{detail.name}}</div>
                            <div class="user flex-middle">
                                <img v-lazy="detail.creator.avatarUrl" alt="" class="avatar">
                                <div class="name flex-middle"><div class="line-clamp1">{{detail.creator.nickname}}</div> <i class="iconfont icon-next"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="header-bar flex-between">
                        <div class="item flex1" v-for="bar in headerbar">
                            <i :class="['iconfont',bar.icon]"></i>
                            <div class="txt">{{bar.tx}}</div>
                        </div>
                    </div>
                </div>
                <div class="after" :style="{backgroundImage:`url(${detail.coverImgUrl})`}"></div>
            </div>
            <div class="songlist">
                <SongList :songList="songList" :audioPlay="audioPlay" :curSongIndex="curSongIndex" :isPlay="isPlay" :collect="detail.subscribedCount"/>
            </div>
        </div>
    </div>
</template>

<script>
import SongList from '@/component/common/songList'
export default {
  name: "GdList",
  props:['audioPlay','curSongIndex','isPlay'],
  data() {
    return {
      showContent:false,
      detail:{},  //歌单详情
    };
  },
  components:{
      SongList
  },
  computed:{
      headerbar(){
          return [
            {icon:'icon-icon',tx:this.detail.commentCount},
            {icon:'icon-fenxiang',tx:this.detail.shareCount},
            {icon:'icon-xiazai',tx:'下载'},
            {icon:'icon-duoxuan',tx:'多选'},
          ]
      },
      songList(){
          let songArray = []
          this.detail.tracks.forEach(item => {
              let song = {
                  name:item.name,
                  auth:`${item.ar[0].name}-${item.al.name}`,
                  isSq:item.h?item.h.br>=320000:false,
                  mv:item.mv,
                  id:item.id,
                  cover:item.al.picUrl
              }
              songArray.push(song)
          });
          return songArray
      }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$http.all([
        this.$http.get(`/playlist/detail?id=${this.$route.params.id}`)
      ])
      .then(this.$http.spread( (detail) => {
        this.showContent = true
        this.getGdDetail(detail)
      }))
    },
    //获取歌单分类
    getGdDetail(detail){
        this.detail = detail.data.playlist
        console.log(this.detail)
    }
  }
};
</script>
<style scoped lang="scss">
.mian-content{
    .gd-header{
        background:#000;
        position: relative;
        overflow: hidden;
        .after{
            content:"";
            display: block;
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            width: 200%;
            height: 200%;
            background:center/cover;
            filter:blur(10px);
        }
        .header-content{
            position: relative;
            z-index: 10;
            .header-info{
                padding: 30px;
                .cover{
                    width: 250px;
                    height:250px;
                    position: relative;
                    flex:0 0 260x;
                    img{
                        width: 100%;
                        height:100%;
                        border-radius: 8px;
                    }
                    .count{
                        position: absolute;
                        right: 10px;
                        top:10px;
                        color:#fff;
                        font-size: 24px;
                    }
                }
                .info{
                    margin-left: 30px;
                    margin-top: 30px;
                    width: 350px;
                    .title{
                        font-size: 32px;
                        color:#fff;
                        margin-bottom: 30px;
                    }
                    .user{
                        .avatar{
                            display: block;
                            width: 50px;
                            height:50px;
                            border-radius: 50%;
                            flex:0 0 50px;
                        }
                        .name{
                            font-size: 25px;
                            color:#fff;
                            margin-left: 18px;
                            .iconfont{
                                font-size: 30px;
                            }
                        }
                    }
                }
            }
            .header-bar{
                padding-bottom: 50px;
                .item{
                    color:#fff;
                    text-align: center;
                    font-size: 24px;
                    .iconfont{
                        font-size: 60px;
                    }
           
                }
            }
        }
    }
    .songlist{
        margin-top: -30px;
        position: relative;
        z-index: 30;
    }
}
</style>
