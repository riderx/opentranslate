import Plausible from 'plausible-tracker'
import { Capacitor } from '@capacitor/core'

export function trackEvent(domain: string, eventName: string, eventData: any = {}) {
  if (import.meta.env.SSR)
    return
  const { trackEvent } = Plausible({
    trackLocalhost: Capacitor.isNativePlatform(),
    domain,
  })
  trackEvent(eventName, { props: eventData })
}

export function usePlausible(domain: string): void {
  if (import.meta.env.SSR)
    return
  const { enableAutoPageviews } = Plausible({
    trackLocalhost: Capacitor.isNativePlatform(),
    domain,
  })
  enableAutoPageviews()
}
