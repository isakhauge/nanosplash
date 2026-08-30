import { useNs } from '@/composables/ns.ts'

declare global {
  interface Window {
    useNs: typeof useNs
  }
}

window.useNs = useNs
