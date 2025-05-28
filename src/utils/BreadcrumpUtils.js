import { DASHBOARD_URL } from './Utils'

export const SALES_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: "Sotuv bo'limi",
		primary: true,
	},
]

export const SALES_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: "Sotuv bo'limi",
		url: `/${DASHBOARD_URL.sales}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const NEWS_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Yangiliklar',
		primary: true,
	},
]

export const NEWS_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Yangiliklar',
		url: `/${DASHBOARD_URL.news}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const SUB_NEWS_BREADCRUMP = id => {
	return [
		{
			name: 'Asosiy sahifa',
			url: `/${DASHBOARD_URL.dashboard}`,
			primary: false,
		},
		{
			name: 'Yangiliklar',
			url: `/${DASHBOARD_URL.news}`,
			primary: false,
		},
		{
			name: 'Ichki yangiliklar',
			primary: true,
		},
	]
}

export const SUB_NEWS_BREADCRUMP_ADD = id => {
	return [
		{
			name: 'Asosiy sahifa',
			url: `/${DASHBOARD_URL.dashboard}`,
			primary: false,
		},
		{
			name: 'Yangiliklar',
			url: `/${DASHBOARD_URL.news}`,
			primary: false,
		},
		{
			name: 'Ichki yangiliklar',
			url: `/${DASHBOARD_URL.goNews}/${id}`,
			primary: false,
		},
		{
			name: 'Saqlash',
			primary: true,
		},
	]
}
export const PROJECTS_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Loyihalar',
		primary: true,
	},
]

export const PROJECTS_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Loyihalar',
		url: `/${DASHBOARD_URL.projects}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const ARCHETECTURAS_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kvartiralar',
		primary: true,
	},
]

export const ARCHETECTURAS_BREADCRUMP_ADD = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Kvartiralar',
		url: `/${DASHBOARD_URL.archetecturas}`,
		primary: false,
	},
	{
		name: 'Saqlash',
		primary: true,
	},
]

export const ARCHETECTURAS_ORDER_BREADCRUMP = [
	{
		name: 'Asosiy sahifa',
		url: `/${DASHBOARD_URL.dashboard}`,
		primary: false,
	},
	{
		name: 'Buyurtmalar',
		primary: true,
	},
]
