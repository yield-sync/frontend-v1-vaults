import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "dashboard",
		component: () =>
		{
			return import("../views/DashboardView.vue");
		}
	},
	{
		path: "/about",
		name: "about",
		component: () =>
		{
			return import("../views/AboutView.vue");
		}
	},
	{
		path: "/sign-message",
		name: "sign-message",
		component: () =>
		{
			return import("../views/SignMessageView.vue");
		}
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
