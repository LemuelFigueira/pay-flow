<script lang="ts">
	export let name: string;
	export let amount: number;
	export let billing_date: string;
</script>

<main>
	<div class="left">
		<span class:title={true}>{name}</span>
		<span class:date={true}>{billing_date}</span>
	</div>
	<div class="right">
		<span class:money={true}>{amount}</span>
	</div>
</main>

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

	.amount {
		font-size: large;
		font-weight: 700;

		color: var(--clr-primary);
	}
</style>
