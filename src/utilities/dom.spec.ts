import {addClass, get, mk, move, setAttr} from "./dom";

const resetDOM = () => document.body.innerHTML = ''

test('Get DOM element function', () => {
	const element = document.createElement('div')
	element.id = 'a'
	element.classList.add('b')
	element.setAttribute('data-ref', 'c')
	document.body.append(element)

	const selector = 'div#a.b[data-ref="c"]'
	const refElement = get<HTMLDivElement>(selector)

	expect(refElement?.outerHTML).toBe(element.outerHTML)

	resetDOM()
})

test('Move Element from origin to destination', () => {
	const html = `
		<div id="main">
			<div id="a">
			    <div id="b">
			        <div id="c">
		                <div id="first"></div>
                    </div>
                </div>
            </div>
		</div>
	`
	document.body.innerHTML = html

    const main = get('#main') as HTMLDivElement
    const first = get('#first') as HTMLDivElement
    const b = get('#b') as HTMLDivElement
    const c = get('#c') as HTMLDivElement

    move(b, main)
    move(c, main)
    move(first, main, true)

    const ids = Array.from(main.children).map((v => v.id))

	expect(ids.join(',')).toBe('first,a,b,c')

	resetDOM()
})

test('Make HTML Element', () => {
	const span = mk('span')
	document.body.appendChild(span)
	const spanFromDom = document.body.children.item(0) as Node
	expect(spanFromDom instanceof HTMLSpanElement).toBe(true)
	resetDOM()
})

test('Add CSS classes', () => {
	const div = mk('div')
	addClass(div, 'ns-1', 'ns-2', 'ns-3')
	expect(div.classList.toString()).toBe('ns-1 ns-2 ns-3')
	resetDOM()
})

test('Set Node attribute', () => {
	const div = mk('div')
	const attr = {name: 'data-test', value: 'success'}
	setAttr(div, attr.name, attr.value)
	expect(div.getAttribute(attr.name)).toBe(attr.value)
	resetDOM()
})
