// Import necessary modules and functions
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import axios from "axios";

// Define the authentication middleware function
export default function auth({ next }) {
	// Get the 'token' property from the user store as a ref
	const { token } = storeToRefs(useUserStore());

	// Check if the token is null, undefined, or an empty string
	if (token?.value === null || !token?.value || token?.value.length === 0) {
		// Redirect to the sign-in page if the token is not present
		next("/user/signin");
	} else {
		// Set the 'Authorization' header in axios with the bearer token
		axios.defaults.headers.common["Authorization"] = `Bearer ${token.value?.token}`;

		// Continue to the next route in the navigation
		next();
	}
}
