import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import App from './App.vue'
import type { UserModule } from './types'
import { usePlausible } from '~/composables/plausible'
import { useCrisp } from '~/composables/crisp'

// import Previewer from 'virtual:vue-component-preview'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
CapacitorUpdater.notifyAppReady()
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
    if (ctx.isClient) {
      usePlausible('opentranslate.app')
      useCrisp('775a71ae-b8fd-4f24-9ce7-84ce4d0356b6')
    }
  },
)
