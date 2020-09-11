export const state = () => ({
  // NeDB管理画面ログイン状態
  nedb_admin: false,
})

export const mutations = {
  /**
   * NeDB管理画面ログイン
   * @param {*} state $store.state
   * @param {object} data {id: string}
   */
  nedb_login(state, data) {
    state.nedb_admin = data
  }
}