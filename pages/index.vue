<template>
  <div class="justify-center items-center w-full h-full">
    <h1 class="text-2xl">Cron Admin</h1>
    <dl class="mt-4" v-if="typeof cookie === 'object'">
      <dt>ID</dt>
      <dd>{{ cookie.id }}</dd>
      <dt>Name</dt>
      <dd>{{ cookie.name }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookie: '',
    }
  },
  async mounted() {
    await this.$util.saveSession('test', {id: 'admin', name: 'cookie'}, 60 * 60)
    this.cookie = await this.$util.loadSession('test')
    console.log(this.cookie)
  }
}
</script>>