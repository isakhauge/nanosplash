import { Nanosplash } from './Nanosplash'

const windowExists = window && window instanceof Window
if (windowExists) {
	new Nanosplash().install()
}
