<script lang="ts">
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
			<p>
				<span>{bill.name}</span>
				<span>{bill.amount}</span>
				<span>vence em {bill.billing_date}</span>
			</p>
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

		padding: 1rem;
	}
</style>
