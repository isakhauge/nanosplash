import { useNs } from './Nanosplash'

// Inject Nanosplash into the browser Window
window.addEventListener('load', function () {
	this.ns = useNs()
})
