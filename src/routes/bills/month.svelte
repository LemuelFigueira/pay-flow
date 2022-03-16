<script lang="ts">
	import ItemBill from '../../components/ItemBill.svelte';
	import { t } from '../../i18n';
	import { gotoHome } from '../../stores/router';

	import { billsFilteredSearch, isSigned } from '../../supabase.client';

	async function handleLoadMonthBills() {
		if (!$isSigned) {
			gotoHome();
			throw new Error($t('Must be signed'));
		}
		const response = await billsFilteredSearch({
			p_this_month: 's',
			p_page: 0,
			p_limit: 30,
			p_orderby: 'name',
			p_ascordsc: 'asc'
		});

		return response;
	}
</script>

<main>
	{#await handleLoadMonthBills()}
		<p>...waiting</p>
	{:then bills}
		{#each bills as bill}
			<ItemBill name={bill.name} amount={bill.amount} billing_date={bill.billing_date} />
		{/each}
	{:catch error}
		<span class:error={true}>{error.message}</span>
	{/await}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		margin-bottom: auto;

		padding: 3rem 1rem 1rem 1rem;
		width: 100%;

		gap: 1rem;
	}

	.error {
		font-size: x-large;

		color: var(--clr-input-error);
		font-weight: 700;

		text-align: center;
	}
</style>
