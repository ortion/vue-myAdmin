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
export function addCompany(data) {
  return request({
    url: 'company/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'name': data.companyname,
      'companyType': data.companyType,
      'province': data.provinceId,
      'city': data.cityId,
      'town': data.districtId,
      'licence': data.licence,
      'corporation': data.corporation,
      'corporationPhone': data.corporationPhone,
      'licencePicUrl': data.licencePicUrl,
      'charge': data.charge,
      'chargePhone': data.chargePhone,
      'chargeSex': data.chargeSex,
      'accountBank': data.accountBank,
      'accountNo': data.accountNo,
      'accountName': data.accountName,
      'wechatNo': data.wechatNo,
      'alipayNo': data.alipayNo
    }
  })
}
