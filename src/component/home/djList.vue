<template>
    <div class="ablum-content">
        <div class="title">{{title}} <i class="iconfont icon-next"></i></div>
        <div class="list flex-content flex-between">
            <AblumItem :itemData="item" v-for="(item,index) in list" :key="index+'item'"/>
        </div>
    </div>
</template>
<script>
    import AblumItem from '@/component/common/ablumItem'
    export default {
        name:'DjList',
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
        components:{
            AblumItem
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
        .item{
            width: 234px;
            margin-bottom: 20px;
            .pic{
                position: relative;
                img{
                    display: block;
                    vertical-align: middle;
                    width: 234px;
                    height:234px;
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
    }
</style>



