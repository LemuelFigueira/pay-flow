<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { GenericOption } from '../types';
	const open: Writable<boolean> = writable(false);
	export let placeholder: string = 'Selecione';
	export let value: Writable<GenericOption | null> = writable();
	export let options: GenericOption[] = [];
	const dispatch = createEventDispatcher();
	function select(value: string | number | null) {
		dispatch('select', {
			value
		});
	}
</script>

<main on:click={() => open.update((old) => !old)}>
	<span is-active={$open ? 'S' : 'N'} cursor-pointer class="placeholder"
		>{$value.label === '' ? placeholder : $value.label}</span
	>
	<div class="options" options-open={$open ? 'S' : 'N'}>
		{#each options.filter((item) => item.value !== $value.value) as option}
			<span
				cursor-pointer
				option-selected={$value.value === option.value ? 'S' : 'N'}
				class="option"
				on:click={(e) => select(option.value)}
				value={option.value}
			>
				{option.label}
			</span>
		{/each}
	</div>
</main>

<style lang="scss">
	span {
		font-size: var(--font-xs);
		font-family: var(--font-family);
		padding: 0 1rem;
		width: 100%;

		text-align: center;
	}
	main {
		display: inline-flex;
		position: relative;

		align-items: center;
		justify-content: center;
		background: var(--clr-light);
		[is-active='S'] {
			background: var(--clr-primary);
			color: var(--clr-gray100);
		}
		box-shadow: var(--lm-shadow-active);
		z-index: 1;

		min-width: 80px;

		border-radius: var(--br);

		span {
			padding: 0.5rem;
		}
	}
	.placeholder {
		position: relative;
	}
	.options {
		background: var(--clr-light);
		box-shadow: var(--lm-shadow-active);
		position: absolute;
		top: 2.5rem;
		left: 0;
		right: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

		min-width: max-content;
		width: 100%;

		border-radius: var(--br);
	}
	.option {
		&:hover {
			backdrop-filter: brightness(0.9);
		}
	}
	[options-open='N'] {
		display: none;
	}
	[option-selected='S'] {
		background: var(--clr-primary);
	}
</style>
