import Vue from 'vue'
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 商品分类 二级联动
export function getCategory(id) {
  return request({
    url: 'goods/cat/list',
    method: 'POST',
    data: {
      'token': getToken(),
      'pid': id
    }
  })
}

// 商品类目管理
export function getGoodsCList(query) {
  return request({
    url: 'shopcat/list',
    method: 'POST',
    data: {
      'token': getToken(),
      'curPage': query.curPage,
      'pageSize': query.pageSize
    }
  })
}
export function UpdateGoodsCate(data) {
  return request({
    url: 'shopcat/update',
    method: 'POST',
    data: {
      'token': getToken(),
      'pcat': data.pcat,
      'cat': data.cat,
      'catName': data.catName,
      'shopIds': data.shopIds
    }
  })
}
export function addFirstCate(name) {
  return request({
    url: 'goods/cat/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'name': name
    }
  })
}
export function addSecondCate(data) {
  return request({
    url: 'shopcat/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'pcat': data.pcat,
      'cat': data.cat,
      'catName': data.catName,
      'shopIds': data.shopIds
    }
  })
}
export function deleteGoodsCate(pcat, cat) {
  return request({
    url: 'shopcat/delete',
    method: 'POST',
    data: {
      'token': getToken(),
      'pcat': pcat,
      'cat': cat
    }
  })
}
// 筛选可用门店
export function getValidShops(query) {
  var data = {
    'token': getToken()
  }
  for (const key in query) {
    if (query[key] !== '') {
      Vue.set(data, key, query[key])
    }
  }
  return request({
    url: 'shopcat/validshops',
    method: 'POST',
    data
  })
}
