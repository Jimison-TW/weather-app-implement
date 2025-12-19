<template>
  <div class="header-container">
    <img src="@/assets/images/logo.svg" alt="nothing">

  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'primary',
  }
})
</script>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 100px;
}
</style>
