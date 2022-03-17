import { derived, writable } from 'svelte/store';

export const whichPicker = writable<'month' | 'days'>('days');

export const month = writable(new Date().getMonth());
export const year = writable(new Date().getFullYear());

export const isToday = derived([year, month], ([$year, $month]) => (_day: number) => {
	const date = new Date($year, $month, _day).toLocaleDateString();

	const today = new Date().toLocaleDateString();

	return date === today;
});

export const weekDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const getFebruaryDays = (year: number) => {
	if (year % 4 === 0) {
		return 29;
	}
	return 28;
};

export const monthDays = derived([year], ([$year]) => {
	return [31, getFebruaryDays($year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
});

function createArrayBySpecificLength(length: number, fillWithZero?: boolean) {
	return new Array(length).fill(null).map((_, i) => (fillWithZero ? 0 : i + 1));
}

function generateMonthNumberDays(_month: number, _year: number, _monthDays: number[]) {
	const firstDayNumber = new Date(_year, _month, 1).getDay();

	const aux = createArrayBySpecificLength(firstDayNumber, true);
	const monthDaysList = createArrayBySpecificLength(_monthDays[_month]);

	return [].concat(aux, monthDaysList);
}

export const monthName = derived([month], ([$month]) => {
	return monthNames[$month];
});

export function increaseYear() {
	year.update((y) => y + 1);
}

export function decreaseYear() {
	year.update((y) => y - 1);
}

export function changePicker() {
	whichPicker.update((p) => (p === 'month' ? 'days' : 'month'));
}

export function getMonthNumberByName(value: string) {
	return monthNames.indexOf(value);
}

export function selectMonth(value: number) {
	month.set(value);
	changePicker();
}

export const monthDaysAsNumber = derived(
	[year, month, monthDays],
	([$year, $month, $monthDays]) => {
		return generateMonthNumberDays($month, $year, $monthDays);
	}
);
