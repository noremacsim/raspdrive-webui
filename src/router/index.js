// Import necessary functions and modules from Vue Router
import {createRouter, createWebHistory} from "vue-router";

// Define the routes for your application
const routes = [
	// Default layout with Home and Settings components
	{
		path: "/",
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
export default router;
