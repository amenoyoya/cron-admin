<template>
  <div>
    <ul class="flex justify-center p-2 items-center">
      <li>
        <a :class="'btn ' + (pager.page <= 1? 'disabled': '')"
          :href="pager.page <= 1? null: `/nedb/${collection}/?page=1`"
        >
          <i class="fas fa-angle-double-left" />
        </a>
      </li>
      <li v-for='page in pages' :key="page">
        <a :class="'btn ' + (pager.page == page + 1? 'disabled': '')"
          :href="pager.page == page + 1? null: `/nedb/${collection}/?page=${page + 1}`"
        >
          {{ page + 1 }}
        </a>
      </li>
      <li>
        <a :class="'btn ' + (pager.page >= pager.last? 'disabled': '')"
          :href="pager.page >= pager.last? null: `/nedb/${collection}/?page=${pager.last}`"
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
export default {
  props: {
    pager: Object,
  },
  data() {
    // ページネーションリスト生成
    const pages = [...Array(this.pager.last).keys()].slice(
      (this.pager.page - 1) - 2 < 0? 0: (this.pager.page - 1) - 2,
      this.pager.page + 2 > this.pager.last? this.pager.last: this.pager.page + 2
    )
    return { pages }
  }
}
</script>