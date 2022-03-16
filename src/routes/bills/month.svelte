<script lang="ts">
	import ItemBill from '../../components/ItemBill.svelte';

	import { billsFilteredSearch, isSigned, userStore } from '../../supabase.client';

	async function handleLoadMonthBills() {
		if (!$isSigned) return;
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
		<p style="color: red">{error.message}</p>
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
</style>
