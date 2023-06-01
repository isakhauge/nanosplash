// @ts-strict

/**
 * A stack data structure.
 * @template T The type of item stored in the stack.
 * @author Isak K. Hauge <isakhauge@icloud.com>
 */
class Stack<T> {
	private _items: T[]

	/**
	 * Constructs a new stack.
	 */
	constructor() {
		this._items = []
	}

	/**
	 * Returns the items in the stack.
	 */
	public get items(): T[] {
		return this._items
	}

	/**
	 * Adds an item to the top of the stack.
	 * @param item The item to add to the stack.
	 */
	public push(item: T): void {
		this._items.push(item)
	}

	/**
	 * Removes and returns the item at the top of the stack.
	 * @returns The item at the top of the stack, or undefined if the stack is empty.
	 */
	public pop(): T | undefined {
		return this._items.pop()
	}

	/**
	 * Returns the item at the top of the stack without removing it.
	 * @returns The item at the top of the stack, or undefined if the stack is empty.
	 */
	public peek(): T | undefined {
		return this._items[this._items.length - 1]
	}

	/**
	 * Returns true if the stack is empty, false otherwise.
	 * @returns True if the stack is empty, false otherwise.
	 */
	public isEmpty(): boolean {
		return this._items.length === 0
	}

	/**
	 * Returns the number of items in the stack.
	 * @returns The number of items in the stack.
	 */
	public size(): number {
		return this._items.length
	}

	/**
	 * Removes all items from the stack.
	 */
	public clear(): void {
		this._items = []
	}
}

export default Stack
