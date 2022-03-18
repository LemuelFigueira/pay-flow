<script>
	import { clickOutside, open } from '../stores/dropdown';

	export let id = '';
	export let label = 'Dropdown';
</script>

<div {id} class="dropdown" use:clickOutside on:click_outside={() => open.set(false)}>
	<button cursor-pointer class:trigger={true} on:click={() => open.update((old) => !old)}>
		{label}
	</button>

	{#if $open === true}
		<div class="items">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown {
		position: relative;
		display: inline-block;

		min-width: 8rem;

		box-shadow: var(--lm-shadow-active);

		z-index: 99;
	}

	.trigger {
		color: white;

		padding: 1rem;
		background: var(--clr-light);

		border: 1px solid transparent;
		border-radius: var(--br);

		font-size: large;

		width: 100%;

		&:hover {
			border: 1px solid var(--clr-gray400);
		}
	}

	.items {
		position: absolute;

		min-width: max-content;
		width: 100%;

		margin-top: 0.2rem;

		z-index: 99;

		box-shadow: var(--lm-shadow-active);

		background: var(--clr-gray100);

		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: center;
	}

	:global .items button {
		width: 100%;

		border-radius: inherit;
		color: var(--clr-gray700);

		font-weight: 600;
		font-size: large;

		&:hover {
			backdrop-filter: brightness(0.9);
			filter: brightness(0.9);
		}

		cursor: pointer;

		outline: none;
	}
</style>
