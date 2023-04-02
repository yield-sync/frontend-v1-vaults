import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/balances/:address",
		name: "balances",
		component: () =>
		{
			return import("../views/RVBalances.vue");
		}
	},
	{
		path: "/",
		name: "dashboard",
		component: () =>
		{
			return import("../views/RVDashboard.vue");
		}
	},
	{
		path: "/governance",
		name: "governance",
		component: () =>
		{
			return import("../views/RVGovernance.vue");
		}
	},
	{
		path: "/sign-message",
		name: "sign-message",
		component: () =>
		{
			return import("../views/RVSignMessage.vue");
		}
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
