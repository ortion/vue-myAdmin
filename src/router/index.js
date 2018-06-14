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
  },
  {
    path: '/company',
    component: Layout,
    hidden: true,
    children: [{
      path: 'shopManage/shopAdd',
      name: 'shopAdd',
      component: () => import('@/views/company/shopManage/shopAdd'),
      meta: { title: '新建门店' }
    }]
  },
  {
    path: '/company',
    component: Layout,
    hidden: true,
    children: [{
      path: 'companyManage/companyAdd',
      name: 'companyAdd',
      component: () => import('@/views/company/companyManage/companyAdd'),
      meta: { title: '新建企业' }
    }]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 企业
  {
    path: '/company',
    component: Layout,
    name: 'Company',
    alwaysShow: true,
    meta: { title: '企业', icon: 'company', index: '2' },
    children: [
      {
        //  企业管理
        path: 'companyManage',
        name: 'companyManage',
        component: () => import('@/views/company/companyManage/companyManage'),
        meta: { title: '企业管理', index: '2-1' }
      },
      {
        //  企业类型管理
        path: 'companyType',
        name: 'companyType',
        component: () => import('@/views/company/companyType/companyType'),
        meta: { title: '企业类型管理', index: '2-9' }
      },
      {
        //  门店管理
        path: 'shopManage',
        name: 'shopManage',
        component: () => import('@/views/company/shopManage/shopManage'),
        meta: { title: '门店管理', index: '2-2' }
      }
    ]
  },
  // 商品
  {
    path: '/goods',
    component: Layout,
    name: 'Goods',
    alwaysShow: true,
    meta: { title: '商品', icon: 'goods', index: '3' },
    children: [
      {
        //  商品管理
        path: 'goodsManage',
        name: 'goodsManage',
        component: () => import('@/views/goods/goodsManage/goodsManage'),
        meta: { title: '商品管理', index: '3-1' }
      },
      {
        //  商品审核
        path: 'goodsReview',
        name: 'goodsReview',
        component: () => import('@/views/goods/goodsReview/goodsReview'),
        meta: { title: '商品审核', index: '3-2' }
      },
      {
        //  商品分类
        path: 'goodsCategory',
        name: 'goodsCategory',
        component: () => import('@/views/goods/goodsCategory/goodsCategory'),
        meta: { title: '商品分类', index: '3-3' }
      }
    ]
  },
  // 系统
  {
    path: '/system',
    component: Layout,
    name: 'System',
    alwaysShow: true,
    meta: { title: '系统', icon: 'system', index: '8' },
    children: [
      {
        //  热门地址管理
        path: 'hotAddress',
        name: 'hotAddress',
        component: () => import('@/views/system/hotAddress/hotAddress'),
        meta: { title: '热门地址管理', index: '8-1' }
      },
      {
        //  热门搜索管理
        path: 'hotKeyword',
        name: 'hotKeyword',
        component: () => import('@/views/system/hotKeyword/hotKeyword'),
        meta: { title: '热门搜索管理', index: '8-2' }
      },
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
  },

  { path: '*', redirect: '/404', hidden: true }
]
