<template>
  <div class="header-container">
    <img src="@/assets/images/logo.svg" alt="nothing">
    <UnitButton />
  </div>
</template>

<script setup lang="ts">
import UnitButton from './UnitDropdown.vue';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
