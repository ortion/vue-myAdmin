import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 商品分类
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

