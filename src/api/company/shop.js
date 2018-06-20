import Vue from 'vue'
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 门店列表查询
export function getShops(query) {
  var data = {
    'token': getToken()
  }
  for (const key in query) {
    if (query[key] !== '') {
      Vue.set(data, key, query[key])
    }
  }
  return request({
    url: 'shop/list',
    method: 'POST',
    data
  })
}

// 增加门店
export function addShop(data) {
  return request({
    url: 'shop/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'mercantId': data.mercantId,
      'name': data.shopname,
      'shopType': data.shopType,
      'introdcution': data.introdcution,
      'province': data.provinceId,
      'city': data.cityId,
      'town': data.districtId,
      'address': data.address,
      'subways': data.subways,
      'imageUrl': data.shoplogoUrl,
      'shopCats': data.goodsType,
      'phone1': data.phone1,
      'phone2': data.phone2
    }
  })
}
export function getShopDetail(id) {
  return request({
    url: 'shop/detail',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id
    }
  })
}
export function deleteShop(id) {
  return request({
    url: 'shop/delete',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id
    }
  })
}
export function stopShop(id, text) {
  return request({
    url: 'shop/stop',
    method: 'POST',
    data: {
      'token': getToken(),
      'id': id,
      'whyStop': text
    }
  })
}
