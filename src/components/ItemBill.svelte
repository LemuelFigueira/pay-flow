<script lang="ts">
	import { clickOutside } from '../stores/dropdown';
	import Modal from './Modal.svelte';

	export let name: string;
	export let amount: number;
	export let billing_date: string;
	export let receipt: string = '';

	let dropdown = {
		isOpen: false,
		toggle: () => {
			dropdown.isOpen = !dropdown.isOpen;
		},
		close: () => {
			dropdown.isOpen = false;
		}
	};

	let modalPreviewComprovante = {
		isOpen: false,
		toggle: () => {
			modalPreviewComprovante.isOpen = !modalPreviewComprovante.isOpen;
		},
		close: () => {
			modalPreviewComprovante.isOpen = false;
		}
	};
</script>

<Modal isOpen={modalPreviewComprovante.isOpen} on:close={modalPreviewComprovante.close}>
	<img src={receipt} alt="comprovante" class="comprovante" />
</Modal>

<main on:click={dropdown.toggle}>
	<div class="left">
		<span class:title={true}>{name}</span>
		<span class:date={true}>{billing_date}</span>
	</div>
	<div class="right">
		<div class="amount">
			<span class:money={true}>{amount}</span>
		</div>
	</div>
</main>
{#if dropdown.isOpen}
	<footer class="actions" use:clickOutside on:click_outside={dropdown.close}>
		{#if receipt}
			<button
				on:click={() => {
					modalPreviewComprovante.toggle();
					dropdown.close();
				}}
			>
				<span>Ver comprovante</span>
			</button>
		{:else}
			<button>
				<span>Inserir comprovante</span>
			</button>
		{/if}
	</footer>
{/if}

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		width: 100%;
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.right {
		display: flex;
		justify-content: flex-end;
	}

	.title {
		font-size: large;
		font-weight: 700;

		text-transform: uppercase;
	}

	.date {
		font-size: small;
		font-weight: 700;

		color: var(--clr-gray400);
	}

	footer {
		border-bottom-left-radius: var(--br);
		border-bottom-right-radius: var(--br);

		overflow: hidden;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
	}

	footer button {
		background: var(--clr-primary);

		width: 100%;
	}

	footer button span {
		color: var(--clr-gray100);
		font-size: large;
		font-weight: 600;
	}

	footer button:hover {
		filter: brightness(0.9);
	}

	.comprovante {
		width: 50vw;

		aspect-ratio: 16/9;
		object-fit: contain;
	}
</style>
