<template>
	<div class="card-grid">
		<slot></slot>
	</div>
</template>

<style lang="sass" scoped>
.card-grid
	display: grid
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
	grid-gap: 25px
	background-image: url('/macos.jpg')
	background-size: cover
	background-position-y: bottom
	padding: 25px
	border-radius: 5px
</style>
