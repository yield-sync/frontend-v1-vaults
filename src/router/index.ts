import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import HomeView from "../views/HomeView.vue"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/about",
		name: "about",
		component: () => 
		{
			return import("../views/AboutView.vue")
		}
	},
	{
		path: "/sign-message",
		name: "sign-message",
		component: () => 
		{
			return import("../views/SignMessageView.vue")
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
