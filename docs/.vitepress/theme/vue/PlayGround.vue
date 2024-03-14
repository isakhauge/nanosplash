<script setup>
import CardGrid from './CardGrid.vue'
import Card from './Card.vue'
import Exe from './Exe.vue'
</script>

<template>
	<div class="playground">
		<CardGrid id="wrapper">
			<Card id="a">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam
			</Card>
			<Card id="b">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam
			</Card>
			<Card id="c">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam
			</Card>
			<Card id="d">
				Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam
			</Card>
		</CardGrid>
		<Exe />
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
