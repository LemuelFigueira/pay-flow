import { derived, writable } from 'svelte/store';
import type { GenericOption } from '../types';
import translations from './translations';

export const locale = writable<GenericOption>({
	label: 'PT-BR',
	value: 'pt-BR'
});
export const locales = Object.keys(translations);
export const localesOptions = locales.map((locale) => ({
	label: locale.toUpperCase(),
	value: locale
}));

export function changeLocale(value: string) {
	if (!locales.some((locale) => locale === value)) return;
	locale.set({
		label: value.toUpperCase(),
		value
	});
}

function translate(locale, key, vars) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	let text = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key, vars = {}) =>
			translate($locale.value, key, vars)
);
