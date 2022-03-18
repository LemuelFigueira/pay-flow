<script lang="ts">
	import AiOutlineTable from 'svelte-icons-pack/ai/AiOutlineTable';
	import AiOutlinePlus from 'svelte-icons-pack/ai/AiOutlinePlus';
	import BiLogOut from 'svelte-icons-pack/bi/BiLogIn';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { gotoMonthlyBills, gotoCreateBills } from '../stores/router';
	import { isSigned, signOut } from '../supabase.client';
</script>

<footer>
	<button
		class:pointer={true}
		class:left={true}
		class:hidden={!$isSigned}
		class="home"
		on:click={signOut}
	>
		<Icon size="24" src={BiLogOut} />
	</button>
	<button
		class:pointer={true}
		class:center={true}
		class:hidden={!$isSigned}
		class="addBill"
		on:click={() => gotoCreateBills()}
	>
		<Icon size="24" src={AiOutlinePlus} />
	</button>

	<button
		class:pointer={true}
		class:right={true}
		class:hidden={!$isSigned}
		class="showBills"
		on:click={gotoMonthlyBills}
	>
		<Icon size="24" src={AiOutlineTable} />
	</button>
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		width: 100%;
		background: var(--clr-light);

		margin: 1rem 0;

		@media (min-width: 768px) {
			display: none;
		}
	}

	footer .center {
		margin-bottom: 1rem;
	}

	:global footer svg {
		fill: var(--clr-font);
	}

	:global footer .center svg {
		background: var(--clr-primary);
		fill: var(--clr-gray100);

		border-radius: var(--br);
	}

	footer button {
		width: max-content;
	}

	.pointer {
		cursor: pointer;
	}

	.pointer:active {
		transform: scale(0.9);
	}

	.hidden {
		display: none;
	}
</style>
