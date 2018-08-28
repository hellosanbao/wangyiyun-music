<template>
  <div class="mian-content">
    <div class="loader" v-if="!showContent"></div>
    <div v-if="showContent">
      <Banner v-if="banners.length>0" :banners="banners"/>
      <navBar />
      <div class="song-group">
        <AblumList :list="tjgdList" title="推荐歌单"/>
      </div>
      <div class="song-group">
        <DjList :list="djprogramList" title="热门电台"/>
      </div>
      <div class="song-group">
        <MvList :list="mvList" title="推荐mv"/>
      </div>
      <div class="song-group">
        <XdsjList :list="mvList" title="你不能错过的新碟"/>
      </div>
      <div class="song-group">
        <RmgsList :list="rmgsList" title="热门歌手"/>
      </div>
      <BottomLoading :noMore="false"/>
    </div>
  </div>
</template>

<script>
import Banner from '@/component/home/banner'
import navBar from '@/component/home/navBar'
import AblumList from '@/component/home/ablumList'
import DjList from '@/component/home/djList'
import MvList from '@/component/home/mvList'
import XdsjList from '@/component/home/xdsjList'
import RmgsList from '@/component/home/rmgsList'
import BottomLoading from '@/component/common/bottomLoading'
export default {
  name: 'Home',
  components:{
    Banner,
    navBar,
    AblumList,
    DjList,
    MvList,
    XdsjList,
    RmgsList,
    BottomLoading
  },
  data(){
    return{
      showContent:false,
      banners:[],  //轮播图
      tjgdList:[],  //推荐歌单
      djprogramList:[],  //热门电台
      mvList:[], // 最新mv
      rmgsList:[] //热门歌手
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.$http.all([
        this.$http.get('/banner'),
        this.$http.get('/personalized'),
        this.$http.get('/personalized/djprogram'),
        this.$http.get('/personalized/mv'),
        this.$http.get('/top/artists?offset=0&limit=4'),
      ])
      .then(this.$http.spread( (banner, tjgdList,djprogram,mv,rmgs) => {
        this.showContent = true
        this.getbannerResult(banner)
        this.getTjgdListResult(tjgdList)
        this.getDjprogram(djprogram)
        this.getMvs(mv)
        this.getRmgs(rmgs)
      }))
    },
    //获取banner成功回调
    getbannerResult(res){
      this.banners = res.data.banners
    },
    //获取推荐歌单成功回调
    getTjgdListResult(res){
      this.tjgdList  = res.data.result.splice(0,6)
    },
    //热门电台成功回调
    getDjprogram(res){
      this.djprogramList = res.data.result.splice(0,6)
    },
    //最新mv
    getMvs(res){
      this.mvList = res.data.result
    },
    //热门歌手
    getRmgs(res){
      this.rmgsList = res.data.artists
      console.log(this.rmgsList)
    }
  }
}
</script>
<style scoped lang="scss">
  .song-group,.mv-group{
    margin-bottom:20px;
  }
</style>
