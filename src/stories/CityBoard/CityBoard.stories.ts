import type { Meta, StoryObj } from '@storybook/vue3'
import CityBoard from '../../component/CityBoard.vue'
import sunny from '../../assets/images/icon-sunny.webp'

const meta = {
  title: 'Component/CityBoard',
  component: CityBoard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'transparent',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CityBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    city: 'Berlin',
    country: 'Germany',
    date: '2025-08-05',
    icon: sunny,
    temp: 68,
  },
}

export const NoIcon: Story = {
  args: {
    city: 'Tokyo',
    country: 'Japan',
    date: '2025-09-08',
    temp: 73,
  },
}

export const mobileView: Story = {
  args: {
    city: 'Berlin',
    country: 'Germany',
    date: '2025-08-05',
    icon: sunny,
    temp: 68,
    unit: '°',
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
    layout: 'fullscreen',
    backgrounds: { default: 'transparent' },
  },
}
