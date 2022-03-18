<script lang="ts">
	export let value: string | number;
	export let placeholder: string;
	export let password: boolean = false;
	export let number: boolean = false;
	export let range: boolean = false;
	export let min: number = 1;
	export let max: number = 10;
</script>

{#if password}
	<input type="password" bind:value {placeholder} />
{:else if number}
	<input type="number" bind:value {placeholder} />
{:else if range}
	<div class="range">
		<span>
			{placeholder || 'valor'}: {value}
		</span>
		<input type="range" {min} {max} bind:value {placeholder} />
	</div>
{:else}
	<input bind:value {placeholder} />
{/if}

<style lang="scss">
	.range {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		gap: 1rem;

		width: 100%;
		input {
			flex: 1;
		}
	}
	input {
		border: 2px solid var(--border-inactive);
		padding: 5px;
		outline: none !important;
		border-radius: 5px;
		font-weight: 600;
		width: 100%;
		background: var(--input-background);
		filter: brightness(0.9);

		color: var(--clr-gray700) !important;
		&::placeholder {
			font-size: small;
			font-weight: 500;
		}
		&:hover {
			/* border: 1px solid var(--input-hover); */
			border-color: var(--input-hover);
		}
		&:focus {
			/* border: 1px solid var(--input-focus); */
			border-color: var(--input-focus);
			filter: brightness(1);
		}
	}
</style>
