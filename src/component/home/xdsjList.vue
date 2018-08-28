<template>
    <div class="ablum-content">
        <div class="title">{{title}}</div>
        <div class="detail">
            <img class="pic" src="http://p1.music.126.net/yOBzrSI9ggi8xDKK0Z2lsQ==/109951163460659311.jpg" alt="">
            <div class="desc line-clamp2">【一周音乐视频榜】第36期：那些暴露年龄的流行歌曲，你听过几首？</div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'XdsjList',
        props:{
            list:{
                type:Array,
                required:true,
            },
            title:{
                type:String,
                default:'列表标题'
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '~assets/global';
    .ablum-content{
        padding: 0 15px;
        box-sizing: border-box;
        border-top:10px solid #e0e0e0;
        border-bottom:10px solid #e0e0e0;
        .title{
            font-size: $titleFontSize;
            font-weight: 700;
            color: $titleColor;
            margin-bottom: 10px;
            height:70px;
            line-height: 70px;
            .iconfont{
                font-size: $titleFontSize;
                color: #666;
            }
        }
        .detail .pic{
            width:100%;
            vertical-align: middle;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .detail .desc{
            font-size: 30px;
            color:#444;
        }
    }
</style>



