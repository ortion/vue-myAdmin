import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 门店列表查询
export function getShops(query) {
  return request({
    url: 'shop/list',
    method: 'POST',
    data: {
      'token': getToken(),
      'curPage': query.currentPage,
      'pageSize': query.pageSize

    }
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
