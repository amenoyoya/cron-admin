<template>
  <section class="flex flex-col justify-center items-center">
    <div class="flex justify-between w-full">
      <a class="btn bg-green-600 text-white" href="/task/edit/">タスク追加</a>
    </div>
    <table class="table-auto w-full mt-4">
      <thead class="shadow-md">
        <tr>
          <th class="border">通知</th>
          <th class="border">タイトル</th>
          <th class="border">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, index) in notifications" :key="index">
          <td class="border p-2 text-center w-1/5">
            <datetime>{{ $dayjs(note.notificate).format('YYYY-MM-DD HH:mm:ss') }}</datetime>
          </td>
          <td class="border p-2">
            <a class="link" :href="`/task/${note._id}/`">{{ note.title }}</a>
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
      notifications: await app.$nedb.find('tasks', {notificate: {$ne: ''}})
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