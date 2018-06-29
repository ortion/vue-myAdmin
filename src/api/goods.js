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
// 商品管理
export function getGoodsList(query) {
  var data = {
    'token': getToken()
  }
  for (const key in query) {
    if (query[key] !== '') {
      Vue.set(data, key, query[key])
    }
  }
  return request({
    url: 'goods/list',
    method: 'POST',
    data
  })
}
export function getGoodsDetail(id) {
  return request({
    url: 'goods/detail',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNo': id
    }
  })
}
export function addGoods(data) {
  return request({
    url: 'goods/add',
    method: 'POST',
    data: {
      'token': getToken(),
      'name': data.name,
      'pcat': data.pcat,
      'cat': data.cat,
      'masterPicUrl': data.masterPicUrl,
      'pics': data.pics,
      'introduction': data.introduction,
      'skus': data.skus
    }
  })
}
// 状态切换
export function onGoods(list) {
  return request({
    url: 'goods/onshelf',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNos': list
    }
  })
}
export function offGoods(list) {
  return request({
    url: 'goods/offshelf',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNos': list
    }
  })
}
export function submitReviewGoods(id) {
  return request({
    url: 'goods/submitaudit',
    method: 'POST',
    data: {
      'token': getToken(),
      'no': id
    }
  })
}
export function deleteGoods(id) {
  return request({
    url: 'goods/delete',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNo': id
    }
  })
}
// 商品审核

export function getGoodsRList(query) {
  var data = {
    'token': getToken()
  }
  for (const key in query) {
    if (query[key] !== '') {
      Vue.set(data, key, query[key])
    }
  }
  return request({
    url: 'goods/auditlist',
    method: 'POST',
    data
  })
}

export function stopGoods(id) {
  return request({
    url: 'goods/stop',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNos': id
    }
  })
}
export function openGoods(id) {
  return request({
    url: 'goods/open',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNo': id
    }
  })
}
export function reviewGoods(id, status) {
  return request({
    url: 'goods/audit',
    method: 'POST',
    data: {
      'token': getToken(),
      'goodsNos': id,
      'auditStatus': status
    }
  })
}
