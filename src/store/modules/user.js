import { logout, login, getInfo } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    userName: '',
    realName: '',
    merchantName: '',
    superRoleId: '',
    authList: [],
    catalog: {},
    thirdRole: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_UNAME: (state, userName) => {
      state.userName = userName
    },
    SET_RNAME: (state, realName) => {
      state.realName = realName
    },
    SET_MCNAME: (state, merchantName) => {
      state.merchantName = merchantName
    },
    SET_ROLEID: (state, superRoleId) => {
      state.superRoleId = superRoleId
    },
    SET_AUTHLIST: (state, authList) => {
      state.authList = authList
    },
    SET_CATALOG: (state, catalog) => {
      state.catalog = catalog
    },
    SET_THREEROLE: (state, thirdRole) => {
      state.thirdRole = thirdRole
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_AUTHLIST', data.authList)
          commit('SET_UNAME', data.userName)
          commit('SET_RNAME', data.realName)
          commit('SET_MCNAME', data.merchantName)
          commit('SET_ROLEID', data.superRoleId)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
