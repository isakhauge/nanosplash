<script setup>
import { ref, defineProps } from 'vue'
import { Service } from '../../../../dist/es/ns'
Service.start()

const props = defineProps({
	commands: Array,
})

const rCommandString = ref('')

const wait = ms => new Promise(r => setTimeout(r, ms))

function onClickExe() {
	const str = rCommandString.value
	let executable = null
	if (str.startsWith('ns.show(')) {
		const text = /ns\.show\(['"](.+)['"]\)/.exec(str)[1]
		executable = async () => {
			const id = eval(str)
			let ms = 4000
			while (ms > 0) {
				await wait(1000)
				ms -= 1000
				ns.show(`${text} (${ms / 1000})`)
			}
			ns.hideId(id)
		}
	} else {
		executable = new Function(rCommandString.value)
	}
	executable()
}
</script>

<template>
	<div class="container">
		<select class="select" v-model="rCommandString">
			<option value="" selected disabled>Click and select</option>
			<option
				v-for="(command, i) in props.commands"
				:key="i"
				:value="command"
			>
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
