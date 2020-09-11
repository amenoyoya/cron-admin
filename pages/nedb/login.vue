<template>
  <section class="mt-4">
    <div class="bg-gray-300 flex flex-row justify-between p-2 items-center">
      <h2 class="text-xl">Login</h2>
    </div>
    <div class="table w-full mt-2">
      <ValidationObserver
        ref="vobs" tag="form" class="md:w-3/4 sm:w-full mx-auto"
        @submit.prevent="login" v-slot="{invalid}"
      >
        <InputWithLabel
          v-model="id" rules="required" type="text"
          name="id" className="input w-full" placeholder="YourID"
        >
          <i class="fas fa-user mr-2" />ID
        </InputWithLabel>
        <div class="mt-6" />
        <InputWithLabel
          v-model="password" rules="required" type="password"
          name="password" className="input w-full"
        >
          <i class="fas fa-lock mr-2" />パスワード
        </InputWithLabel>
        <div class="mt-6">
          <button type="submit" :class="`btn ${invalid? 'disabled': ''}`" :disabled="invalid? true: null">
            <i class="fas fa-paper-plane mr-2" />ログイン
          </button>
        </div>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'nedb',

  data() {
    return {
      id: '',
      password: '',
    }
  },
  methods: {
    /**
     * ログイン実行
     */
    async login() {
      try {
        if (this.id === process.env.NEDB_ADMIN_ID && this.password === process.env.NEDB_ADMIN_PWD) {
          // ログイン
          await this.$util.saveSession('nedb_admin', {id: this.id}, 60 * 60 * 24)
          this.$toast.success('ログインに成功しました', {duration: 3000})
          location.href = decodeURIComponent(this.$route.query.redirect) || '/nedb/'
        } else {
          this.$toast.error('ログインに失敗しました', {duration: 3000})
        }
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>