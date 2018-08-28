<template>
    <div class="ablum-content">
        <div class="title">{{title}} <i class="iconfont icon-next"></i></div>
        <div class="mv-list">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(slide, index) in list" :key="index">
                    <div class="mv-item">
                        <a href="javascript:;"><img v-lazy="slide.picUrl" alt=""></a>
                        <div class="v-cover">
                            <i class="iconfont icon-bofang vPlay"></i>
                            <div class="name line-clamp1">{{slide.artistName}}</div>
                            <div class="vCount flex-middle">
                                <i class="iconfont icon-shipin"></i><div class="num">{{slide.playCount | countFormat}}</div> 
                            </div> 
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
    export default {
        name:'MvList',
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
                swiperOption: {
                    spaceBetween : 5,
                    slidesPerView:1.6,
                    freeMode : true,
                    freeModeMomentumBounce : false,
                },
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
            margin-bottom: 10px;
            .iconfont{
                font-size: $titleFontSize;
                color: #666;
            }
        }
        .mv-list{
            margin-top:20px;
            .mv-item{
                width: 100%;
                padding-top: 56%;
                background:red;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                    position: absolute;
                    left: 0;
                    top:0;
                }
                .v-cover{
                    position: absolute;
                    left: 0;
                    top:0;
                    width: 100%;
                    height:100%;
                    background: rgba(0,0,0,.3);
                    .vPlay{
                        position: absolute;
                        left:50%;
                        top:50%;
                        transform: translate(-50%,-50%);
                        color: #fff;
                        font-size: 70px;
                    }
                    .name{
                        width: 90%;
                        position: absolute;
                        left: 5%;
                        bottom:5%;
                        color: #fff;
                    }
                    .vCount{
                        position: absolute;
                        right: 10px;
                        top:10px;
                        color: #fff;
                        .icon-shipin{
                            font-size: 35px;
                        }
                        .num{
                            font-size: 20x;
                            margin-left: 6px;
                        }
                    }
                }
            }
        }
    }
</style>



