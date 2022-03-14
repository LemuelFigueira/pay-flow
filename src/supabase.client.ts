import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

const supabaseUrl = String(import.meta.env.VITE_SVELTE_APP_SUPABASE_URL);
const supabaseAnonKey = String(import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const userStore = writable<{ id: string; email: string; name: string }>();

export const isSigned = writable(false);

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN') {
		userStore.set({
			id: session.user.id,
			email: session.user.email,
			name: session.user.user_metadata.name
		});
		isSigned.set(true);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
		isSigned.set(false);
	}
});

export function signIn(email: string, password: string) {
	return supabase.auth.signIn({ email, password });
}

export async function signUp(email: string, name: string, password: string) {
	return await supabase.auth.signUp(
		{ email, password },
		{
			data: {
				name
			}
		}
	);
}

export function signOut() {
	return supabase.auth.signOut();
}
