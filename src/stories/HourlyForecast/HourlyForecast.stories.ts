import type { Meta, StoryObj } from '@storybook/vue3'
import HourlyForecast from '../../component/HourlyForecast.vue'
import sunny from '../../assets/images/icon-sunny.webp'
import cloud from '../../assets/images/icon-overcast.webp'
import rain from '../../assets/images/icon-rain.webp'

const meta = {
  title: 'Component/HourlyForecast',
  component: HourlyForecast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HourlyForecast>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { time: '3 PM', icon: cloud, temp: 68 },
  { time: '4 PM', icon: cloud, temp: 68 },
  { time: '5 PM', icon: sunny, temp: 68, active: true },
  { time: '6 PM', icon: cloud, temp: 66 },
  { time: '7 PM', icon: rain, temp: 66 },
  { time: '8 PM', icon: rain, temp: 64 },
  { time: '9 PM', icon: rain, temp: 63 },
  { time: '10 PM', icon: cloud, temp: 63 },
]

export const Default: Story = {
  args: { items },
}

export const LongList: Story = {
  args: {
    items: [
      ...items,
      { time: '11 PM', icon: cloud, temp: 62 },
      { time: '12 AM', icon: cloud, temp: 61 },
    ],
  },
}

export const MobileView: Story = {
  args: { items },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
