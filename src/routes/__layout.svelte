<script lang="ts">
	export const ssr = false;

	import { writable, type Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';

	import Header from '../components/Header.svelte';
	import { isMounting } from '../stores/mount';
	import Toast from '../components/Toast.svelte';

	import Footer from '../components/Footer.svelte';

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

	import icon512 from '../images/ios/512.png';
	const appBackgroundColor = '#FFFFFF';
	const themeColor = '#10B981';
</script>

<link rel="icon" type="image/png" sizes="512x512" href={icon512} />

<meta name="msapplication-TileColor" content={appBackgroundColor} />
<meta name="theme-color" content={themeColor} />

{#if $isMounting === false}
	<div id="app" dark-theme={$isDark}>
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
		<Toast position="top-center" />
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
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;

		align-items: center;
		justify-content: center;

		padding: 1rem 2rem 0 2rem;
	}
</style>
