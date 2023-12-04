import axios from "axios";
import {useToast} from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import router from "@/router";

const toast = useToast();

const ApiService = {

	// Make a GET request
	get(resource) {
		return axios.get(`${resource}`).catch(error => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	// Make a POST request with error handling and notifications
	post(resource, data) {
		return new Promise((resolve, reject) => {
			let config = {
				method: "post",
				url: resource,
				data: data
			};

			axios(config).then((data) => {
				resolve(data);
			}).catch((data) => {
				if (data.response.data) {
					// Handle specific HTTP status codes with notifications
					switch (data.response.data.statusCode) {
					case 401:
						toast.open({
							message: data?.response?.data?.message,
							type: "error",
							duration: 3000
						});
						break;
					case 403:
						toast.open({
							message: data?.response?.data?.message,
							type: "warning",
							duration: 3000
						});
						router.push("/user/signin");
						break;
					default:
						break;
					}
				}
				reject(data);
			});
		});
	},
};

export default ApiService;
