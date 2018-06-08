import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// banner管理
export function getBannerList() {
  return request({
    url: 'app/banner/load',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function addBanner(data) {
  return request({
    url: 'app/banner/update',
    method: 'POST',
    data: {
      'token': getToken(),
      'data': data

    }
  })
}
