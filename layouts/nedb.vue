<template>
  <div class="container">
    <header class="w-full flex justify-between border-b-4 px-4 py-2">
      <h1 class="text-3xl font-bold">NeDB Express</h1>
      <button class="btn bg-red-600 text-white" @click.prevent="logout" v-if="$store.state.nedb_admin">
        <i class="fas fa-user-slash mr-2" />Logout
      </button>
    </header>
    <div class="w-full">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  async middleware({app, store, route, redirect}) {
    try {
      // ログイン中か判定: cookie.nedb_admin => Session => saved?
      const admin = await app.$util.loadSession('nedb_admin')
      if (admin.id !== process.env.NEDB_ADMIN_ID) {
        throw new Error('NeDB Admin ID not matched')
      }
      store.commit('nedb_login', admin) // $store.state.nedb_admin に会員情報保持
      if (route.path.match(/^\/nedb\/login\/?/)) {
        // ログイン中で /nedb/login/ にアクセスした際は /nedb/ にリダイレクト
        redirect('/nedb/')
      }
    } catch(err) {
      // 未ログイン or Error
      console.log(err)
      if (!route.path.match(/^\/nedb\/login\/?/)) {
        // ログインページ以外ならログインページにリダイレクト
        redirect(`/nedb/login/?redirect=${encodeURIComponent(route.path)}`)
      }
    }
  },
  methods: {
    logout() {
      // ログアウト
      this.$util.clearSession('nedb_admin')
      location.href = '/nedb/login/'
    }
  }
}
</script>