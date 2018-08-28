import Vue from 'vue'

//数量格式化过滤器
Vue.filter('countFormat', function (value) {
    let res = value
    if(value>100000000){
        res = (value/100000000).toFixed(1) + '亿'
    }else if(value>10000){
        res = (value/10000).toFixed(1) + '万'
    }
    return res
})
