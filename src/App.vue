<template>
  <div id="app">
    <router-view/>
    <AudioPlay v-if="songMsg"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AudioPlay from '@/component/common/AudioPlay'
export default {
  name: 'App',
  computed:{
    ...mapState(['songMsg'])
  },
  components:{
    AudioPlay
  }
}
</script>

<style>
html{
  background: #fff;
}
</style>
