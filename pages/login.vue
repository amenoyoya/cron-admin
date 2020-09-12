<template>
  <section class="flex flex-col justify-center items-center w-full" style="height: 480px">
    <h2 class="text-2xl mb-8">Login</h2>
    <ValidationObserver
      ref="vobs" tag="form" class="w-full mx-auto"
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
  </section>
</template>

<script>
export default {
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
        if (this.id === process.env.ADMIN_ID && this.password === process.env.ADMIN_PWD) {
          // ログイン
          await this.$util.saveSession('admin', {id: this.id}, 60 * 60 * 24)
          this.$toast.success('ログインに成功しました', {duration: 3000})
          location.href = decodeURIComponent(this.$route.query.redirect) || '/'
        } else {
          this.$toast.error('ログインに失敗しました', {duration: 3000})
        }
      } catch (err) {
        this.$toast.error(err.toString(), {duration: 3000})
      }
    },
  }
}
</script>