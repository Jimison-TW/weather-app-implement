<template>
  <header class="header-wrapper">
    <div class="header-container">
      <img class="logo" src="@/assets/images/logo.svg" alt="Weather Now" />
      <!-- 透過 prop 傳遞 unitType 並轉發 update 事件給父層 -->
      <UnitButton :unitType="unitType" @update:unitType="(u) => emit('update:unitType', u)" />
    </div>
  </header>
</template>

<script setup lang="ts">
import UnitButton from './UnitDropdown.vue'
import { UnitType } from '@/const/type'

const props = withDefaults(defineProps<{ type?: string; unitType?: UnitType }>(), {
  type: 'primary',
  unitType: UnitType.METRIC,
})

const emit = defineEmits<(e: 'update:unitType', value: UnitType) => void>()
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
}

.header-container {
  max-width: 950px;
  margin: 0 auto;
  height: 100px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  /* 輕微往左溢出 container */
  margin-left: -12px;
  display: inline-block;
  transition: transform 0.15s ease;
}

/* 更精細的微調：大螢幕可以再往外一點，小螢幕縮回 */
@media (min-width: 1200px) {
  .logo {
    margin-left: -20px;
  }
}

@media (max-width: 480px) {
  .logo {
    margin-left: -8px;
    transform: translateX(-2px);
  }
}
</style>
