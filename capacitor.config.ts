import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'ee.forgr.opentranslate',
  appName: 'OpenTranslate',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
