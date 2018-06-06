import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 热门地址管理
export function getHCityList() {
  return request({
    url: 'app/hotcity/load',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function addHCity(name) {
  return request({
    url: 'app/hotcity/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'cityName': name
    }
  })
}
export function deleteHCity(id) {
  return request({
    url: 'app/hotcity/delete',
    method: 'POST',
    data: {
      'token': getToken(),
      'cityId': id
    }
  })
}
export function updateHCity(data) {
  return request({
    url: 'app/hotcity/update',
    method: 'POST',
    data: {
      'token': getToken(),
      'cityId': data.id,
      'cityName': data.name
    }
  })
}
export function upMoveHCity(id) {
  return request({
    url: 'app/hotcity/mvup',
    method: 'POST',
    data: {
      'token': getToken(),
      'cityId': id
    }
  })
}
export function downMoveHCity(id) {
  return request({
    url: 'app/hotcity/mvdown',
    method: 'POST',
    data: {
      'token': getToken(),
      'cityId': id
    }
  })
}
// 热搜词管理
export function getWordsList() {
  return request({
    url: 'app/hotword/load',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function addWords(name) {
  return request({
    url: 'app/hotword/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'wordText': name
    }
  })
}
export function deleteWords(id) {
  return request({
    url: 'app/hotword/delete',
    method: 'POST',
    data: {
      'token': getToken(),
      'wordId': id
    }
  })
}
export function updateWords(data) {
  return request({
    url: 'app/hotword/update',
    method: 'POST',
    data: {
      'token': getToken(),
      'wordId': data.id,
      'wordText': data.name
    }
  })
}
export function upMoveWords(id) {
  return request({
    url: 'app/hotword/mvup',
    method: 'POST',
    data: {
      'token': getToken(),
      'wordId': id
    }
  })
}
export function downMoveWords(id) {
  return request({
    url: 'app/hotword/mvdown',
    method: 'POST',
    data: {
      'token': getToken(),
      'wordId': id
    }
  })
}
