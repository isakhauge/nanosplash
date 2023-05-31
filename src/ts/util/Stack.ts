// @ts-strict

/**
 * A stack data structure.
 * @template T The type of item stored in the stack.
 */
class Stack<T> {
	public items: T[]

	/**
	 * Constructs a new stack.
	 */
	constructor() {
		this.items = []
	}

	/**
	 * Adds an item to the top of the stack.
	 * @param item The item to add to the stack.
	 */
	push(item: T): void {
		this.items.push(item)
	}

	/**
	 * Removes and returns the item at the top of the stack.
	 * @returns The item at the top of the stack, or undefined if the stack is empty.
	 */
	pop(): T | undefined {
		return this.items.pop()
	}

	/**
	 * Returns the item at the top of the stack without removing it.
	 * @returns The item at the top of the stack, or undefined if the stack is empty.
	 */
	peek(): T | undefined {
		return this.items[this.items.length - 1]
	}

	/**
	 * Returns true if the stack is empty, false otherwise.
	 * @returns True if the stack is empty, false otherwise.
	 */
	isEmpty(): boolean {
		return this.items.length === 0
	}

	/**
	 * Returns the number of items in the stack.
	 * @returns The number of items in the stack.
	 */
	size(): number {
		return this.items.length
	}

	/**
	 * Removes all items from the stack.
	 */
	clear(): void {
		this.items = []
	}
}

export default Stack
