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
// 保存banner
export function saveBanner(data) {
  return request({
    url: 'app/banner/update',
    method: 'POST',
    data: {
      'token': getToken(),
      'data': data
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

