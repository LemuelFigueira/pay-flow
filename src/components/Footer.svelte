<script lang="ts">
	import AiOutlineTable from 'svelte-icons-pack/ai/AiOutlineTable';
	import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
	import AiOutlinePlus from 'svelte-icons-pack/ai/AiOutlinePlus';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { goHome } from '../stores/router';

	export function add() {
		console.log('adicionar');
	}

	export function list() {
		console.log('listar');
	}
</script>

<footer>
	<button class:pointer={true} class:left={true} class="home" on:click={goHome}>
		<Icon size="24" src={AiFillHome} />
	</button>
	<button class:pointer={true} class:center={true} class="addBill" on:click={add}>
		<Icon size="24" src={AiOutlinePlus} />
	</button>
	<button class:pointer={true} class:right={true} class="showBills" on:click={list}>
		<Icon size="24" src={AiOutlineTable} />
	</button>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		width: 100%;
		background: var(--clr-light);

		padding: 1rem;
	}

	footer .center {
		padding-bottom: 1rem;
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

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
