
const SET_SITE = 'SET_SITE'

export default {
  state: {
    oData: {},
    nUpdatedAt: null
  },
  mutations: {
    [SET_SITE] (state, oData) {
      state.oData = JSON.parse(JSON.stringify(oData || {})) // 深拷贝
      state.nUpdatedAt = Date.parse(oData.updated_at || '') || null

      // 兼容旧主题
      window.$$shop = JSON.parse(JSON.stringify(state.oData)) // 深拷贝
    }
  },
  actions: {
    getSite ({ commit }) {
      return new window.Promise((resolve, reject) => {
        let nUpdatedAt = null

        const searchParams = new window.URLSearchParams('fields=shop')

        if (nUpdatedAt) {
          searchParams.append('updated_at', nUpdatedAt)
        }

        window.fetch(`/api/v1/?${searchParams.toString()}`, {
          method: 'GET',
          credentials: 'include'
        }).then(oRes => {
          return oRes.json()
        }).then(oData => {
          if (oData.code === 200) {
            const _oData = oData.shop || {}

            commit(SET_SITE, _oData)

            resolve(_oData)
          } else {
            commit(SET_SITE, {})

            reject(new Error('状态异常'))
          }
        }).catch(oError => {
          reject(oError)
        })
      })
    },
    setSite ({ commit }, oData) {
      commit(SET_SITE, oData)
    }
  }
}
