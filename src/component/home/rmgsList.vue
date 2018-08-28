<template>
    <div class="ablum-content">
        <div class="title">{{title}} <i class="iconfont icon-next"></i></div>
        <div class="gslist">
            <div class="item flex-middle" v-for="(item,index) in list" :key="index+'rmgs'">
                <div class="left">
                    <img class="avatar" v-lazy="item.img1v1Url" alt="">
                </div>
                <div class="right">
                    <div class="name">{{item.name}}</div>
                    <div class="count">专辑：{{item.albumSize}}  歌曲：{{item.musicSize}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'RmgsList',
        props:{
            list:{
                type:Array,
                required:true,
            },
            title:{
                type:String,
                default:'列表标题'
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '~assets/global';
    .ablum-content{
        padding: 0 15px;
        box-sizing: border-box;
        .title{
            font-size: $titleFontSize;
            font-weight: 700;
            color: $titleColor;
            margin-bottom: 20px;
            .iconfont{
                font-size: $titleFontSize;
                color: #666;
            }
        }
        .gslist {
            .item{
                border-bottom: 1px solid #ededed;
                padding: 15px 0;
                .left{
                    width: 120px;
                    height:120px;
                    .avatar{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .right{
                    margin-left: 25px;
                    .name{
                        font-size: 30px;
                    }
                    .count{
                        font-size: 25px;
                        color:#666;
                        margin-top: 8px;
                    }
                }
            }
        }
    }
</style>



