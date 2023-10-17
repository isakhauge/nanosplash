import { GUIDString } from '../types/Types'
import { Splash } from './Splash'

export class SplashQueue {
	public queue: Array<Splash>

	constructor() {
		this.queue = []
	}

	/**
	 * # Enqueue
	 * Add a new item to the queue.
	 * @param item The item to add to the queue.
	 */
	public enqueue(item: Splash): SplashQueue {
		this.queue.push(item)
		return this
	}

	/**
	 * # Dequeue
	 * Remove the first item from the queue.
	 * @returns The first item from the queue.
	 */
	public dequeue(): Splash | undefined {
		return this.queue.shift()
	}

	/**
	 * # Get
	 * @param id The GUID of the Nanosplash to get.
	 * @returns The Nanosplash with the given GUID.
	 */
	public get(id: GUIDString): Splash | undefined {
		return this.queue.find(item => item.getId() === id)
	}

	/**
	 * # Delete
	 * @param id The GUID of the Nanosplash to delete.
	 * @returns The deleted Nanosplash.
	 */
	public delete(id: GUIDString): Splash | undefined {
		const index = this.queue.findIndex(item => item.getId() === id)
		if (index === -1) return undefined
		return this.queue.splice(index, 1)[0]
	}
}
