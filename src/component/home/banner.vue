<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in banners" :key="index">
        <a :href="slide.url"><img :src="slide.picUrl" alt=""></a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// import Swiper from 'swiper'
export default {
    name: 'Banner',
    props:{
        banners:{
            type:Array,
            required:true     
        }
    },
    data(){
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                loop:true,
                 autoplay: {
                    delay: 3000,//3秒切换一次
                },
            },
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .swiper-container {
        width: 750px;
        height: 345px;
        img{
            vertical-align: middle;
            width:100%;
            height:100%;
        }
        .swiper-pagination{
            width:750px;
            height: 30px;
        }
    }  
</style>
