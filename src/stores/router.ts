import { goto } from '$app/navigation';

export function gotoHome() {
	goto('/');
}

export function gotoBills() {
	goto('/bills');
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
