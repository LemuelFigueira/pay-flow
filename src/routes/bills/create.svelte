<script lang="ts">
	import { get, writable } from 'svelte/store';
	import Button from '../../components/Button.svelte';
	import TextInput from '../../components/Input.svelte';
	import Loading from '../../components/loading.svelte';
	import { t } from '../../i18n';
	import { gotoMonthlyBills } from '../../stores/router';
	import { toast } from '../../stores/toast';
	import { createBillsRecursive } from '../../supabase.client';
	import { getDateFromString } from '../../utils/date';

	const name = writable('');
	const amount = writable<number>();
	const dueDate = writable<number>(1);
	const qtdInstallments = writable<number>();

	const isSending = writable<boolean>(false);

	async function handleSendForm() {
		try {
			isSending.set(true);
			const form = {
				name: $name,
				amount: $amount,
				dueDate: getDateFromString(new Date(new Date().setDate($dueDate))),
				qtdInstallments: $qtdInstallments
			};

			const anyNullValueOnForm = Object.values(form).some((value) => !Boolean(value));

			if (anyNullValueOnForm) {
				throw new Error(get(t)('Insert all fields'));
			}

			await createBillsRecursive(form.name, form.amount, form.dueDate, form.qtdInstallments);

			gotoMonthlyBills();
		} catch (error) {
			toast.danger(error.message);
		} finally {
			isSending.set(false);
		}
	}
</script>

<main>
	{#if $isSending}
		Enviando...
	{:else}
		<div class="content">
			<TextInput bind:value={$name} placeholder={$t('Name')} />
			<TextInput number bind:value={$amount} placeholder={$t('Amount')} />
			<TextInput range max={28} bind:value={$dueDate} placeholder={$t('Billing day')} />
			<TextInput number bind:value={$qtdInstallments} placeholder={$t('Installments quantity')} />
		</div>

		<div class="footer">
			<Button on:click={handleSendForm}>{$t('Confirm')}</Button>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;

		gap: 1rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;

		gap: 0.3rem;
	}

	.footer {
		width: 100%;
	}

	:global .footer button {
		width: 100%;
	}
</style>
