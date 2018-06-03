import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home', noCache: true }
    }]
  },
  {
    path: '/system',
    component: Layout,
    hidden: true,
    children: [{
      path: 'rolesManage/rolesAdd',
      name: 'rolesAdd',
      component: () => import('@/views/system/rolesManage/rolesAdd'),
      meta: { title: '权限管理' }
    }]

  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    name: 'System',
    alwaysShow: true,
    meta: { title: '系统', icon: 'system', index: '8' },
    children: [
      //  APP首页管理
      {
        path: 'APPindexManage',
        name: 'APPindexManage',
        component: () => import('@/views/system/APPindexManage/index'),
        meta: { title: 'APP首页管理', index: '8-3' }
      },
      {
        //  权限管理
        path: 'rolesManage/rolesList',
        name: 'rolesList',
        component: () => import('@/views/system/rolesManage/rolesList'),
        meta: { title: '权限管理', index: '8-5' }
      }

    ]
  }
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',

  //   meta: { title: 'Example', icon: 'example', index: '2' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',

  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table', index: '2-1' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',

  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree', index: '2-2' }
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',

  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'form', icon: 'form', index: '2-3' }
  //     }
  //   ]
  // }
  // { path: '*', redirect: '/404', hidden: true }
]
