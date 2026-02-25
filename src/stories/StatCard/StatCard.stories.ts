import type { Meta, StoryObj } from '@storybook/vue3'
import StatCard from '../../component/StatCard.vue'

const meta = {
  title: 'Component/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Feels Like',
    value: '64',
    unit: '°',
  },
}

export const Interactive: Story = {
  args: {
    label: 'Humidity',
    value: '46',
    unit: '%',
  },
}

export const StatBar: Story = {
  args: {
    label: '',
    value: '',
  },
  render: () => ({
    components: { StatCard: StatCard },
    template: `
      <div style="display:flex; gap:16px; align-items:flex-start; background: rgba(0,0,0,0); padding: 16px;">
        <StatCard label="Feels Like" value="64" unit="°" />
        <StatCard label="Humidity" value="46" unit="%" />
        <StatCard label="Wind" value="9" unit="mph" />
        <StatCard label="Precipitation" value="0" unit="in" />
      </div>
    `,
  }),
}

export const mobileView: Story = {
  args: {
    label: 'Humidity',
    value: 80,
    unit: '%',
  },
  render: () => ({
    components: { StatCard },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:12px; padding:16px; background: rgba(0,0,0,0);">
        <StatCard label="Feels Like" value="64" unit="°" />
        <StatCard label="Humidity" value="46" unit="%" />
        <StatCard label="Wind" value="9" unit="mph" />
        <StatCard label="Precipitation" value="0" unit="in" />
      </div>
    `,
  }),
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
    layout: 'fullscreen',
  },
}
