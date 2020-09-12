<template>
  <section class="flex flex-col justify-center items-center">
    <h2 class="text-2xl mb-8">リマインダー編集</h2>
    <ValidationObserver
      ref="vobs" tag="form" class="w-full mx-auto"
      @submit.prevent="submit" v-slot="{invalid}"
    >
      <dl class="flex flex-grow items-baseline w-full my-2">
        <dt class="w-1/6">
          <label for="title" class="mr-4">Title</label>
        </dt>
        <dd class="flex-1">
          <ValidationProvider rules="required" v-slot="{errors}">
            <input type="text" class="input w-full" id="title" name="title" v-model="title" />
            <Error v-show="errors">{{ errors[0] }}</Error>
          </ValidationProvider>
        </dd>
      </dl>
      <dl class="flex flex-grow items-baseline w-full my-2">
        <dt class="w-1/6">
          <label for="everyMode" class="mr-4">EveryMode</label>
        </dt>
        <dd>
          <Toggle id="everyMode" name="every" v-model="everyMode" />
        </dd>
      </dl>
      <dl class="flex flex-grow items-baseline w-full my-2">
        <dt class="w-1/6">
          <label for="schedule" class="mr-4">Schedule</label>
        </dt>
        <dd class="flex-1">
          <ValidationProvider rules="required" v-slot="{errors}" name="schedule">
            <VueCtkDateTimePicker
              id="schedule" :no-label="true" :no-header="true"
              format="YYYY-MM-DD HH:mm" formatted="YYYY-MM-DD HH:mm" v-model="schedule"
            />
            <Error v-show="errors">{{ errors[0] }}</Error>
          </ValidationProvider>
        </dd>
      </dl>
      <dl class="w-full my-2">
        <dt>
          <label for="content" class="mr-4">Content</label>
        </dt>
        <dd>
          <Quill id="content" v-model="content" />
        </dd>
      </dl>
      <div class="mt-6 flex justify-end">
        <button type="submit" :class="`btn bg-green-600 text-white ${invalid? 'disabled': ''}`" :disabled="invalid? true: null">
          <i class="fas fa-paper-plane mr-2" />OK
        </button>
        <button class="btn bg-orange-600 text-white ml-4" @click.prevent="cancel">
          <i class="fas fa-undo mr-2" />Cancel
        </button>
      </div>
    </ValidationObserver>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      everyMode: '',
      schedule: '',
      content: '',
    }
  },
  methods: {
    async submit() {
      try {
        await this.$nedb.insert('reminds', {
          title: this.title,
          schedule: this.schedule,
          content: this.content,
        })
        this.$toast.success(`${this.title} posted`, {duration: 3000})
      } catch(err) {
        this.$toast.error(err.toString(), {duration: 3000})
      }
    },

    async cancel() {
      history.back()
    },
  }
}
</script>