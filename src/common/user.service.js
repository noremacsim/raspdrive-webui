// Importing the ApiService for making API requests
import apiService from "@/common/api.service";

// Importing necessary modules for notifications and state management
import {useToast} from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import {useDataStore} from "@/stores/data";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";

const toast = useToast();

// UserService object with methods for user authentication
const userService = {

	// Method to log in a user
	loginUser(username, password) {
		return new Promise((resolve, reject) => {
			// Making a POST request to the authentication endpoint
			apiService.post("/auth/login", { username: username, password: password }).then((data) => {
				// Resolving the promise with the received data
				resolve(data);
			}).catch((data) => {
				// Handling errors and displaying a toast notification
				if (data?.response?.data) {
					toast.error(data?.response?.data?.message);
				}
				// Rejecting the promise
				reject();
			});
		});
	},

	// Method to logout a user
	logoutUser() {
		// Destructuring reactive state variables from the data and user stores
		const { config, taskQue } = storeToRefs(useDataStore());
		const { user, token } = storeToRefs(useUserStore());

		// Resetting state variables to their initial values
		config.value = {
			"id": null,
			"org": "",
			"repo": "",
			"git_token": "",
			"jira_token": "",
			"jira_email": "",
		};
		taskQue.value = [];
		user.value = [];
		token.value = [];
	}

};

// Exporting the UserService object as the default export
export default userService;
