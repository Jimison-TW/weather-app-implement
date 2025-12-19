<template>
  <button class="button-container">
    <img src="@/assets/images/icon-units.svg" alt="">
    <span class="text">Units</span>
    <img src="@/assets/images/icon-dropdown.svg" alt="">
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $neutral-600;
  color: white;
}

.text {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
