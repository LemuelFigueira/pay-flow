import { writable, derived } from 'svelte/store';

const TIMEOUT = {
	default: 2000,
	danger: 5000,
	warning: 3000,
	info: 3000,
	success: 5000
};

function createNotificationStore() {
	const _notifications = writable<{ id: string; type: string; message: string; timeout: number }[]>(
		[]
	);

	function send(message: string, type = 'default', p_id: string) {
		let timeout = TIMEOUT.default;

		switch (type) {
			case 'danger':
				timeout = TIMEOUT.danger;
				break;
			case 'warning':
				timeout = TIMEOUT.warning;
				break;
			case 'info':
				timeout = TIMEOUT.info;
				break;
			case 'success':
				timeout = TIMEOUT.success;
				break;
			default:
				timeout = TIMEOUT.default;
				break;
		}

		_notifications.update((state) => {
			const filteredPrevState = state.filter((item) => item.id !== p_id);
			return [...filteredPrevState, { id: p_id, type, message, timeout }];
		});
	}

	const notifications = derived(_notifications, ($_notifications, set) => {
		set($_notifications);
		if ($_notifications.length > 0) {
			const timer = setTimeout(() => {
				_notifications.update((state) => {
					state.shift();
					return state;
				});
			}, $_notifications[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});

	const { subscribe } = notifications;

	return {
		subscribe,
		send,
		default: (msg: string, p_id = id()) => send(msg, 'default', p_id),
		danger: (msg: string, p_id = id()) => send(msg, 'danger', p_id),
		warning: (msg: string, p_id = id()) => send(msg, 'warning', p_id),
		info: (msg: string, p_id = id()) => send(msg, 'info', p_id),
		success: (msg: string, p_id = id()) => send(msg, 'success', p_id)
	};
}

function id() {
	return '_' + Math.random().toString(36).substr(2, 9);
}

export const toast = createNotificationStore();
