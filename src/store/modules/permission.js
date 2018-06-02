import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta.index) {
//     return roles.some(role => route.meta.index.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    console.log(roles)
    // for (const key of roles) {
    //   if (hasPermission(key, route)) {
    //     if (route.children && route.children.length) {
    //       route.children = filterAsyncRouter(route.children, roles[key])
    //       // if (hasPermission(keys, route)) {
    //       //   return true
    //       // }
    //     }
    //     return true
    //   }
    // }

    // if (hasPermission(roles, route)) {
    //   if (route.children && route.children.length) {
    //     route.children = filterAsyncRouter(route.children, roles)
    //   }
    //   return true
    // }
    return false
  })

  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRouters
        if (data.superRoleId.indexOf('superf85455305c3f445f93047ecd838') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, data.catalog)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
