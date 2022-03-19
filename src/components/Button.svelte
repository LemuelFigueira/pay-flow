<script lang="ts">
	import BiErrorCircle from 'svelte-icons-pack/bi/BiErrorCircle';
	import HiSolidXCircle from 'svelte-icons-pack/hi/HiSolidXCircle';
	export let icon: string = '';
	import Icon from 'svelte-icons-pack';
	import Loading from './Loading.svelte';
	export let status: string = '';
	$: if (status === 'error')
		setTimeout(() => {
			status = '';
		}, 2000);
</script>

<button on:click>
	{#if status === 'loading'}
		<Loading />
	{:else if status === 'error'}
		<Icon className="icon" src={BiErrorCircle} />
	{:else if icon === 'x'}
		<Icon className="icon" src={HiSolidXCircle} />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		font-family: 'Poppins', sans-serif;
		font-weight: 700;
		border: 1px solid #ccc;
		border-radius: var(--br);
		outline: none;
		color: var(--clr-gray100);
		background: var(--clr-primary);
		&:hover {
			filter: brightness(0.95);
			cursor: pointer;
			transition: ease-in-out 0.2s;
		}
		&:active {
			border-color: var(--input-focus);
			transform: scale(0.9);
		}
		:global {
			.icon {
				font-size: x-large;
				fill: var(--input-error);
				stroke: var(--input-error);
			}
		}
	}
</style>
