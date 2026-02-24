import type { Meta, StoryObj } from '@storybook/vue3'
import SearchBar from '@/component/SearchBar.vue'

const meta = {
  title: 'Component/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: '搜尋框的佔位符文字',
    },
    onSearch: {
      action: 'search',
      description: '使用者點擊搜尋按鈕或按下 Enter 時觸發',
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
}

export const Interactive: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement.querySelector('.search-input') as HTMLInputElement
    const button = canvasElement.querySelector('.search-button') as HTMLButtonElement

    // 模擬用戶輸入
    if (canvas) {
      canvas.focus()
      canvas.value = 'Berlin, Germany'
      canvas.dispatchEvent(new Event('input', { bubbles: true }))
      canvas.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // 模擬點擊搜尋按鈕
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (button) {
      button.click()
    }
  },
}

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Enter city name...',
  },
}

export const mobileView: Story = {
  args: {
    placeholder: 'Search for a place...',
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
    layout: 'fullscreen',
  },
}
