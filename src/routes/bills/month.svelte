<script lang="ts">
	import { writable } from 'svelte/store';

	import ItemBill from '../../components/ItemBill.svelte';
	import MonthPicker from '../../components/MonthPicker.svelte';
	import { t } from '../../i18n';
	import { monthNames } from '../../stores/calendar';
	import { gotoHome } from '../../stores/router';

	import { billsFilteredSearch, isSigned } from '../../supabase.client';

	const monthNumber = writable<number>(new Date().getMonth() + 1);

	async function handleLoadMonthBills() {
		if (!$isSigned) {
			gotoHome();
			throw new Error($t('Must be signed'));
		}
		const response = await billsFilteredSearch({
			p_month_number: $monthNumber,
			p_page: 0,
			p_limit: 30,
			p_orderby: 'name',
			p_ascordsc: 'asc'
		});

		return response;
	}

	async function handleChangeMonth(value: number) {
		monthNumber.set(value);

		handleLoadMonthBillsPromise = handleLoadMonthBills();
	}

	const showModal = writable(false);

	let handleLoadMonthBillsPromise = handleLoadMonthBills();
</script>

{#if $showModal === true}
	<MonthPicker
		value={$monthNumber}
		on:select={(e) => handleChangeMonth(e.detail.value + 1)}
		on:close={() => showModal.set(false)}
	/>
{/if}
<main>
	<span class:title={true}>
		{$t('Bills')}
		{$t('from')}
		<strong on:click={() => showModal.update((old) => !old)}>
			{$t(monthNames[$monthNumber - 1])}
		</strong>
	</span>

	<div class="separator" />
	<div class="bills">
		{#await handleLoadMonthBillsPromise}
			<p>{$t('Waiting')}</p>
		{:then bills}
			{#each bills as bill}
				<ItemBill name={bill.name} amount={bill.amount} billing_date={bill.billing_date} />
			{/each}
		{:catch error}
			<span class:error={true}>{error.message}</span>
		{/await}
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		margin-bottom: auto;

		padding: 3rem 1rem 1rem 1rem;
		width: 100%;

		gap: 2rem;
	}

	.separator::before {
		content: '';
		display: block;
		height: 1px;
		background: var(--clr-primary);
		width: 100%;
	}

	.bills {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

		gap: 1rem;
	}

	.title {
		font-size: x-large;

		& strong {
			color: var(--clr-primary);
			cursor: pointer;
		}
	}

	.error {
		font-size: x-large;

		color: var(--clr-input-error);
		font-weight: 700;

		text-align: center;
	}
</style>
