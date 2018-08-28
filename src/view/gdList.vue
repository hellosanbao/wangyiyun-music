<template>
  <div class="mian-content">
    <div class="loader" v-if="!showContent"></div>
    <div v-if="showContent">
      <!-- 精品歌单 -->
      <div class="Boutique">
        <div class="content flex-middle">
          <div class="cover">
            <img v-lazy="boutique.coverImgUrl" alt="">
          </div>
          <div class="info">
            <div class="title flex-middle"> 
              <i class="iconfont icon-jingpin "></i> <div class="line-clamp1">精品歌单</div>
            </div>
            <div class="name line-clamp1">{{boutique.name}}</div>
            <div class="desc line-clamp1">{{boutique.copywriter}}</div>
          </div>
        </div>
        <div class="after" :style="{backgroundImage:`url(${boutique.coverImgUrl})`}"></div>
      </div>
      <!-- 歌单分类 -->
      <div class="gd-cat flex-between flex-middle">
        <div class="cat-selector flex-middle">
           <div class="til">全部歌单</div> 
           <i class="iconfont icon-next"></i>
        </div>
        <div class="hot-cat flex-middle">
          <div class="cat border" @click="getListByCat('华语')">华语</div>
          <div class="cat border" @click="getListByCat('摇滚')">摇滚</div>
          <div class="cat" @click="getListByCat('民谣')">民谣</div>
        </div>
      </div>
      <!-- 歌单列表 -->
      <div class="list flex-between flex-content" v-if="playlist.length>0">
        <div class="item" v-for="(item,index) in playlist">
          <router-link :to="`/GdDetail/${item.id}`" tag="div">
            <AblumItem :itemData="item" type="ablum"/> 
          </router-link>
        </div>
      </div>
      <div class="list-loading flex-middle flex-center" v-if="playlist.length<=0"><img src="../assets/page-loading.svg" alt=""></div>
    </div>
  </div>
</template>

<script>
import AblumItem from '@/component/common/ablumItem'
export default {
  name: "GdList",
  components: {
    AblumItem
  },
  data() {
    return {
      showContent:false,
      playlist:[], //歌单列表
      boutique:{}  //精品歌单
    };
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$http.all([
        this.$http.get('/playlist/catlist'),
        this.$http.get('/top/playlist'),
        this.$http.get('/top/playlist/highquality?limit=1')
      ])
      .then(this.$http.spread( (catlist,newplaylist,boutique) => {
        this.showContent = true
        this.category(catlist)
        this.getnewPlayList(newplaylist)
        this.getBoutique(boutique)
      }))
    },
    //获取歌单分类
    category(catlist){
      console.log(catlist)
    },
    //获取最新歌单
    getnewPlayList(newplaylist){
      newplaylist.data.playlists.forEach(item => {
        item.picUrl = item.coverImgUrl
        item.copywriter = item.description
      });
      this.playlist=newplaylist.data.playlists
    },
    //按分类获取列表
    getListByCat(cat){
      this.playlist = []
      this.$http.get(`/top/playlist?cat=${cat}`).then(res=>{
        res.data.playlists.forEach(item => {
          item.picUrl = item.coverImgUrl
          item.copywriter = item.description
        });
        this.playlist=res.data.playlists
      })
    },
    //获取精品歌单
    getBoutique(boutique){
      this.boutique = boutique.data.playlists[0]
      console.log(this.boutique )
    }
  }
};
</script>
<style scoped lang="scss">
.mian-content{
  .Boutique{
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 35px 20px;
    .after{
      content:"";
      display: block;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      width: 200%;
      height: 200%;
      background: url('http://p1.music.126.net/F5w90nKpQ0b5JxFLr2ryng==/109951163509512089.jpg') center/cover;
      filter:blur(10px);
    }
    .content{
      position: relative;
      z-index:10;
      .cover{
        height: 200px;
        width: 200px;
        flex:0 0 200px;
        img{
          vertical-align: middle;
          width: 100%;
          height:100%;
          border-radius: 15px;
        }
      }
      .info{
        margin-left: 30px;
        .title{
          font-size: 35px;
          color:#fff;
          margin-bottom: 15px;
          .iconfont{
            color:#f8dda3;
            border: 1px solid #f8dda3;
            display: block;
            width: 40px;
            height:40px;
            line-height: 40px;
            text-align: center;
            border-radius: 50%;
            margin-right: 10px;
            flex:0 0 40px;
          }
        }
        .name{
          font-size: 28px;
          color:#fff;
        }
        .desc{
          font-size: 22px;
          color: #ddd;
          margin-top:10px;
        }
      }
    }
  }
  .gd-cat{
    box-sizing: border-box;
    padding: 29px 0 20px;
    .cat-selector{
      margin-left: 15px;
      font-size: 27px;
      color:#333;
      border: 1px solid #ddd;
      height: 50px;
      padding: 0 10px;
      border-radius: 50px;
      .iconfont{
        color:#999;
        font-size: 30px;
      }
    }
    .hot-cat{
      .cat{
        font-size: 27px;
        color: #666;
        padding: 0 15px;
        height: 27px;
        line-height: 27px;
        &.border{
          border-right: 1px solid #ddd;
        }
      }
    }
  }
  .list{
    box-sizing: border-box;
    padding: 0 15px;
    .item{
      width: 355px;
    }
  }
  .list-loading{
    padding: 80px 0;
    box-shadow: 0 -6px 5px 5px rgba(202, 202, 202, 0.1);
    img{
      display: block;
      width: 80px;
      height: 80px;
    }
  }
}
</style>
