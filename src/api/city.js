import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 城市
export function getCity(id) {
  return request({
    url: 'base/adrdict/load',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id
    }
  })
}
// 地铁
export function getSubway(id) {
  return request({
    url: 'base/subway/load',
    method: 'POST',
    data: {
      'token': getToken(),
      'city': id
    }
  })
}
