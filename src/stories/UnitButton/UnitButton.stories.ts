import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UnitButton from '@/component/UnitButton.vue'

const meta = {
  title: 'Component/UnitButton',
  component: UnitButton,
  tags: ['autodocs'],
} satisfies Meta<typeof UnitButton>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}
