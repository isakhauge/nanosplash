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
	background-image: url(https://9to5mac.com/wp-content/uploads/sites/6/2022/06/macOS-Ventura-wallpaper-1-1.jpg?quality=82&strip=all)
	background-size: cover
	background-position-y: bottom
	padding: 25px
	border-radius: 5px
</style>
