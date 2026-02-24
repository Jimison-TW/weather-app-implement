---
name: 網頁元件開發
description: 定義Vue.js網頁元件建立流程，並且清楚標示相關開發規範
---

# 網頁元件開發

進行網頁元件開發時，請遵循以下規則

## 網頁元件元件建立流程

1. 檢視參考圖片內的顏色樣式與確認提示詞內的元件類型
2. 在`src/component/`目錄下使用Vue.js與Typescript建立新的元件檔案
3. 元件建立後，在`src/stories/`目錄下建立對應的storybook設定檔

## 1. 技術棧與環境

- **框架**: Vue 3 (Composition API) 使用 `<script setup lang="ts">`。
- **UI 庫**: Element Plus (最新版本)。
- **樣式**: SCSS (支援 CSS 變數與全域變數檔案)。
- **圖示**: 優先使用 `@element-plus/icons-vue` 或專案 assets 中的 SVG。

## 2. 樣式與設計規範 (核心要點)

- **變數使用**: 嚴禁在元件中使用硬編碼的顏色 (Hex/RGB)。
  - 必須優先使用全域 SCSS 變數，檔案路徑參考：`@/assets/styles/_variables.scss`。
  - 常用變數範例：`$neutral-800`, `$neutral-200`, `$brand-primary`。
- **Scoped Styles**: 每個組件必須使用 `<style scoped lang="scss">`。
- **深度選擇器**: 修改 Element Plus 內部樣式時，必須使用 `:deep()`。

## 3. 組件開發慣例

- **命名規範**: 元件檔案使用 PascalCase (例如：`TheSearchBar.vue`)。
- **Props**: 必須使用 `withDefaults(defineProps<{...}>(), {...})` 定義。
- **Emit**: 必須使用 `defineEmits<{(e: 'event', ...): void}>()` 定義。
- **雙向綁定**: 優先使用 `v-model` (Vue 3 語法)。

## 4. 邏輯與功能細節

- **防抖 (Debounce)**: 處理搜尋、輸入等頻繁觸發的事件時，必須實作防抖邏輯。
- **API 串接**: 假設專案使用 `axios`。處理非同步請求時必須包含 `try-cache` 塊與 `loading` 狀態管理。
- **清單渲染**: 所有的 `v-for` 必須綁定唯一的 `:key`。

## 5. Storybook 規範

- 每個新元件必須生成對應的 `.stories.ts` 檔案。
- 必須包含 `Default` 與 `Interactive` (使用 play function 模擬動作) 兩種狀態。
- 必須在 `parameters.layout` 中根據元件特性設定 `centered` 或 `fullscreen`。
