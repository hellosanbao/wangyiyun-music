<template>
    <div class="search-page">
        <div class="header flex-between flex-middle">
            <div class="back extr-click tap" @click="$router.go(-1)"><i class="iconfont icon-prev"></i></div>
            <form class="flex1" @submit.prevent="search(keyword)" action="">
                <input class="search-input" type="search" v-model="keyword" placeholder="输入歌手、歌名、专辑名、歌词">
            </form>
            <div class="cancel extr-click tap" v-if="isResult" @click="cancel"><i class="iconfont icon-close"></i></div>
        </div>
        <div class="search-init" v-if="!isResult">
            <div class="search-content">
                <div class="song-menu flex-center flex-middle tap">
                    <i class="iconfont icon-user"></i> <span>歌手分类</span> <i class="iconfont icon-next"></i>
                </div>
                <div class="hot-search">
                    <div class="title">热门搜索</div>
                    <div class="item-list">
                        <div class="item tap" v-for="hot in hotSearch" @click="search(hot.first)">{{hot.first}}</div>
                    </div>
                </div>
                <div class="history-search" v-if="historySearch.length">
                    <div class="history-item tap flex-middle" v-for="(item,index) in historySearch" @click="search(item)">
                        <i class="iconfont icon-jilu"></i>
                        <div class="txt flex1">{{item}}</div>
                        <i class="iconfont icon-close extr-click" @click.stop="deleteHistory(index)"></i>
                    </div>
                    <div class="clear-history flex-center">
                        <div class="extr-click" @click="clearhistory">清除历史记录</div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="search-result" v-if="isResult">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- 单曲 -->
                <swiper-slide>
                    <div class="loading" v-if="!songList.length">
                        <BottomLoading type="justLoaing"/>
                    </div>
                    <songList v-if="songList.length" :songList="songList" :audioPlay="audioPlay" :curSongIndex='curSongIndex' :changeCurSongIndex="changeCurSongIndex"/>
                </swiper-slide>
                <!-- 专辑 -->
                <swiper-slide>
                    <div class="loading" v-if="!albumList.length">
                        <BottomLoading type="justLoaing"/>
                    </div>
                    <albumList v-if="albumList.length" :ablumlist="albumList" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import { setLocal, getLocal, removeLocal, util } from '@/utils/index'
import songList from '@/component/search/songList'
import albumList from '@/component/search/album'
import BottomLoading from '@/component/common/bottomLoading'
export default {
    name:'SearchPage',
    props:['audioPlay','changeCurSongIndex','curSongIndex'],
    data(){
        const that = this
        return{
            swiperOption: {
                on:{
                    slideChangeTransitionStart(){
                       switch(this.activeIndex){
                            case 1:
                                if(!that.albumList.length){
                                    that.searchAlbum(1)
                                }
                            break;
                        }
                    },
                }
            },
            hotSearch:getLocal('hotSearch')  || [],         //热搜
            historySearch:getLocal('historySearch') || [], //历史搜索
            keyword:'',                                    //搜索关键词
            isResult:false,                                 //搜索结果
            limit:30,                                       //每页的数量
            songList:[],                                    //单曲列表
            albumList:[]                                    //专辑列表
        }
    },
    components:{
        songList,
        albumList,
        BottomLoading
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            if(this.hotSearch.length<=0){
                this.getHotSearch()
            }
        },
        // 获取热搜
        getHotSearch(){
            this.$http.get('/search/hot').then((res)=>{
                this.hotSearch = res.data.result.hots
            })
        },
        //搜索
        search(key){
            if(!key) return
            this.keyword = key
            if(this.historySearch.indexOf(key)<0){
                this.historySearch.unshift(key)
                this.historySearch = this.historySearch.slice(0,9)
                setLocal('historySearch',this.historySearch)
            }
            this.isResult = true
            this.searchSong(0)
        },
        //搜索接口请求
        getSearchResult(type,page){
            return this.$http.get(`/search?keywords=${this.keyword}&type=${type}`)
        },
        //删除历史记录
        deleteHistory(index){
            this.historySearch.splice(index,1)
        },
        //清除历史记录
        clearhistory(){
            this.historySearch = []
            removeLocal('historySearch')
        },
        //取消搜索
        cancel(){
            this.isResult = false
            this.keyword = ''
            this.songList = []
            this.albumList = []
        },
        //搜索歌曲
        searchSong(page){
            this.getSearchResult(1,page).then((res)=>{
                this.songList = this.songList.concat(this.formatSongList(res.data.result.songs))
            })
        },
        //搜索专辑
        searchAlbum(page){
            this.getSearchResult(10,page).then((res)=>{
                this.albumList = this.albumList.concat(this.formatSongList(res.data.result.albums))
                console.log(this.albumList)
            })
        },
        //格式化歌曲列表
        formatSongList(list){
            let songArray = []
            list.forEach(item => {
                let song = {
                    name:item.name,
                    auth:item.artists[0].name,
                    mv:item.mvid,
                    id:item.id,
                    cover:item.blurPicUrl
                }
                songArray.push(song)
            });
            return songArray
        }
    }
}
</script>
<style scoped lang="scss">
.search-page{
    position: fixed;
    left: 0;
    top:0;
    right:0;
    bottom:0;
    .header{
        padding: 15px;
        background: #f0f0f0;
        overflow: hidden;
        .back{
            padding-right:10px;
            font-size: 50px;
            color:#666;
        }
        .cancel{
            padding-left:10px;
            font-size: 30px;
            color:#666;
        }
        .search-input{
            width: 100%;
            height: 60px;
            border-radius: 30px;
            line-height: 60px;
            border:none;
            // border:1px solid #e0e0e0;
            background: #fff;
            text-indent: 30px;
        }
    }
    .search-content{
        .song-menu{
            color:#666;
            font-size: 26px;
            border-bottom:1px solid #f0f0f0;
            padding: 15px 0 ;
            .iconfont{
                font-size: 40px;
            }
            span{
                padding-left: 10px;
            }
        }
        .hot-search{
            .title{
                font-size: 20px;
                color:#999;
                padding: 15px 20px;
                margin-top: 20px;
            }
            .item-list{
                box-sizing: border-box;
                padding: 0 20px;
                font-size: 24px;
                .item{
                    display: inline-block;
                    border:1px solid #e0e0e0;
                    padding: 5px 20px;
                    border-radius: 30px;
                    margin: 10px;
                    color:#444;
                }
            }
        }
        .history-search{
            margin-top: 20px;
            .history-item{
                border-bottom:1px solid #f0f0f0;
                height: 70px;
                padding:0 20px;
                box-sizing: border-box;
                color:#444;
                font-size: 26px;
                .iconfont{
                    color:#999;
                }
                .icon-jilu{
                    font-size: 40px;
                }
                .icon-close{
                    font-size: 26px;
                }
                .txt{
                    padding: 0 20px;
                }
            }
            .clear-history{
                font-size: 24px;
                color:#999;
                text-align: center;
                margin-top: 30px;
            }
        }
    }
    .search-result{
        position: fixed;
        left: 0;
        top:102px;
        right:0;
        bottom:0;
        .loading{
            padding-top:40px; 
        }
        .swiper-container,.swiper-wrapper,.swiper-slide{
            height: 100%;
            overflow-y: scroll;
        }
    }
}
</style>

