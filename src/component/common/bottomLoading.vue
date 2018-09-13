<template>
    <div class="bottom-loading flex-middle flex-center" :style="{background:type?'none':'#ebebeb'}">
        <div v-if="!noMore" class="flex-center flex-middle"><span v-if="!type"> 加载中 </span><div class="bottom-loader"></div></div>
        <div v-if="noMore && !type" class="no-more">到底了~</div>
    </div>
</template>
<script>
export default {
  name: "BottomLoading",
  props: {
    noMore: {
      type: Boolean,
      default: false
    },
    type:{
      type:String,
      default:''
    }
  }
};
</script>
<style>
.bottom-loading {
  height: 100px;
  text-align: center;
  color: #999;
  overflow: hidden;
}
.bottom-loader {
  width: 60px;
  height: 60px;
  background: url("../../assets/page-loading.svg")
    no-repeat center/cover;
}
</style>


