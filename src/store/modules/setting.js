
const SET_SETTING = 'SET_SETTING'

export default {
  state: {
    oData: {},
    nUpdatedAt: null
  },
  mutations: {
    [SET_SETTING] (state, oData) {
      state.oData = JSON.parse(JSON.stringify(oData.setting || {})) // 深拷贝
      state.nUpdatedAt = Date.parse(oData.updated_at || '') || null

      // 兼容旧主题
      window.$$settings = JSON.parse(JSON.stringify(state.oData)) // 深拷贝
    }
  },
  actions: {
    getSetting ({ commit }) {
      return new window.Promise((resolve, reject) => {
        let display = ''
        let nID = null
        let nUpdatedAt = null

        const searchParams = new window.URLSearchParams('')

        if (display) {
          searchParams.append('display', display)
        }
        if (nID) {
          searchParams.append('id', nID)
        }
        if (nUpdatedAt) {
          searchParams.append('updated_at', nUpdatedAt)
        }

        window.fetch(`/api/v1/themes/setting?${searchParams.toString()}`, {
          method: 'GET',
          credentials: 'include'
        }).then(oRes => {
          return oRes.json()
        }).then(oData => {
          if (oData.code === 200) {
            const _oData = (oData.msg || {}).results || {}

            _oData.setting = _oData.setting || _oData.settings // 后面会修正 API 接口返回字段名
            delete _oData.settings

            commit(SET_SETTING, _oData)

            resolve(_oData)
          } else {
            commit(SET_SETTING, {})

            reject(new Error('状态异常'))
          }
        }).catch(oError => {
          reject(oError)
        })
      })
    },
    setSetting ({ commit }, oData) {
      commit(SET_SETTING, oData)
    }
  }
}
