<template>
  <section class="mt-4">
    <div class="bg-gray-300 flex flex-row justify-between p-2 items-center">
      <h2 class="text-xl">Collections</h2>
      <form class="flex flex-row ml-4" @submit.prevent="createCollection">
        <input type="text" class="input" placeholder="Collection Name" v-model="collection">
        <button type="submit" class="btn bg-blue-600 text-white">
          <i class="fas fa-plus mr-2" />Create Collection
        </button>
      </form>
    </div>
    <ul class="table w-full mt-2">
      <li v-for="(collection, index) in collections" :key="index" class="table-row h-20">
          <div class="table-cell align-middle w-1/6 border px-1">
            <nuxt-link :to="{name: 'nedb-collection', params: {collection}}" class="btn w-full bg-green-600 text-white">
              <i class="fas fa-eye" /><br />View
            </nuxt-link>
          </div>
          <div class="table-cell align-middle w-2/3 text-2xl border px-2">
            <nuxt-link :to="{name: 'nedb-collection', params: {collection}}" class="link">{{ collection }}</nuxt-link>
          </div>
          <div class="table-cell align-middle w-1/6 border px-1">
            <button class="btn w-full bg-red-600 text-white" @click.prevent="deleteCollection(collection)">
              <i class="fas fa-trash" /><br />Delete
            </button>
          </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  layout: 'nedb',
  
  data() {
    return {
      collection: '',
    }
  },
  /**
   * 非同期通信: レンダリング前にデータ取得
   */
  async asyncData(context) {
    return {
      collections: await context.app.$nedb.enumerate()
    }
  },
  methods: {
    /**
     * コレクション作成
     */
    async createCollection() {
      if (this.collection === '') {
        return this.$toast.info('作成するコレクション名を指定してください', {duration: 3000})
      }
      if (this.collections.includes(this.collection)) {
        return this.$toast.info('すでに存在するコレクションです', {duration: 3000})
      }
      try {
        await this.$nedb.create(this.collection)
        this.$toast.success(`${this.collection} を作成しました`, {duration: 3000})
        this.collections.unshift(this.collection)
        this.collection = ''
      } catch(err) {
        this.$toast.error(err.toString(), {duration: 3000})
      }
    },

    /**
     * コレクション削除
     * @param {string} collection
     */
    deleteCollection(collection) {
      const vue = this
      vue.$dialog.confirm({
        title: '確認',
        body: `${collection} を削除しますか？`,
      }).then(async () => {
        try {
          await vue.$nedb.delete(collection)
          vue.$toast.success(`${collection} を削除しました`, {duration: 3000})
          vue.collections = vue.collections.filter(c => c !== collection)
        } catch(err) {
          vue.$toast.error(err.toString(), {duration: 3000})
        }
      })
    }
  }
}
</script>