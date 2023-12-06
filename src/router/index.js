// Import necessary functions and modules from Vue Router
import {createRouter, createWebHistory} from "vue-router";

// Define the routes for your application
const routes = [
	// Default layout with Home and Settings components
	{
		path: "/app",
		component: () => import("@/layouts/default/Default.vue"),
		children: [
			{
				path: "",
				name: "Home",
				component: () => import("@/views/Viewer.vue"),
			},
		],
	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
