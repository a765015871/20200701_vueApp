/**
 * ajax 请求函数模块
 * */
import Axios from 'axios'

export default function ajax(url='', data={} , type='GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET'){
      // 准备请求url query 参数数据
      let dataStr = '' //数据拼接
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== ''){
        // 删除最后一个符号
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
    // 发送GET请求
      promise = Axios.get(url)
    }else {
      promise = Axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
