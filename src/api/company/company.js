import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 企业类型管理
export function getTypelist() {
  return request({
    url: 'company/typelist',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function addType(name) {
  return request({
    url: 'company/typeadd',
    method: 'POST',
    data: {
      'token': getToken(),
      'name': name
    }
  })
}
export function updateType(data) {
  return request({
    url: 'company/typeupdate',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': data.id,
      'name': data.name
    }
  })
}
export function deleteType(id) {
  return request({
    url: 'company/typedelete',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id
    }
  })
}
// 企业增加
export function addCompany(id) {
  return request({
    url: 'company/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id
    }
  })
}
