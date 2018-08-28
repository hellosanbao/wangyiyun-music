<template>
    <div class="bottom-loading flex-middle flex-center">
        <div v-if="!noMore" class="flex-center flex-middle">加载中 <div class="bottom-loader"></div></div>
        <div v-if="noMore"class="no-more">到底了~</div>
    </div>
</template>
<script>
export default {
  name: "BottomLoading",
  props: {
    noMore: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.bottom-loading {
  height: 100px;
  background: #ebebeb;
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


