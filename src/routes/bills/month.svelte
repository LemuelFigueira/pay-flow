<script lang="ts">
	import Icon from 'svelte-icons-pack';

	import { writable } from 'svelte/store';

	import AiOutlinePlus from 'svelte-icons-pack/ai/AiOutlinePlus';

	import ItemBill from '../../components/ItemBill.svelte';
	import MonthPicker from '../../components/MonthPicker.svelte';
	import { t } from '../../i18n';
	import { monthNames } from '../../stores/calendar';
	import { gotoCreateBills, gotoHome } from '../../stores/router';

	import { billsFilteredSearch, isSigned, userStore } from '../../supabase.client';

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
			p_ascordsc: 'asc',
			p_user: $userStore.id
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
	<div class="header">
		<span class:title={true}>
			{$t('Bills')}
			{$t('from')}
			<strong on:click={() => showModal.update((old) => !old)}>
				{$t(monthNames[$monthNumber - 1])}
			</strong>
		</span>

		<button
			class:pointer={true}
			class:center={true}
			class:hidden={!$isSigned}
			class="addBill"
			on:click={() => gotoCreateBills('?month=' + $monthNumber)}
		>
			<Icon size="24" src={AiOutlinePlus} />
		</button>
	</div>

	<div class="separator" />
	<div class="bills">
		{#await handleLoadMonthBillsPromise}
			<p>{$t('Waiting')}</p>
		{:then bills}
			{#each bills as bill}
				<ItemBill
					name={bill.name}
					amount={bill.amount}
					billing_date={bill.billing_date}
					id={bill.id}
					receipt={bill.receipt}
					on:remove_receipt={() => {
						bill.receipt = undefined;
					}}
					on:insert_receipt={(e) => {
						bill.receipt = e.detail.value;
					}}
				/>
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

		@media (min-width: 768px) {
			width: 60vw;
		}

		gap: 2rem;
	}

	.header {
		display: flex;
		justify-content: space-between;

		width: 100%;
	}

	.addBill {
		cursor: pointer;

		:global svg {
			color: var(--clr-primary);
			fill: var(--clr-primary);
		}
	}

	.separator {
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

		color: var(--clr-gray500);
		font-weight: 600;

		text-align: center;
	}
</style>
