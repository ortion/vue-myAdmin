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
export function getGoodsCList() {
  return request({
    url: 'shopcat/list',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
