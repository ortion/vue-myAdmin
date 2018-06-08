const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 用户信息
  token: state => state.user.token,
  userName: state => state.user.userName,
  realName: state => state.user.realName,
  merchantName: state => state.user.merchantName,
  thirdRole: state => state.user.thirdRole,
  catalog: state => state.user.catalog,
  authList: state => state.user.authList,
  superRoleId: state => state.user.superRoleId,
  // 权限
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // app首页管理
  bannerlist: state => state.system.bannerlist,
  updatebannerStatus: state => state.system.updatebannerStatus,
  updateiconStatus: state => state.system.updateiconStatus
}
export default getters
