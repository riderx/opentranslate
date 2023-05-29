import Plausible from 'plausible-tracker'
import { Capacitor } from '@capacitor/core'

export function trackEvent(domain: string, eventName: string, eventData: any = {}) {
  const { trackEvent } = Plausible({
    trackLocalhost: Capacitor.isNativePlatform(),
    domain,
  })
  trackEvent(eventName, { props: eventData })
}

export function usePlausible(domain: string): void {
  const { enableAutoPageviews } = Plausible({
    trackLocalhost: Capacitor.isNativePlatform(),
    domain,
  })
  enableAutoPageviews()
}
