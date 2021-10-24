import { ref, refAll } from './dom'

test('Single reference function', () => {
	const element = document.createElement('div')
	element.id = 'a'
	element.classList.add('b')
	element.setAttribute('data-ref', 'c')
	document.body.append(element)

	const selector = 'div#a.b[data-ref="c"]'
	const refElement = ref(selector)

	expect(refElement?.outerHTML).toBe(element.outerHTML)
})

test('Multiple reference function', () => {
	const html = `
		<ul>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	`
	document.body.innerHTML = html
	const selector = 'body ul > li'
	const refs = refAll(selector)

	expect(refs.length).toBe(3)
})
