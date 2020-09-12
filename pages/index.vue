<template>
  <section class="flex flex-col justify-center items-center">
    <div class="flex justify-between w-full">
      <a class="btn bg-green-600 text-white" href="/task/edit/">タスク追加</a>
    </div>
    <PaginationList :pager="pager" />
    <table class="table-auto w-full my-4">
      <thead class="shadow-md">
        <tr>
          <th class="border">通知</th>
          <th class="border">タイトル</th>
          <th class="border">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(job, index) in pager.data" :key="index">
          <td class="border p-2 text-center w-1/5">
            <datetime>{{ $dayjs(job.schedule).format('YYYY-MM-DD HH:mm:ss') }}</datetime>
          </td>
          <td class="border p-2">
            <a class="link" :href="`/task/${job._id}/`">{{ job.title }}</a>
          </td>
          <td class="border p-2 w-1/5">
            <div class="flex justify-evenly p-2">
              <button class="btn bg-blue-600 text-white"><i class="fas fa-edit" /></button>
              <button class="btn bg-red-600 text-white"><i class="fas fa-check" /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  async asyncData({app}) {
    return {
      pager: await app.$nedb.paginate('@end_jobs')
    }
  },
  methods: {
    notify() {
      // 通知の許可が得られていれば通知実行
      if (Notification.permission === "granted") {
        const notification = new Notification("こんにちは！")
        console.log(notification)
      }
    }
  }
}
</script>