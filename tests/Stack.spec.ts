// @ts-strict

import { it, expect, describe } from 'vitest'
import Stack from '../src/ts/util/Stack'

describe('Stack', () => {
	it('Should add items to the stack', () => {
		const stack = new Stack<number>()
		stack.push(1)
		stack.push(2)
		stack.push(3)
		expect(stack.size()).toBe(3)
	})

	it('Should remove and return the item at the top of the stack', () => {
		const stack = new Stack<string>()
		stack.push('a')
		stack.push('b')
		stack.push('c')
		const item = stack.pop()
		expect(item).toBe('c')
		expect(stack.size()).toBe(2)
	})

	it('Should return the item at the top of the stack without removing it', () => {
		const stack = new Stack<number>()
		stack.push(1)
		stack.push(2)
		stack.push(3)
		const topItem = stack.peek()
		expect(topItem).toBe(3)
		expect(stack.size()).toBe(3)
	})

	it('Should return true if the stack is empty', () => {
		const stack = new Stack<boolean>()
		expect(stack.isEmpty()).toBe(true)
	})

	it('Should return the number of items in the stack', () => {
		const stack = new Stack<string>()
		stack.push('a')
		stack.push('b')
		stack.push('c')
		expect(stack.size()).toBe(3)
	})

	it('Should clear the stack', () => {
		const stack = new Stack<number>()
		stack.push(1)
		stack.push(2)
		stack.push(3)
		stack.clear()
		expect(stack.isEmpty()).toBe(true)
	})
})
