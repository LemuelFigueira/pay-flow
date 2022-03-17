<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '../../components/Button.svelte';
	import TextInput from '../../components/Input.svelte';
	import Loading from '../../components/loading.svelte';
	import { gotoMonthlyBills } from '../../stores/router';
	import { toast } from '../../stores/toast';
	import { createBillsRecursive } from '../../supabase.client';
	import { getDateFromString } from '../../utils/date';

	const name = writable('');
	const amount = writable<number>();
	const dueDate = writable<number>(1);
	const qtdInstallments = writable<number>(1);

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

			const anyNullValueOnForm = Object.values(form).some((value) => value === null);

			if (anyNullValueOnForm) {
				throw new Error('Preencha todos os campos');
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
		<Loading />
	{:else}
		<div class="content">
			<TextInput bind:value={$name} placeholder="Digite um nome" />
			<TextInput number bind:value={$amount} placeholder="Digite o valor" />
			<TextInput range max={28} bind:value={$dueDate} placeholder="Dia de vencimento" />
			<TextInput
				number
				bind:value={$qtdInstallments}
				placeholder="Digite a quantidade de parcelas"
			/>
		</div>

		<div class="footer">
			<Button on:click={handleSendForm}>Enviar</Button>
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
