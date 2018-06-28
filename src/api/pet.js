import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 宠物种类 二级联动
export function getPetVariety(id) {
  return request({
    url: 'pet/variety/list',
    method: 'POST',
    data: {
      'token': getToken(),
      'pid': id
    }
  })
}

