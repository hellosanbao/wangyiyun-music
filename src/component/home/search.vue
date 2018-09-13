<template>
    <div class="search-box">
        <div class="content flex-between flex-middle">
            <div class="left"><i class="iconfont icon-shangpinliebiaotubiao01"></i></div>
            <div class="center">周杰伦</div>
            <div class="right"><i class="iconfont icon-search"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'swaechHeader',
}
</script>
<style lang="scss" scoped>
@import '~assets/global';
    .content{
        padding: 15px 15px;
        box-sizing: border-box;
        background: #f0f0f0;
        color:#666;
        font-size: 40px;
        .icon-shangpinliebiaotubiao01{
            display: block;
            transform: scale(1.3)
        }
        .center{
            width: 570px;
            height: 50px;
            background: #fff;
            border-radius: 25px;
            font-size: 25px;
            line-height: 50px;
            padding-left: 30px;
            color:#666;
        }
    }
</style>


