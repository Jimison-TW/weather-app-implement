// 引入 Storybook 提供的 TypeScript 類型，用來定義 story 的 meta 與 story 型別
import type { Meta, StoryObj } from '@storybook/vue3-vite'

// 匯入你要展示的 Vue 元件
import AppHeader from '@/component/AppHeader.vue'

// 定義 story 的 meta 資訊
// meta 用來告訴 Storybook 這個 story 屬於哪個元件、分類、tags 等
const meta = {
  // Storybook 左側面板顯示的分類與名稱
  // 'Example' 是分類，'AppHeader' 是這個元件的名稱
  title: 'Component/AppHeader',

  // 告訴 Storybook 這個 story 對應的元件
  component: AppHeader,

  // tags 是 Storybook 7+ 新功能，可用於自動生成文件等
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeader> // TypeScript 語法，確保 meta 的型別符合 AppHeader

// 將 meta export 出去，Storybook 會自動讀取這個 export 生成左側目錄與 story
export default meta

// 定義一個 Story 型別，方便後續定義 story 時有型別提示
type Story = StoryObj<typeof meta>

// 定義 story（實際的元件示例）
// export 出去才會出現在 Storybook 左側面板
export const Default: Story = {}
// 目前 args 為空，表示使用元件預設值
