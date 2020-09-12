<template>
  <div class="container">
    <header class="fixed top-0 w-full bg-gray-100">
      <div class="w-full flex justify-between border-b-4 border-gray-300 px-4 py-2">
        <h1 class="text-3xl font-bold">Cron Admin</h1>
        <button class="btn bg-black text-white" @click.prevent="logout" v-if="$store.state.admin">
          <i class="fas fa-user-slash mr-2" />Logout
        </button>
      </div>
    </header>
    <div class="w-full mt-20">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 描画前処理
   */
  async middleware({app, store, route, redirect}) {
    try {
      // ログイン中か判定: cookie.admin => Session => saved?
      const admin = await app.$util.loadSession('admin')
      if (admin.id !== process.env.ADMIN_ID) {
        throw new Error('Admin ID not matched')
      }
      store.commit('login', admin) // $store.state.admin に管理者情報保持
      if (route.path.match(/^\/login\/?/)) {
        // ログイン中で /login/ にアクセスした際は / にリダイレクト
        redirect('/')
      }
    } catch(err) {
      // 未ログイン or Error
      console.log(err)
      if (!route.path.match(/^\/login\/?/)) {
        // ログインページ以外ならログインページにリダイレクト
        redirect(`/login/?redirect=${encodeURIComponent(route.path)}`)
      }
    }
  },

  /**
   * 描画完了後処理
   */
  async mounted() {
    // ブラウザーが通知に対応しているかどうかチェック
    if (!('Notification' in window)) {
      this.$dialog.alert('このブラウザーはデスクトップ通知に対応していません。')
    }
    // ユーザーに通知の許可を求める
    else if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      await Notification.requestPermission()
    }
  },
  
  methods: {
    /**
     * ログアウト
     */
    logout() {
      this.$util.clearSession('admin')
      location.href = '/login/'
    }
  }
}
</script>