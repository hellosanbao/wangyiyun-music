<template>
    <div class="nav-bar">
        <div class="navbar-list flex">
            <div class="navbar-item flex1" v-for="(item,index) in navBarList">
                <div class="icon flex-center flex-middle">
                    <i :class="['iconfont',item.icon]"></i>   
                </div>
                <div class="txt">{{item.txt}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'NavBar',
        data(){
            return{
                navBarList:[
                    {
                        icon:'icon-shouyinji',
                        txt:'私人FM'
                    },
                    {
                        icon:'icon-rili',
                        txt:'每日推荐'
                    },
                    {
                        icon:'icon-gedanshouluon',
                        txt:'歌单'
                    },
                    {
                        icon:'icon-paihang',
                        txt:'排行榜'
                    }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
@import '~assets/global';
.navbar-item{
    padding: 40px 0;
    .icon{
        width:90px;
        height:90px;
        border-radius: 50%;
        background: $gbColor;
        margin:0 auto;
        box-shadow: 2px 2px 10px 2px rgba(0,0,0,.2);
        .iconfont{
            font-size: 60px;
            color: #fff;
        }
    }
    .txt{
        margin-top: 10px;
        font-size: 24px;
        color:$gfColor;
        text-align: center;
    }
}
</style>


