import axios from 'axios'
let domain = 'http://music.mendada.cn/api'
export default  {
    ...axios,
    get(){
        let url = domain + arguments[0]
        return axios.get(url)
    },
    post(){
        let url = domain + arguments[0]
        let data = arguments[1]
        return axios.post(url,data)
    }
}