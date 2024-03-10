<script setup>
import { ref } from 'vue'
import { useNs } from '../../../../dist/es/ns.js'
const ns = useNs()

const Commands = {
	ShowInsideA: 'ns.show("Loading A", "#a")',
	ShowInsideB: 'ns.show("Loading B", "#b")',
	ShowInsideC: 'ns.show("Loading C", "#c")',
	ShowInsideD: 'ns.show("Loading D", "#d")',
	ShowInsideWrapper: 'ns.show("Loading Wrapper", "#wrapper")',
	ShowFullScreen: 'ns.show("Loading window")',
	Hide: 'ns.hide()',
	HideAll: 'ns.hideAll()',
	Progress: 'Funny',
}

const rCommandString = ref('')

const wait = ms => new Promise(r => setTimeout(r, ms))

async function onClickExe() {
	const value = rCommandString.value
	const phrases = [
		'Making sandwitch ...',
		'Browsing insurance policies ...',
		'Watering plants ...',
		'Downloading music illegally ...',
	]
	switch (value) {
		case Commands.ShowInsideA:
			ns.show('Loading A', '#a')
			break
		case Commands.ShowInsideB:
			ns.show('Loading B', '#b')
			break
		case Commands.ShowInsideC:
			ns.show('Loading C', '#c')
			break
		case Commands.ShowInsideD:
			ns.show('Loading D', '#d')
			break
		case Commands.ShowInsideWrapper:
			ns.show('Loading Wrapper', '#wrapper')
			break
		case Commands.ShowFullScreen:
			const id = ns.show('Loading window')
			await wait(4000)
			ns.hide(id)
			break
		case Commands.Hide:
			ns.hide()
			break
		case Commands.HideAll:
			ns.hideAll()
			break
		case Commands.Progress:
			for (const phrase of phrases) {
				ns.show(phrase)
				await wait(2000)
			}
			ns.hideAll()
	}
}
</script>

<template>
	<div class="container">
		<select class="select" v-model="rCommandString">
			<option value="" selected disabled>Click and select</option>
			<option v-for="(command, i) in Commands" :key="i" :value="command">
				{{ command }}
			</option>
		</select>
		<div class="exe" @click="onClickExe">Run</div>
	</div>
</template>

<style lang="sass" scoped>
@use "sass:color"

$border-radius: 5px
.container
	position: relative
	display: flex
	border-radius: $border-radius
	z-index: 1
	& > *
		padding: 10px 20px

.select
	position: relative
	display: flex
	flex-grow: 1
	font-family: monospace
	font-size: 14px
	background-color: var(--vp-c-bg-alt)
	border-radius: $border-radius 0 0 $border-radius
	border: 1px solid rgba(Black, 0.1)
	cursor: pointer
	width: 100%

$btn-bg: RoyalBlue
.exe
	position: relative
	display: inline-flex
	color: White
	background-color: $btn-bg
	cursor: pointer
	border-radius: 0 $border-radius $border-radius 0
	border: 1px solid rgba(Black, 0.1)
	&:hover
		background-color: darken($btn-bg, 10%)
</style>
