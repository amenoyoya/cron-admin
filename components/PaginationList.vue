<template>
  <div>
    <ul class="flex justify-center p-2 items-center">
      <li>
        <a :class="'btn ' + (pager.page <= 1? 'disabled': '')"
          :href="pager.page <= 1? null: pager.firstPage"
        >
          <i class="fas fa-angle-double-left" />
        </a>
      </li>
      <li v-for='page in pages' :key="page.number">
        <a :class="'btn ' + (pager.page == page.number? 'disabled': '')"
          :href="pager.page == page.number? null: page.href"
        >
          {{ page.number }}
        </a>
      </li>
      <li>
        <a :class="'btn ' + (pager.page >= pager.last? 'disabled': '')"
          :href="pager.page >= pager.last? null: pager.lastPage"
        >
          <i class="fas fa-angle-double-right" />
        </a>
      </li>
    </ul>
    <div class="flex justify-center items-center">
      {{ pager.start }} - {{ pager.end }} / {{ pager.count }}
    </div>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  props: {
    pager: Object,
  },
  data() {
    // ページURL生成
    const query = Object.assign({}, this.$route.query)
    query.page = 1
    this.pager.firstPage = `${this.$route.path}?${qs.stringify(query)}`
    query.page = this.pager.last
    this.pager.lastPage = `${this.$route.path}?${qs.stringify(query)}`
    // ページネーションリスト生成
    const pages = []
    for (let i = this.pager.page - 2; i <= this.pager.page + 2; ++i) {
      if (i < 1) {
        continue
      }
      if (i > this.pager.last) {
        break
      }
      query.page = i
      pages.push({
        number: i,
        href: `${this.$route.path}?${qs.stringify(query)}`
      })
    }
    return { pages }
  }
}
</script>