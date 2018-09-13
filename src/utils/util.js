/**
 * 判断变量类型
 * @param { any } o //需要判断的变量值
 * @return { String } // 返回值 Array:数组、[]:空数组、Object：对象、{}：空对象、String：字符串、Function：函数
*/
function _typeOf(o){
    let _pro = Object.prototype.toString.call(o)
    let res = ''
    switch (_pro) {
        case '[object Array]':
            res = 'Array'
            if(o.length == 0){
                res = '[]'
            }
            break;
        case '[object Object]':
            res = 'Object'
            if(JSON.stringify(o) === '{}'){
                res = '{}'
            }
            break;
        case '[object String]':
            res = 'String'
            break;
        case '[object Function]':
            res = 'Function'
            break;
        default:
            break;
    }
    return res;
}
export default {
    _typeOf
}