import { useNs } from '@/composables/ns.ts'

window.addEventListener('load', function () {
  this.ns = useNs()
})
