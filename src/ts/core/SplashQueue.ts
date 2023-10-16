import { GUIDString } from '../types/Types'
import { Splash } from './Splash'

export class SplashQueue {
	private _queue: Array<Splash>

	constructor() {
		this._queue = []
	}

	/**
	 * # Enqueue
	 * Add a new item to the queue.
	 * @param item The item to add to the queue.
	 */
	public enqueue(item: Splash): void {
		this._queue.push(item)
	}

	/**
	 * # Dequeue
	 * Remove the first item from the queue.
	 * @returns The first item from the queue.
	 */
	public dequeue(): Splash | undefined {
		return this._queue.shift()
	}

	/**
	 * # Peek
	 * Return the first item from the queue without removing it.
	 * @returns The first item from the queue.
	 */
	public peek(): Splash | undefined {
		return this._queue[0]
	}

	/**
	 * # Size
	 * Return the size of the queue.
	 * @returns The size of the queue.
	 */
	public get size(): number {
		return this._queue.length
	}

	/**
	 * # Is Empty
	 * Return true if the queue is empty.
	 * @returns True if the queue is empty.
	 */
	public isEmpty(): boolean {
		return this.size === 0
	}

	/**
	 * # Get
	 * @param id The GUID of the Nanosplash to get.
	 * @returns The Nanosplash with the given GUID.
	 */
	public get(id: GUIDString): Splash | undefined {
		return this._queue.find(item => item.getId() === id)
	}

	/**
	 * # Has
	 * @param id The GUID of the Nanosplash to check for.
	 * @returns True if the Nanosplash exists.
	 */
	public has(id: GUIDString): boolean {
		return this.get(id) !== undefined
	}

	/**
	 * # Delete
	 * @param id The GUID of the Nanosplash to delete.
	 * @returns The deleted Nanosplash.
	 */
	public delete(id: GUIDString): Splash | undefined {
		const index = this._queue.findIndex(item => item.getId() === id)
		if (index === -1) return undefined
		return this._queue.splice(index, 1)[0]
	}
}
