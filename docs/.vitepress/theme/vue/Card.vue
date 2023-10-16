<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>

<template>
	<div class="card">
		<div v-if="attrs.id" class="id">#{{ attrs.id }}</div>
		<slot></slot>
	</div>
</template>

<style lang="sass" scoped>
.card
    color: White
    line-height: 1
    position: relative
    padding: 30px
    border-radius: 5px
    background-color: rgba(White, 0.2)
    backdrop-filter: blur(5px)
    -webkit-backdrop-filter: blur(5px)
    border: 1px solid rgba(White, 0.2)
    .id
        position: absolute
        top: 5px
        left: 5px
        font-size: 10px
        color: rgba(White, 0.7)
        letter-spacing: 0.1em
</style>
