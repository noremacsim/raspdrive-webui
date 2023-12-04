import {defineStore} from "pinia";
import {ref} from "vue";
import {useStorage} from "@vueuse/core";
import userService from "@/common/user.service";
import router from "@/router";

export const useUserStore = defineStore("user", () => {

	// Define reactive properties for the store
	const user = ref(useStorage("user", []));
	const token = ref(useStorage("token", []));

	// Function to handle user login
	async function login(username, password) {
		return new Promise((resolve, reject) => {
			userService.loginUser(username, password).then((data) => {
				// Set user and token properties with the received data
				this.user = data?.data?.user;
				this.token = data?.data?.authToken;
				resolve();
			}).catch(() => {
				reject();
			});
		});
	}

	// Function to handle user logout
	function logout() {
		userService.logoutUser();
		router.push("/user/signin");
	}

	// Expose properties and functions to be used in components
	return {
		user,
		token,
		login,
		logout
	};
});
