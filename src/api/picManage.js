import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// banner管理
export function getBannerPic() {
  return request({
    url: 'app/banner/picload',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
// 上传阿里云
export function uploadAli() {
  return request({
    url: 'app/banner/getoken',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
// 上传服务器
export function uploadBannerPic(data) {
  return request({
    url: 'app/banner/picupload',
    method: 'POST',
    data: {
      'token': getToken(),
      'picList': data
    }
  })
}
// 删除
export function deleteBannerPic(data) {
  return request({
    url: 'app/banner/picdelete',
    method: 'POST',
    data: {
      'token': getToken(),
      'picList': data
    }
  })
}
// icon管理
export function getIconPic() {
  return request({
    url: 'app/palace/picload',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function uploadIconPic(data) {
  return request({
    url: 'app/palace/picupload',
    method: 'POST',
    data: {
      'token': getToken(),
      'picList': data
    }
  })
}
export function deleteIconPic(data) {
  return request({
    url: 'app/palace/picdelete',
    method: 'POST',
    data: {
      'token': getToken(),
      'picList': data
    }
  })
}
// 门店管理/商品
export function getBasePic(type) {
  return request({
    url: 'base/picload',
    method: 'POST',
    data: {
      'token': getToken(),
      'type': type
    }
  })
}
export function uploadBasePic(type, data) {
  return request({
    url: 'base/picupload',
    method: 'POST',
    data: {
      'token': getToken(),
      'type': type,
      'picList': data
    }
  })
}
export function deleteBasePic(data) {
  return request({
    url: 'base/picdelete',
    method: 'POST',
    data: {
      'token': getToken(),
      'picList': data
    }
  })
}
