import type { Meta, StoryObj } from '@storybook/vue3'
import WeatherError from '../../component/WeatherError.vue'

const meta = {
  title: 'Component/WeatherError',
  component: WeatherError,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherError>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '無法取得天氣資訊',
    message: '請檢查你的 API key 或網路連線，然後重試。',
  },
}

export const Unauthorized: Story = {
  args: {
    title: 'API 認證失敗',
    message: '請確認 VITE_OPENWEATHER_API_KEY 是否已正確設定。',
  },
}

export const NotFound: Story = {
  args: {
    title: '找不到城市',
    message: '請輸入有效的城市名稱，如 Taipei 或 Tokyo。',
  },
}
