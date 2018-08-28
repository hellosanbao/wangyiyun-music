<template>
    <div class="item">
        <div class="pic tap">
            <img :src="itemData.picUrl" alt="">
            <div class="count" v-if="itemData.playCount">
                <i class="iconfont icon-erji"></i><div class="num">{{itemData.playCount | countFormat}}</div> 
            </div>
        </div>
        <div :class="['txt',{'line-clamp1':type!='ablum','line-clamp2':type=='ablum'}]">{{itemData.copywriter}}</div>
        <div class="name line-clamp1" v-if="type!='ablum'">{{itemData.name}}</div>
    </div>
</template>
<script>
export default {
    name:'AblumItem',
    props:{
        itemData:{
            type:Object,
            required:true
        },
        type:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/global';
    .item{
        width: 100%;
        margin-bottom: 20px;
        .pic{
            position: relative;
            img{
                display: block;
                vertical-align: middle;
                width: 100%;
                border-radius: 6px;
                margin: 9px 0;
            }
            .count{
                position:absolute;
                right:10px;
                top:10px;
                z-index:10;
                color:#fff;
                font-size: 26px;
                height: 40px;
                vertical-align: top;
                .num{
                    display: inline-block;
                    font-size: 22px;
                    margin-left: 6px;
                    margin-top:-12px;
                }
            }
        }
        .name{
            font-size: 22px;
            color:#999;
            margin-top:7px;
        }
    }
</style>
