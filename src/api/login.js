import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function login(userName, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: 'user/getinfo',
    method: 'post',
    data: {
      token
    }
  })
}

export function logout(token) {
  return request({
    url: 'logout',
    method: 'post',
    data: {
      token
    }
  })
}
export function updatePassword(data) {
  return request({
    url: 'basepassword',
    method: 'post',
    data: {
      'token': getToken(),
      'password': data.oldPass,
      'newPassword': data.newPass
    }
  })
}
