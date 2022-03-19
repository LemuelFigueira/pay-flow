<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isOpen: boolean = false;
	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('close');
	};
</script>

{#if isOpen}
	<div class="modal-background" on:click={close} />
	<main>
		<slot />
	</main>
{/if}

<style lang="scss">
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}
	main {
		position: absolute;
		left: 50%;
		top: 50%;
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		border-radius: 0.2em;

		z-index: 100;

		background: var(--clr-gray100) !important;
	}
</style>
