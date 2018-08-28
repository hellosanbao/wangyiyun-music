import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    isPlay:false,   //是否播放音乐
    songMsg:null,   //当前歌曲信息
    curSongIndex:-1, //当前播放歌曲在歌曲列表中的索引
    songList:[], //当前播放列表
}
const mutations = {
    //更换歌曲信息
    selectPlaySong(state,songMsg) {
        state.songMsg=songMsg;
    },
    //更换歌曲列表
    changeSongList(state,songlist){
        state.songList=songlist;
    },
    //播放、暂停歌曲
    changePlayeState(state,flg){
        state.isPlay=flg;
    },
    //当前歌曲在歌曲列表中的索引
    changeCurSongIndex(state,index){
        state.curSongIndex=index;
    },
    cheangePlayType(state){
        state.playType++;
        if(state.playType>state.palyTypeArr.length-1){
            state.playType=0;
        }
    }
}
const actions = {
    //选择歌曲
    dispatchcgflae({commit,state},{item,songList,index}){
        commit('changePlayeState',true);
        commit('selectPlaySong',item);
        commit('changeCurSongIndex',index);
        commit('changeSongList',songList);
    }
}
const store =  new Vuex.Store({
    state,
    mutations,
    actions
})

export default store
