import { createClient } from '@supabase/supabase-js';
import { get, writable } from 'svelte/store';
import { t } from './i18n';
import { toast } from './stores/toast';

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

export async function createBillsRecursive(
	p_name: string,
	p_amount: number,
	p_billing_date: string = new Date().toISOString().split('T')[0],
	p_installments_qtd = 1
) {
	try {
		const { data, error, status } = await supabase.rpc('sp_se_create_bill_recursive', {
			p_name,
			p_amount,
			p_billing_date,
			p_installments_qtd
		});

		if (error) {
			switch (status) {
				case 409:
					throw new Error(get(t)('Bills already exists'));
				default:
					throw new Error(get(t)('Error creating bills'));
			}
		}

		toast.success(get(t)('Successfully created bills'));

		return data;
	} catch (error) {
		toast.danger(error.message);
	}
}
