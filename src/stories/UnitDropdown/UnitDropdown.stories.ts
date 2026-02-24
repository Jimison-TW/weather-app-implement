import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UnitButton from '@/component/UnitDropdown.vue'

const meta = {
  title: 'Component/UnitButton',
  component: UnitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UnitButton>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}
