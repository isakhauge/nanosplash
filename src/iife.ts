import { useNs } from '@/composables/ns.ts'
import type { INanosplash } from "@/types/interfaces/INanosplash"

declare global {
  interface Window {
    ns: INanosplash
  }
}

window.addEventListener('load', () => {
  window.ns = useNs()
})
