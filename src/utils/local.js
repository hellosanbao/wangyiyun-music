import util from './util'

/**
 * 存localStorage
 * @param { String } key  sotrage键名
 * @param { any } value   storage键值
 * 例：setLocalStorage('aaa',123)
*/
export function setLocalStorage(key,value){
    const type = util._typeOf(value)
    if(type == 'Object' || type == 'Array'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}
/**
 * 取localStorage
 * @param { String } key  sotrage键名
 * 例：getLocalStorage('aaa')
*/
export function getLocalStorage(key){
    let value = window.localStorage.getItem(key)
    try{
        value = JSON.parse(value)
    }catch(err){}
    return value
}
/**
 * 移除localStorage
 * @param { String } key  sotrage键名
 * 例：removeLocalStorage('aaa')
*/
export function removeLocalStorage(key){
    window.localStorage.removeItem(key)
}