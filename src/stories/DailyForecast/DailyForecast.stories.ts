import type { Meta, StoryObj } from '@storybook/vue3'
import DailyForecast from '../../component/DailyForecast.vue'
import sunny from '../../assets/images/icon-sunny.webp'
import rain from '../../assets/images/icon-rain.webp'
import cloud from '../../assets/images/icon-overcast.webp'
import storm from '../../assets/images/icon-storm.webp'

const meta = {
  title: 'Component/DailyForecast',
  component: DailyForecast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DailyForecast>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { day: 'Tue', icon: rain, high: 68, low: 57 },
  { day: 'Wed', icon: rain, high: 70, low: 59 },
  { day: 'Thu', icon: sunny, high: 75, low: 57 },
  { day: 'Fri', icon: cloud, high: 77, low: 55 },
  { day: 'Sat', icon: storm, high: 70, low: 59 },
  { day: 'Sun', icon: rain, high: 77, low: 61 },
  { day: 'Mon', icon: cloud, high: 75, low: 59 },
]

export const Default: Story = {
  args: {
    items,
  },
}

export const Scrollable: Story = {
  args: {
    items,
  },
}

export const mobileView: Story = {
  args: {
    items,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
