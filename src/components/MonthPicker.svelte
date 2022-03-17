<script lang="ts">
	import { monthNames } from '../stores/calendar';
	import { t } from '../i18n';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function select(mes: number) {
		dispatch('select', {
			value: mes
		});

		close();
	}

	function close() {
		dispatch('close');
	}

	export let value: number = new Date().getMonth() + 1;

	function isSelected(month: string, value: number) {
		const monthName = monthNames[value - 1];

		return month === monthName;
	}
</script>

<div class="modal-background" on:click={close} />

<main>
	<div class="month-picker">
		{#each monthNames as monthName}
			<button
				class:cursor-pointer={true}
				class="month"
				class:selected={isSelected(monthName, value)}
				on:click={() => select(monthNames.indexOf(monthName))}
			>
				<span>
					{$t(monthName)}
				</span>
			</button>
		{/each}
	</div>
</main>

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
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;

		z-index: 100;

		background: var(--clr-gray100);

		button:not(.selected) {
			color: var(--clr-gray700);

			&:hover span {
				color: var(--clr-primary);
			}
		}
	}
	.cursor-pointer {
		cursor: pointer;
	}

	.selected {
		background: var(--input-hover);
		color: var(--clr-gray100) !important;
		:global svg {
			fill: var(--clr-gray100) !important;
		}
	}

	.month-picker {
		display: grid;
		grid-template-columns: repeat(3, auto);

		@media (max-width: 580px) {
			grid-template-columns: repeat(2, auto);
		}

		@media (max-width: 360px) {
			grid-template-columns: repeat(1, auto);

			max-height: calc(40vh);
			overflow-y: auto;
		}

		overflow: hidden;
		button {
			width: 100%;
			border-radius: var(--br);
			padding: 0.5rem;
			& span {
				font-size: medium;
				font-weight: 700;
			}
		}
	}
</style>
