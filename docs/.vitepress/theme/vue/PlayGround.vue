<script setup>
import CardGrid from './CardGrid.vue'
import Card from './Card.vue'
import Exe from './Exe.vue'

const commands = [
	'ns.showInside("#a", "Loading A")',
	'ns.showInside("#b", "Loading B")',
	'ns.showInside("#c", "Loading C")',
	'ns.showInside("#d", "Loading D")',
	'ns.showInside("#wrapper", "Loading Wrapper")',
	'ns.show("Loading window")',
	'ns.hide()',
	'ns.hideInside("#b")',
	'ns.hideAll()',
]
</script>

<template>
	<div class="playground">
		<CardGrid id="wrapper">
			<Card id="a">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut
				aliquam
			</Card>
			<Card id="b">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut
				aliquam
			</Card>
			<Card id="c">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut
				aliquam
			</Card>
			<Card id="d">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut
				aliquam
			</Card>
		</CardGrid>
		<Exe :commands="commands"></Exe>
	</div>
</template>

<style lang="sass" scoped>
.playground
	display: flex
	flex-direction: column
	row-gap: 20px
	& > *
		box-shadow: 0 2px 10px rgba(Black, 0.1)
</style>
