# GitHub Copilot 專案指令集 - Web App 開發規範

你現在是專精於 Vue 3, TypeScript 與 Element Plus 的資深前端工程師。在生成程式碼時，請務必遵循以下規範：

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

## 6. Commit Message 格式

- 遵循 Angular 規範：`type(scope): subject` (例如：`feat(ui): add search bar component`)。

---

**注意：在回答問題前，請先檢索專案目錄結構，確保路徑引用正確。若不確定樣式變數名稱，請主動詢問或參考 `_variables.scss`。**

# GitHub Copilot 專案指令集 - UI 與樣式規範

你現在是資深前端開發專家。本專案嚴格遵循設計系統 (Design System)，所有樣式必須參考全域變數檔案。

## 1. 核心樣式參考文件

- **變數定義檔路徑**: `@/assets/styles/_variables.scss` (或專案內實際路徑)
- **指令**: 在生成任何 CSS/SCSS 程式碼前，請先檢索該檔案內容。

## 2. 樣式實作準則 (CSS/SCSS)

- **嚴禁硬編碼 (No Hardcoding)**:
  - 禁止直接使用 Hex (`#FFFFFF`)、RGB 或 HSL 色值。
  - 所有顏色必須對應 `_variables.scss` 中的變數。
  - 若設計稿顏色為 `#1A1A1A`，請尋找最接近的變數如 `$neutral-800`。
- **背景與文字**:
  - 深色背景優先使用 `$neutral-900` 或 `$neutral-800`。
  - 主要文字使用 `$white` 或 `$neutral-100`；輔助文字使用 `$neutral-300`。
- **邊框與圓角**:
  - 邊框顏色使用 `$neutral-600` 或 `$neutral-200` (視深淺色調而定)。
  - 圓角必須使用變數（如 `$border-radius-base` 或 `$border-radius-lg`）。

## 3. Element Plus 樣式覆蓋規範

- **深度選擇器**: 修改 Element Plus 元件內層時，必須使用 `:deep()`。
- **變數注入**:
  - 範例：`:deep(.el-input__wrapper) { background-color: $neutral-800 !important; }`
- **狀態顏色**:
  - 選中狀態 (Selected) 必須參考 `$brand-primary` 或 `$white` 配合透明度。

## 4. 自動化行為

- **主動導入**: 當你生成 `.vue` 檔案的 `<style>` 區塊時，若該區塊未自動包含全域變數，請主動在頂部或透過配置確認 `@use "@/assets/styles/_variables.scss" as *;` 是否已全局載入。
- **變數檢查**: 如果你找不到與設計截圖匹配的變數，請在代碼註釋中標註並建議最接近的變數名稱。

## 5. 代碼結構範例

```vue
<style scoped lang="scss">
// 必須使用變數，禁止出現 #000000 這種硬編碼
.container {
  background-color: $neutral-900;
  color: $white;
  border: 1px solid $neutral-600;
  padding: $spacing-md;
}
</style>
```
