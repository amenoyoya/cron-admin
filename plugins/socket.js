import Vue from 'vue'
import io from 'socket.io-client'

/**
 * asyncData で使えるように context.app へ export
 * Vue インスタンス内で使えるように Vue.prototype へ export
 */
export default ({app}) => {
  app.$socket = io()
  Vue.prototype.$socket = io()
}