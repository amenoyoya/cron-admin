<template>
  <section class="mt-4">
    <div class="bg-gray-300 flex flex-row justify-between p-2 items-center">
      <ul class="breadcrumb">
        <li><a href="/nedb/" class="link">Collections</a></li>
        <li>{{ collection }}</li>
      </ul>
    </div>
    <PaginationList :pager="docs" />
    <a class="btn bg-green-600 text-white" :href="`/nedb/${collection}/edit/`">
      <i class="fas fa-sticky-note mr-2" />New
    </a>
    <table class="table-auto w-full mt-4">
      <thead class="shadow-md">
        <tr v-if="columns.length">
          <th class="border">Edit</th>
          <th class="border" v-for="(column, index) in columns" :key="index">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, x) in docs.data" :key="x">
          <td class="border">
            <div class="flex justify-evenly p-2">
              <a class="btn bg-orange-400 text-white mr-2" :href="`/nedb/${collection}/edit/?id=${row._id}`">
                <i class="fas fa-edit mr-2" />Edit
              </a>
              <button class="btn bg-red-600 text-white" @click.prevent="deleteDocument(row._id)">
                <i class="fas fa-trash mr-2" />Delete
              </button>
            </div>
          </td>
          <td class="border p-2" v-for="(column, y) in columns" :key="y">
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
/**
 * ページ初期化関数
 * @param {NeDB} nedb
 * @param {string} collection
 * @param {string} page
 * @return {docs: Pager, pages: number[], columns: string[]}
 */
const initialize = async (nedb, collection, page) => {
  page = parseInt(page) || 1
  // documentsページャ取得
  const docs = await nedb.paginate(collection, {$page: page, $per: 50})
  // columns取得
  const columns = []
  if (docs.data.length) {
    columns.push('_id')
    for (const key of Object.keys(docs.data[0])) {
      if (!columns.includes(key)) {
        columns.push(key)
      }
    }
  }
  return {
    docs, columns
  }
}

export default {
  layout: 'nedb',
  
  data() {
    return {
      collection: this.$route.params.collection,
    }
  },
  /**
   * 非同期通信: レンダリング前にデータ取得
   */
  async asyncData({app, params, query}) {
    return await initialize(app.$nedb, params.collection, query.page)
  },
  methods: {
    /**
     * ドキュメント削除
     * @param {string} document_id
     */
    async deleteDocument(document_id) {
      const vue = this
      vue.$dialog.confirm({
        title: '確認',
        body: `${document_id} を削除しますか？`,
      }).then(async () => {
        try {
          await vue.$nedb.remove(vue.collection, {_id: document_id})
          // ページリロード
          const data = await initialize(vue.$nedb, vue.collection, vue.$route.query.page)
          this.docs = data.docs
          this.columns = data.columns
          vue.$toast.success(`${vue.collection}/${document_id} を削除しました`, {duration: 3000})
        } catch(err) {
          vue.$toast.error(err.toString(), {duration: 3000})
        }
      })
    },
  }
}
</script>

<style lang="postcss">
ul.breadcrumb {
  @apply flex text-xl;
  li {
    &::after {
      content: ">";
      @apply mx-2;
    }
    &:last-child::after {
      content: none;
    }
  }
}
</style>