<script lang="ts">
	import BiSolidStore from 'svelte-icons-pack/bi/BiSolidStore';
	import Icon from 'svelte-icons-pack/Icon.svelte';

	import BiMoon from 'svelte-icons-pack/bi/BiMoon';
	import BiSun from 'svelte-icons-pack/bi/BiSun';
	import BiLogOut from 'svelte-icons-pack/bi/BiLogIn';

	import Select from './Select.svelte';

	import { getContext } from 'svelte';

	import { changeLocale, locale, localesOptions, t } from '../i18n';
	import { pageTitle } from '../stores/router';
	import { isSigned, signOut } from '../supabase.client';

	const { context: isDarkContext } = getContext('isDark');
	const { isDark, handleChangeTheme } = isDarkContext;
</script>

<header>
	<div class="corner">
		<div class="left">
			<a href={$isSigned ? '/bills/month' : '/'}>
				<div is-dark>
					<Icon size="36" src={BiSolidStore} />
					<span>{$pageTitle}</span>
				</div>
			</a>
		</div>

		<div class="right">
			<Select
				value={locale}
				options={localesOptions}
				on:select={(e) => changeLocale(e.detail.value)}
			/>
			<button cursor-pointer is-dark={$isDark || 'N'} on:click={() => handleChangeTheme()}>
				{#if $isDark === 'N'}
					<Icon className="icon" src={BiSun} />
				{:else}
					<Icon className="icon" src={BiMoon} />
				{/if}
			</button>
			<button class:action={true} on:click={signOut} style="padding: 1rem;">
				<Icon className="icon" color="white" size="26" src={BiLogOut} />
			</button>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-self: flex-start;

		background: var(--clr-primary);

		width: 100%;
		padding: 1rem;
	}

	.action {
		cursor: pointer;
		font-size: large;

		&:hover {
			color: var(--clr-gray400);
		}
	}
	@media (max-width: 768px) {
		.action {
			display: none;
		}
	}
	.left span {
		color: var(--clr-gray100);
	}

	a,
	a:active,
	a:focus,
	a:visited {
		outline: 0;
		border: none;
		text-decoration: none;
	}

	.corner {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}

	.corner a {
		& > div {
			display: flex;
			align-items: center;
			justify-content: center;

			gap: 0.4rem;

			min-width: 3em;
			height: 3em;

			& > span {
				font-size: 1.2em;
				font-weight: bold;

				text-transform: uppercase;
			}
		}
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		& > div {
			width: 100%;
		}
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		gap: 1rem;
	}

	:global .icon {
		font-size: xx-large;

		&:active {
			transform: scale(0.9);
		}
	}

	[is-dark] {
		color: var(--clr-gray100);
		fill: var(--clr-gray100);
		stroke: var(--clr-gray100);
	}

	[is-dark='S'] {
		&:hover {
			color: yellow;
			fill: yellow;
			stroke: yellow;
		}
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
