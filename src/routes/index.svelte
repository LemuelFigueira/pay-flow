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
	<button cursor-pointer class:primary={true} on:click={gotoSignIn}>{$t('Sign In')}</button>
	<button cursor-pointer class:secondary={true} on:click={gotoSignUp}>{$t('Sign Up')}</button>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;

		background: var(--clr-light);

		@media (min-width: 768px) {
			width: 60%;
		}
	}

	button {
		width: 100%;

		font-weight: 700;
		text-transform: uppercase;

		&:hover {
			filter: brightness(0.9);
		}
	}

	.primary {
		background: var(--clr-primary);
		color: var(--clr-gray100);
	}

	.secondary {
		color: var(--clr-primary);
	}
</style>
