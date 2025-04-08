<template>
	<button :class="['button', buttonStyle]" :type="type">
		<slot />
	</button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	type: {
		type: String,
		default: 'button',
	},
	href: {
		type: String,
		default: null,
	},
	styleType: {
		type: String,
		default: 'primary',
		validator: (value) => ['primary', 'secondary'].includes(value),
	},
})

const buttonStyle = computed(() => `button-${props.styleType}`)
</script>

<style scoped>
.button {
	padding: 0.5rem 2rem;
	font-size: 1rem;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	text-decoration: none;
	transition: 0.2s;
}

.button-primary {
	background-color: #ff9900;
	color: #fff;
}

.button-secondary {
	background-color: #fff;
	color: #ff9900;
	border: 1px solid #ff9900;
}

.button:hover {
	opacity: 0.9;
}

.button.full-width {
	width: 100%;
}
</style>