import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 门店列表查询
export function getShops() {
  return request({
    url: 'shop/list',
    method: 'POST',
    data: {
      'token': getToken()
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
