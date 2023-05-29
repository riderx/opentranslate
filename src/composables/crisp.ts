import { Capacitor } from '@capacitor/core'

export type eventColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'

export interface CapacitorCrispPlugin {
  configure(data: { websiteID: string }): Promise<void>
  openMessenger(): Promise<void>
  setTokenID(data: { tokenID: string }): Promise<void>
  setUser(data: {
    nickname?: string
    phone?: string
    email?: string
    avatar?: string
  }): Promise<void>
  pushEvent(data: { name: string; color: eventColor }): Promise<void>
  setCompany(data: {
    name: string
    url?: string
    description?: string
    employment?: [title: string, role: string]
    geolocation?: [country: string, city: string]
  }): Promise<void>
  setInt(data: { key: string; value: number }): Promise<void>
  setString(data: { key: string; value: string }): Promise<void>
  sendMessage(data: { value: string }): Promise<void>
  setSegment(data: { segment: string }): Promise<void>
  reset(): Promise<void>
}

declare global {
  interface Window {
    Rewardful: any
    Reflio: any
    $crisp: unknown[]
    CRISP_RUNTIME_CONFIG: {
      lock_maximized: boolean
      lock_full_view: boolean
      cross_origin_cookies: boolean
    }
    CRISP_READY_TRIGGER: () => void
    pushToCrisp: (data: string) => void
    CRISP_WEBSITE_ID: string
    CRISP_TOKEN_ID: string
  }
}

export class CapacitorCrispWeb {
  ifrm: HTMLIFrameElement = document.createElement('iframe')
  isReady = false
  isIframe = true
  tmpArr: unknown[] = []

  public delete() {
    const s = document.getElementById('crisp-script-inhouse')
    if (s)
      s.remove()
    const s2 = document.getElementById('crisp-chat-iframe')
    if (s2)
      s2.remove()
  }

  public init() {
    if (this.isIframe) {
      this.createStyle()
      document.body.appendChild(this.ifrm)
      this.createIframe()
      if (this.ifrm.contentDocument) {
        const s = this.createScript(this.ifrm.contentDocument, 'iframe')
        this.ifrm.contentDocument.getElementsByTagName('head')[0].appendChild(s)
      }
    }
    else {
      this.createCrisp()
      const s = this.createScript(window.document, 'inhouse')
      window.document.getElementsByTagName('head')[0].appendChild(s)
    }
    this.setAutoHide()
  }

  private createScript(source: Document, id: string) {
    const s = source.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.type = 'text/javascript'
    s.id = `crisp-script-${id}`
    s.async = true
    return s
  }

  private createStyle() {
    this.ifrm.style.position = 'absolute'
    this.ifrm.style.bottom = '0'
    this.ifrm.style.right = '0'
    this.ifrm.style.display = 'none'
    this.ifrm.style.width = '100%'
    this.ifrm.style.height = '100%'
    this.ifrm.style.maxWidth = '500px'
    this.ifrm.style.backgroundClip = 'padding-box'
    this.ifrm.style.backgroundColor = 'black'
    this.ifrm.title = 'Crisp Chat Iframe'
    this.ifrm.id = 'crisp-chat-iframe'

    this.ifrm.style.padding
      = 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
  }

  private createCrisp = () => {
    if (!window.$crisp)
      window.$crisp = []

    window.CRISP_WEBSITE_ID = import.meta.env.crisp as string
    window.CRISP_READY_TRIGGER = () => {
      this.isReady = true
      this.push([]) // make all tmpArr calls
    }
  }

  private createIframe() {
    if (!this.ifrm.contentWindow || !this.ifrm.contentDocument) {
      console.error(
        'iframe not created, missing contentWindow or contentDocument',
      )
      return
    }
    if (!this.ifrm.contentWindow.$crisp)
      this.ifrm.contentWindow.$crisp = []
    this.ifrm.contentWindow.CRISP_WEBSITE_ID = import.meta.env.crisp as string
    this.ifrm.contentWindow.CRISP_RUNTIME_CONFIG = {
      lock_maximized: true,
      lock_full_view: false,
      cross_origin_cookies: true,
    }
    this.ifrm.contentWindow.CRISP_READY_TRIGGER = () => {
      if (!this.ifrm.contentWindow)
        return
      this.isReady = true
      this.push([])
    }
    const script = this.ifrm.contentDocument.createElement('script')
    script.append(`
      window.pushToCrisp = function(data) {
        window.$crisp.push(JSON.parse(data));
      }
  `)
    this.ifrm.contentDocument.body.appendChild(script)

    const b = this.ifrm.contentDocument.createElement('button')
    // create close cross top right
    b.style.position = 'absolute'
    b.style.top = '0'
    b.style.right = '0'
    b.style.zIndex = '1000001'
    b.style.width = '50px'
    b.style.height = '50px'
    b.style.backgroundColor = 'transparent'
    b.style.cursor = 'pointer'
    b.style.border = 'none'
    b.style.fill = 'white'
    b.style.padding = '10px'
    b.onclick = () => {
      this.closeMessenger()
    }
    // fill with svg icon cross
    b.innerHTML
      = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>'
    this.ifrm.contentDocument.body.appendChild(b)
  }

  private setAutoHide() {
    this.push(
      // ['safe', true],
      (this.isIframe ? ['do', 'chat:open'] : ['do', 'chat:hide']),
      [
        'on',
        'chat:closed',
        () => {
          this.closeMessenger()
        },
      ],
      [
        'on',
        'message:received',
        () => {
          this.openMessenger()
        },
      ],
    )
  }

