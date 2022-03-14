<script lang="ts">
	export const ssr = false;

	import { writable, type Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';

	import Header from '../components/Header.svelte';
	import { isMounting } from '../stores/mount';
	import Toast from '../components/Toast.svelte';

	import AiOutlineTable from 'svelte-icons-pack/ai/AiOutlineTable';
	import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
	import AiOutlinePlus from 'svelte-icons-pack/ai/AiOutlinePlus';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { goHome } from '../stores/router';

	const isDark = writable<string>('N');

	setContext<{
		context: {
			isDark: Writable<string>;
			handleChangeTheme: () => void;
		};
	}>('isDark', {
		context: {
			handleChangeTheme,
			isDark
		}
	});

	function handleChangeTheme() {
		isDark.update((old: string) => (old === 'S' ? 'N' : 'S'));

		sessionStorage.setItem('isDark', $isDark);
	}

	onMount(() => {
		const storagedIsDark = sessionStorage.getItem('isDark');

		if (storagedIsDark) {
			$isDark = storagedIsDark;
		}

		isMounting.set(false);
	});
</script>

{#if $isMounting === false}
	<div id="app" dark-theme={$isDark}>
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<button class:pointer={true} class:left={true} class="home" on:click={goHome}>
				<Icon size="24" src={AiFillHome} />
			</button>
			<button class:pointer={true} class:center={true} class="addBill">
				<Icon size="24" src={AiOutlinePlus} />
			</button>
			<button class:pointer={true} class:right={true} class="showBills">
				<Icon size="24" src={AiOutlineTable} />
			</button>
		</footer>
		<Toast />
	</div>
{/if}

<style>
	@import '../app.module.scss';

	#app {
		min-height: 100vh;

		background: var(--clr-light);

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		color: var(--clr-font);

		padding: 0 2rem;
	}

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

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
