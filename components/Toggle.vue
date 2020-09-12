<style scoped>
.toggle__dot {
  top: -.25rem;
  left: -.25rem;
  transition: all 0.3s ease-in-out;
}
input:checked ~ .toggle__dot {
  transform: translateX(100%);
  @apply bg-blue-600;
}
input:checked ~ .toggle__line {
  @apply bg-gray-400;
}
</style>

<template>
  <div class="relative">
    <!-- Toggle Button -->
    <label :for="name || 'toggle__btn'" class="flex items-center cursor-pointer">
      <!-- input -->
      <input
        type="checkbox" :id="name || 'toggle__btn'" class="hidden"
        :checked="value" @input="$emit('input', $event.target.value)"
      />
      <!-- line -->
      <div class="toggle__line w-10 h-4 bg-gray-200 rounded-full shadow-inner" />
      <!-- dot -->
      <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String, // '' | 'on'
  }
}
</script>