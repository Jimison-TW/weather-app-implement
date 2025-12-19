import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            // 注意：這裡應該填寫包含變數定義的檔案路徑
            // 如果你的變數定義在 global.scss，就指向它
            // 如果有專門的 _variables.scss，指向該檔案更好
            additionalData: `@use "@/styles/_variables.scss" as *;`,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src'),
        },
      },
    })
  },
}
export default config
