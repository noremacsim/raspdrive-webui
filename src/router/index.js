// Import necessary functions and modules from Vue Router
import {createRouter, createWebHistory} from "vue-router";
import auth from "../middleware/auth";

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

// Create the router instance
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// Middleware function to handle navigation guards
function nextFactory(context, middleware, index) {
	const subsequentMiddleware = middleware[index];

	if (!subsequentMiddleware) {
		return context.next;
	}

	return (...parameters) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index + 1);
		subsequentMiddleware({ ...context, next: nextMiddleware });
	};
}

// Global navigation guard to apply middleware
router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware)
			? to.meta.middleware
			: [to.meta.middleware];

		const context = {
			from,
			next,
			router,
			to,
		};

		const nextMiddleware = nextFactory(context, middleware, 1);

		return middleware[0]({ ...context, next: nextMiddleware });
	}

	return next();
});

// Export the router instance
export default router;
