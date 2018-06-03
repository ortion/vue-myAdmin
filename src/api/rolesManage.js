import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function getRoleList() {
  return request({
    url: 'role/load',
    method: 'POST',
    data: {
      'token': getToken()
    }
  })
}
export function deleteRoles(roleId) {
  return request({
    url: 'role/delete',
    method: 'post',
    data: {
      'token': getToken(),
      'roleId': roleId
    }
  })
}
export function loadRoles() { // 角色增加时加载角色信息
  return request({
    url: 'role/add/load',
    method: 'post',
    data: {
      'token': getToken()
    }
  })
}
export function loadRolesUpate(roleId) { // 角色修改时加载角色原信息
  return request({
    url: 'role/update/load',
    method: 'post',
    data: {
      'token': getToken(),
      'roleId': roleId
    }
  })
}
export function addRoles(data) {
  return request({
    url: 'role/add',
    method: 'post',
    data: {
      'token': getToken(),
      'roleName': data.roleName,
      'merchantTypeId': data.merchant,
      'authIds': data.checkedID
    }
  })
}
export function updateRoles(roleId, data) {
  return request({
    url: 'role/update',
    method: 'post',
    data: {
      'token': getToken(),
      'roleId': roleId,
      'roleName': data.roleName,
      'merchantTypeId': data.merchant,
      'authIds': data.checkedID
    }
  })
}
