import { goto } from '$app/navigation';

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
