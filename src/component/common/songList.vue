<template>
    <div class="list-content">
        <div class="list-head flex-between">
            <div class="play-content flex-middle">
                <i class="iconfont icon-bofang"></i>
                <div class="txt">播放全部<span>(共{{songList.length}}首)</span></div>
            </div>
            <div class="save-content flex-middle">
                <i class="iconfont icon-jia"></i>
                <div class="txt">收藏（{{collect}}）</div>
            </div>
        </div>
        <div class="list-body">
            <div class="item flex-between" v-for="(item,index) in songList" @click="dispatchcgflae({item,songList,index})">
                <div :class="['tip','iconfont',{'cur':(curSongIndex==index)}]">{{(curSongIndex==index)?'&#xe63d;':(index+1)}}</div>
                <div class="song flex1 flex-middle flex-center;">
                    <div class="song-info flex1">
                        <div class="name line-clamp1"> {{item.name}}</div>
                        <div class="auth flex-middle"><i class="iconfont icon-sq" v-if="item.isSq"></i><div class="line-clamp1">{{item.auth}}</div></div>
                    </div>
                    <div class="ctrl-btn flex">
                        <i class="iconfont icon-shipinbofangyingpian" v-if="item.mv"></i> 
                        <i class="iconfont icon-more"></i> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name:'SongList',
    props:{
        songList:{
            type:Array,
            required:true
        },
        collect:{
            type:Number,
            default:0
        }
    },
    computed:{
        ...mapState(['curSongIndex','isPlay'])
    },
    methods:{
        ...mapActions(['dispatchcgflae']),
    }
}
</script>

<style lang="scss" scoped>
    @import '~assets/global';
    .list-content{
        background: #fff;
        border-radius: 20px 20px 0 0;
        overflow: hidden;
        .list-head{
            height: 80px;
            border-bottom: 1px solid #f0f0f0;
            .play-content{
                padding: 0 30px;
                .txt{
                    font-size: 30px;
                    color:#333;
                    span{
                        font-size: 24px;
                        color:#999;
                        margin-left: 5px;
                    }
                }
                .icon-bofang{
                    font-size: 45px;
                    color:#333;
                }
            }
            .save-content{
                font-size: 30px;
                padding: 0 30px;
                background: $gbColor;
                color:#fff;
                .icon-jia{
                    font-size: 40px;
                }
            }
        }
        .list-body{
            .item{
                .tip{
                    width: 100px;
                    height: 100px;
                    text-align: center;
                    line-height: 100px;
                    &.cur{
                        color:$gbColor;
                    }
                }
                .song{
                    border-bottom: 1px solid #f0f0f0;
                    .name{
                        font-size: 30px;
                    }
                    .auth{
                        font-size: 22px;
                        color:#999;
                        .iconfont{
                            font-size: 30px;
                            color:$gbColor;
                            margin-right:5px;
                        }
                    }
                }
                .ctrl-btn{
                    color:#999;
                    .icon-more{
                        display: block;
                        width: 80px;
                        height: 100px;
                        line-height: 100px;
                        font-size: 40px;
                        text-align: center;
                    }
                    .icon-shipinbofangyingpian{
                        display: block;
                        width: 80px;
                        height: 100px;
                        line-height: 100px;
                        font-size: 35px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
