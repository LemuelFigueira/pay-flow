<script lang="ts">
	import { page } from '$app/stores';

	import { get, writable } from 'svelte/store';
	import Button from '../../components/Button.svelte';
	import TextInput from '../../components/Input.svelte';
	import MonthPicker from '../../components/MonthPicker.svelte';
	import { t } from '../../i18n';
	import { monthNames } from '../../stores/calendar';
	import { gotoMonthlyBills } from '../../stores/router';
	import { toast } from '../../stores/toast';
	import { createBillsRecursive } from '../../supabase.client';
	import { getDateFromString } from '../../utils/date';

	const name = writable('');
	const amount = writable<number>();
	const dueDate = writable<number>(1);
	const qtdInstallments = writable<number>();

	const isSending = writable<boolean>(false);

	let baseMonthNumber: number =
		Number($page.url.searchParams.get('month')) || new Date().getMonth() + 1;

	const showModal = writable(false);

	async function handleSendForm() {
		try {
			isSending.set(true);
			const form = {
				name: $name,
				amount: $amount,
				dueDate: getDateFromString(new Date(new Date().setMonth(baseMonthNumber - 1, $dueDate))),
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

	async function handleChangeMonth(value: number) {
		baseMonthNumber = value;
	}
</script>

{#if $showModal === true}
	<MonthPicker
		value={baseMonthNumber}
		on:select={(e) => handleChangeMonth(e.detail.value + 1)}
		on:close={() => showModal.set(false)}
	/>
{/if}
<main>
	<div class="header">
		<span class="title">
			{$t('Create in')}
			<strong on:click={() => showModal.update((old) => !old)}>
				{$t(monthNames[baseMonthNumber - 1])}
			</strong>
		</span>
	</div>
	<div class:separator={true} />
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

	.header {
		display: flex;
		justify-content: space-between;

		width: 100%;
	}

	.title {
		font-size: x-large;

		& strong {
			color: var(--clr-primary);
			cursor: pointer;
		}
	}

	.separator {
		content: '';
		display: block;
		height: 1px;
		background: var(--clr-primary);
		width: 100%;
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
