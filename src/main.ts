import { NanoSplash } from './NanoSplash'

const windowExists = window && window instanceof Window
if (windowExists) {
	new NanoSplash().install()
}
