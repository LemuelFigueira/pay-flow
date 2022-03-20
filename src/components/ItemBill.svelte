<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { t } from '../i18n';
	import { receiptStore } from '../stores/receipt';

	import { clickOutside } from '../stores/dropdown';
	import { toast } from '../stores/toast';
	import { insertBillReceipt } from '../supabase.client';
	import Modal from './Modal.svelte';

	export let id: string;
	export let name: string;
	export let amount: number;
	export let billing_date: string;
	export let receipt: string = '';

	const defaultImage =
		'data:image/png;base64,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';

	let dropdown = {
		isOpen: false,
		open: () => {
			dropdown.isOpen = true;
		},
		close: () => {
			dropdown.isOpen = false;
		}
	};

	const dispatch = createEventDispatcher();

	function insert(value: string) {
		dispatch('insert_receipt', {
			value
		});
	}

	function remove() {
		dispatch('remove_receipt');
	}

	let insertReceiptModal = {
		isOpen: false,
		open: () => {
			insertReceiptModal.isOpen = true;
		},
		close: () => {
			insertReceiptModal.isOpen = false;
		}
	};

	let image = {
		value: undefined,
		select: (e) => {
			let image = e.target.files[0];
			let reader = new FileReader();
			const isImageTypeValid = receiptStore.validateReceiptImageType(image?.type);

			if (!isImageTypeValid) return toast.danger($t('Invalid image type'), 'insert-receipt');
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				const imgValue = e.target.result;

				function cb() {
					image.value = imgValue;
					toast.warning($t('Receipt uploaded'), 'insert-receipt');

					insert(String(imgValue));
				}

				toast.info($t('Uploading receipt') + '...', 'insert-receipt');
				insertBillReceipt(
					{
						p_id: id,
						p_receipt: String(imgValue)
					},
					cb
				);
			};
		},
		remove: () => {
			function cb() {
				image.value = undefined;
				toast.warning($t('Receipt removed'), 'remove-receipt');

				remove();
			}

			toast.info($t('Removing receipt') + '...', 'remove-receipt');
			insertBillReceipt(
				{
					p_id: id,
					p_receipt: ''
				},
				cb
			);
		}
	};

	let fileInput;
</script>

<Modal isOpen={insertReceiptModal.isOpen} on:close={insertReceiptModal.close}>
	<div class="ir-modal">
		<img src={image.value || receipt || defaultImage} alt="comprovante" />
		<div class="actions">
			{#if image.value || receipt}
				<button class="cancel" on:click={image.remove}>
					<span>Remover</span>
				</button>
			{/if}
			<button class="confirm" on:click={() => fileInput.click()}>
				{#if image.value || receipt}
					<span>Trocar</span>
				{:else}
					<span>Selecionar</span>
				{/if}
			</button>
		</div>
		<input
			bind:this={fileInput}
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={image.select}
			style="display:none;"
		/>
	</div>
</Modal>

<main on:click={() => dropdown.open()}>
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
		<button
			on:click={() => {
				insertReceiptModal.open();
				dropdown.close();
			}}
		>
			{#if receipt}
				<span>{$t('See receipt')}</span>
			{:else}
				<span>{$t('Insert receipt')}</span>
			{/if}
		</button>
	</footer>
{/if}

<style lang="scss">
	main {
		cursor: pointer;

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
		margin-top: -0.7rem;

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

	.ir-modal {
		width: 100%;
		height: 100%;

		padding: 1rem;

		display: flex;

		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 1rem;

		button {
			border-radius: var(--br);

			background: var(--clr-primary);
			width: 100%;
		}

		img {
			width: 15rem;

			@media (min-width: 768px) {
				width: 25rem;
			}

			@media (min-width: 1024px) {
				width: 30rem;
			}
		}

		span {
			font-size: large;
			font-weight: 600;

			color: var(--clr-gray100);
		}

		.actions {
			display: flex;
			justify-content: space-between;
			align-items: center;

			width: 100%;
		}

		.actions .cancel {
			background: transparent;

			span {
				color: var(--clr-primary);
			}

			border-radius: 0;
			width: 100%;
		}

		.actions .confirm {
			background: var(--clr-primary);

			border-radius: 0;
			width: 100%;
		}
	}

	button {
		cursor: pointer;
	}
</style>
