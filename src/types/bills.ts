export type BillsFilteredSearchParams = {
	p_id?: string;
	p_name?: string;
	p_user?: string;
	p_paid?: string;
	p_month_number?: number;
	p_page: number;
	p_limit: number;
	p_orderby: string;
	p_ascordsc: string;
};

export type Bill = {
	amount: number;
	billing_date: string;
	dt_criacao: string;
	id_usuario: string;
	name: string;
	qtd: number;
	receipt: string;
	usuario: string;
};