  private push(...args: unknown[]) {
    if (!this.isReady) {
      // console.log('crisp not ready yet')
      this.tmpArr.push(...args)
      return
    }
    else {
      this.tmpArr.forEach((arg) => {
        if (this.ifrm.contentWindow)
          this.ifrm.contentWindow?.pushToCrisp(JSON.stringify(arg))
        else
          window.$crisp.push(arg)
      })
      this.tmpArr.length = 0
    }
    args.forEach((arg) => {
      if (this.ifrm.contentWindow)
        this.ifrm.contentWindow?.pushToCrisp(JSON.stringify(arg))
      else
        window.$crisp.push(arg)
    })
  }

  async configure(data: { websiteID: string }): Promise<void> {
    if (this.ifrm.contentWindow)
      this.ifrm.contentWindow.CRISP_WEBSITE_ID = data.websiteID
    window.CRISP_WEBSITE_ID = data.websiteID
  }

  async closeMessenger(): Promise<void> {
    if (this.ifrm.contentWindow)
      this.ifrm.style.visibility = 'hidden'
    else
      this.push(['do', 'chat:hide'])
  }

  async openMessenger(): Promise<void> {
    if (this.ifrm.contentWindow) {
      this.ifrm.style.visibility = 'visible'
      this.ifrm.style.display = 'block'
    }
    else {
      this.push(['do', 'chat:open'])
      this.push(['do', 'chat:show'])
    }
  }

  async setTokenID(data: { tokenID: string }): Promise<void> {
    if (this.ifrm.contentWindow)
      this.ifrm.contentWindow.CRISP_TOKEN_ID = data.tokenID
    window.CRISP_WEBSITE_ID = data.tokenID
    this.reset()
  }

  async setUser(data: {
    nickname?: string
    phone?: string
    email?: string
    avatar?: string
  }): Promise<void> {
    const arr = [
      ...(data.nickname != null ? [['set', 'user:nickname', data.nickname]] : []),
      ...(data.phone != null ? [['set', 'user:phone', data.phone]] : []),
      ...(data.email != null ? [['set', 'user:email', data.email]] : []),
      ...(data.avatar != null ? [['set', 'user:avatar', data.avatar]] : []),
    ]
    this.push(...arr)
  }

  async pushEvent(data: { name: string; color: eventColor }): Promise<void> {
    this.push(['set', 'session:event', [[[data.name, null, data.color]]]])
  }

  async setCompany(data: {
    name: string
    url?: string
    description?: string
    employment?: [title: string, role: string]
    geolocation?: [country: string, city: string]
  }): Promise<void> {
    const meta = {
      ...(data.url && { url: data.url }),
      ...(data.description && { description: data.description }),
      ...(data.employment && { employment: data.employment }),
      ...(data.geolocation && { geolocation: data.geolocation }),
    }

    this.push(['set', 'user:company', [data.name, meta]])
  }

  async setInt(data: { key: string; value: number }): Promise<void> {
    this.push(['set', 'session:data', [data.key, data.value]])
  }

  async setString(data: { key: string; value: string }): Promise<void> {
    this.push(['set', 'session:data', [data.key, data.value]])
  }

  async sendMessage(data: { value: string }): Promise<void> {
    this.push(['do', 'message:send', ['text', data.value]])
  }

  async setSegment(data: { segment: string }): Promise<void> {
    this.push(['set', 'session:segments', [[data.segment]]])
  }

  async reset(): Promise<void> {
    this.push(['do', 'session:reset'])
  }
}

const CapacitorCrisp = new CapacitorCrispWeb()

export function pushEvent(data: { name: string; color: eventColor }): void {
  CapacitorCrisp.pushEvent(data)
}

export function setUserId(uuid: string): void {
  CapacitorCrisp.setString({ key: 'id', value: uuid })
}

export function setUser(data: {
  nickname?: string
  phone?: string
  email?: string
  avatar?: string
}): void {
  // console.log('setUser CapacitorCrisp')
  CapacitorCrisp.setUser(data)
}
export function setVersion(version: string): void {
  CapacitorCrisp.setString({ key: 'webVersion', value: version })
}
export function setDeviceInfo(model: string,
  platform: string,
  operatingSystem: string,
  osVersion: string,
  webVersion: string,
  manufacturer: string): void {
  CapacitorCrisp.setString({ key: 'model', value: model })
  CapacitorCrisp.setString({ key: 'platform', value: platform })
  CapacitorCrisp.setString({ key: 'operatingSystem', value: operatingSystem })
  CapacitorCrisp.setString({ key: 'osVersion', value: osVersion })
  CapacitorCrisp.setString({ key: 'nativeVersion', value: webVersion })
  CapacitorCrisp.setString({ key: 'manufacturer', value: manufacturer })
}
export function setPaidPlan(planId: string): void {
  CapacitorCrisp.setString({ key: 'paid-plan', value: planId })
}
export function sendMessage(value: string): void {
  CapacitorCrisp.sendMessage({ value })
}
export function openChat(): void {
  CapacitorCrisp.openMessenger()
}
export function reset(): void {
  CapacitorCrisp.reset()
}
export async function useCrisp(id: string): Promise<void> {
  if (!Capacitor.isNativePlatform())
    CapacitorCrisp.isIframe = false
  CapacitorCrisp.init()
  try {
    await CapacitorCrisp.configure({
      websiteID: id,
    })
  }
  catch (e) {
    console.error('Crips cannot be init', e)
  }
}
