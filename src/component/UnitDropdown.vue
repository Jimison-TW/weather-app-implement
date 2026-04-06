<template>
  <el-dropdown placement="bottom-end">
    <el-button class="button-container">
      <img src="@/assets/images/icon-units.svg" />
      <span>Units</span>
      <img src="@/assets/images/icon-dropdown.svg" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="menu-container">
        <!-- 使用此按鈕處理單位切換：當前為 Metric 時顯示 Switch To Imperial，反之顯示 Switch To Metric -->
        <el-button @click="onToggleUnit">{{
          isMetric ? 'Switch To Imperial' : 'Switch To Metric'
          }}</el-button>

        <div v-for="content in contentArray" :key="content.title">
          <span class="title">{{ content.title }}</span>
          <el-dropdown-item :class="{ selected: isMetric }">
            {{ content.metricUnit }}
            <img class="selected-icon" v-show="isMetric" src="@/assets/images/icon-checkmark.svg" />
          </el-dropdown-item>
          <el-dropdown-item :class="{ selected: !isMetric }">
            {{ content.imperialUnit }}
            <img class="selected-icon" v-show="!isMetric" src="@/assets/images/icon-checkmark.svg" />
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
import { UnitType } from '@/const/type'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    unitType?: UnitType
  }>(),
  {
    visible: false,
    unitType: UnitType.METRIC, // 預設為公制
  },
)

const contentArray = [
  {
    title: 'Temperature',
    metricUnit: 'Celsius(C)',
    imperialUnit: 'Fahrenheit(F)',
  },
  {
    title: 'Wind Speed',
    metricUnit: 'km/h',
    imperialUnit: 'mph',
  },
  {
    title: 'Precipitation',
    metricUnit: 'Millimeters(mm)',
    imperialUnit: 'Inches(in)',
  },
]

const emit = defineEmits<(e: 'update:unitType', value: UnitType) => void>()

const isMetric = computed(() => props.unitType === UnitType.METRIC)

const onToggleUnit = () => {
  const next = isMetric.value ? UnitType.IMPERIAL : UnitType.METRIC
  emit('update:unitType', next)
}
</script>

<style scoped lang="scss">
.button-container {
  display: flex;

  span {
    margin: 0 5px;
  }

  img {
    width: 16px;
    height: 16px;
  }

  /** 透過deep避免scoped影響，透過>來對直接子代進行調整 */
  :deep(> span) {
    display: inline-flex;
    align-items: center;
  }
}

.menu-container {
  background-color: $neutral-800;
  border-radius: 8px;
  border: 1px solid $neutral-200;
  padding: 5px;
  font-weight: 400;

  span {
    color: $neutral-300;
    font-size: 11px;
    height: 30px;
  }

  div {
    border-bottom: 1px solid $neutral-600;

    &:last-child {
      border-bottom: none;
    }
  }

  :deep(.el-dropdown-menu__item) {
    color: $white;
    padding: 2px 5px;
    pointer-events: none;
  }

  :deep(.el-dropdown-menu__item.selected) {
    border-radius: 5px;
    padding: 2px 5px;
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
  }
}

.title {
  padding: 100px 5px;
}

.selected-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: $white;
}
</style>
