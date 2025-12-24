<template>
  <el-dropdown placement="bottom-end">
    <el-button class="button-container">
      <img src="@/assets/images/icon-units.svg">
      <span>Units</span>
      <img src="@/assets/images/icon-dropdown.svg">
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>The Action 1st</el-dropdown-item>
        <el-dropdown-item>The Action 2nd</el-dropdown-item>
        <el-dropdown-item>The Action 3rd</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
</script>

<style scoped lang="scss">
.button-container {
  display: flex;

  span {
    margin: 0 5px;
  }

  /** 透過deep避免scoped影響，透過>來對直接子代進行調整 */
  :deep(> span) {
    display: inline-flex;
  }
}
</style>
