<template>
<div class="album-content">
    <div class="ablumItemBox flex-middle" v-for="item in ablumlist">
        <div class="img" :style="{backgroundImage:`url(${item.cover})`}">
            <i class="iconfont icon-iconfontguangpan"></i>
        </div>
        <div class="txt flex1">
            <div class="name line-clamp1">{{item.name}}</div>
            <div class="auth line-clamp1">{{item.auth}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'AlbumList',
    props:['ablumlist']
}
</script>

<style scoped lang="scss">
.ablumItemBox{
    .img{
        width:100px;
        height:100px;
        background:no-repeat center/cover #e0e0e0;
        position: relative;
        flex: 0 0 100px;
        margin: 8px 15px;
        box-shadow: 0 0 4px 2px rgba(156, 155, 155, 0.07);
        .iconfont{
            position: absolute;
            left: 20px;
            top:0;
            font-size: 100px;
            display: block;
            height: 100px;
            line-height: 84px;
            z-index: -1;
        }
    }
    .txt{
        width: 114px;
        padding: 5px;
        margin-left: 10px;
        border-bottom: 1px solid #f0f0f0;
        .name{
            font-size: 28px;
            color:#397eff;
        }
        .auth{
            color:#888;
            font-size: 22px;
            margin-top: 5px;
        }
    }
}
</style>

