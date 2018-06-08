const system = {
  state: {
    bannerlist: '',
    updatebannerStatus: false,
    updateiconStatus: false
  },

  mutations: {
    SET_BANNERLIST: (state, bannerlist) => {
      state.bannerlist = bannerlist
    },
    UPDATEBANNER_STATUS: (state, updatebannerStatus) => {
      state.updatebannerStatus = updatebannerStatus
    },
    UPDATEICON_STATUS: (state, updateiconStatus) => {
      state.updateiconStatus = updateiconStatus
    }
  }
}

export default system

