import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { // getToken()
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.authList.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          if (res.data.authList && res.data.authList.length > 0) { // 验证返回的authList是否是一个非空数组
            const authList = res.data.authList
            const catalogList = {}
            const thirdRole = {}
            authList.map(firstItem => {
              if (firstItem.level === 1) {
                catalogList[firstItem.authSign] = []
                firstItem.children.map(secondItem => {
                  if (secondItem.level === 2) {
                    catalogList[firstItem.authSign].push(secondItem.authSign)
                    thirdRole[secondItem.authSign] = []
                    secondItem.children.map(thirdItem => {
                      if (thirdItem.level === 3) {
                        thirdRole[secondItem.authSign].push(thirdItem.authSign)
                      }
                    })
                  }
                })
              }
            })
            store.commit('SET_THREEROLE', thirdRole)
            const superRoleId = res.data.superRoleId
            store.dispatch('GenerateRoutes', { catalogList, superRoleId }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          } else {
            Message.error('getInfo: 用户权限表不能为空!')
          }
        }).catch((err) => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证失败, 请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
      // var arr = Object.keys(store.getters.authList.catalog)
      // console.log(arr)
      // if (arr.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   const catalog = store.getters.authList.catalog
      //   const superRoleId = store.getters.superRoleId
      //   store.dispatch('GenerateRoutes', { catalog, superRoleId }).then(() => { // 根据roles权限生成可访问的路由表
      //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //   })
      // } else {
      //   next()
      // }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
