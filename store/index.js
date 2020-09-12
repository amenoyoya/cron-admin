export const state = () => ({
  // 管理画面ログイン状態
  admin: false,
  // NeDB管理画面ログイン状態
  nedb_admin: false,
})

export const mutations = {
  /**
   * 管理画面ログイン
   * @param {*} state $store.state
   * @param {object} data {id: string}
   */
  login(state, data) {
    state.admin = data
  },

  /**
   * NeDB管理画面ログイン
   * @param {*} state $store.state
   * @param {object} data {id: string}
   */
  nedb_login(state, data) {
    state.nedb_admin = data
  },
}