import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived, get } from 'svelte/store';
import { t } from '../i18n';

export const pageTitle = derived([page, t], ([$page]) => {
	switch ($page.url.pathname) {
		case '/bills/month':
			return get(t)('Month bills');
		case '/bills/create':
			return get(t)('Create bills');
		case '/signIn':
			return get(t)('Sign in');
		case '/signUp':
			return get(t)('Sign up');
		case '/':
			return get(t)('Home');
		default:
			return get(t)('Bills');
	}
});

export const isMonthBillsPage = derived(
	[page, t],
	([$page]) => $page.url.pathname === '/bills/month'
);

export const isCreateBillsPage = derived(
	[page, t],
	([$page]) => $page.url.pathname === '/bills/create'
);

export function gotoHome() {
	goto('/');
}

export function gotoMonthlyBills() {
	goto('/bills/month');
}

export function gotoCreateBills() {
	goto('/bills/create');
}

export function gotoSignIn() {
	goto('/signIn');
}

export function gotoSignUp() {
	goto('/signUp');
}
