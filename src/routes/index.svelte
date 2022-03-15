<script>
	import { goto } from '$app/navigation';

	import { t } from '../i18n';

	function gotoSignIn() {
		goto('/signIn');
	}

	function gotoSignUp() {
		goto('/signUp');
	}
</script>

<main>
	<button class:primary={true} on:click={gotoSignIn}>{$t('Sign In')}</button>
	<button class:secondary={true} on:click={gotoSignUp}>{$t('Sign Up')}</button>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;

		background: var(--clr-light);
	}

	button {
		width: 100%;

		font-weight: 700;
		text-transform: uppercase;
	}

	.primary {
		background: var(--clr-primary);
		color: var(--clr-gray100);
	}

	.secondary {
		color: var(--clr-primary);
	}
</style>
