/// <reference types="vite/client" />

import Nanosplash from "./ts/core/Nanosplash/Nanosplash";

declare global {
	interface Window {
		ns2: Nanosplash
	}
}
