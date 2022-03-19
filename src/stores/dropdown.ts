import { createEventDispatcher } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const open: Writable<boolean> = writable(false);
export function clickOutside(node) {
	const dispatch = createEventDispatcher();
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
			dispatch('click_outside');
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
