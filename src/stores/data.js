import {defineStore} from "pinia";
import {ref} from "vue";
import {useStorage} from "@vueuse/core";
import apiService from "@/common/api.service";

export const useDataStore = defineStore("data", () => {

	// Define reactive properties for the store
	const config = ref(useStorage("config", {}));
	const taskQue = ref(useStorage("taskQue", []));
	const loading = ref(useStorage("configLoading", {
		"github": true,
		"jira": true,
	}));

	// Function to fetch data from the server based on the provided type
	async function getData(type) {
		return new Promise((resolve, reject) => {
			apiService.get(`/app/${type}`).then((data) => {
				resolve(data?.data);
			}).catch(() => {
				console.log("error");
				reject();
			});
		});
	}

	// Function to fetch configuration data
	async function getConfig(){
		loading.value.github = true;
		loading.value.jira = true;
		await getData("config").then((data) => {
			if (data) {
				config.value = data;
				checkData();
			}
		});
	}

	// Function to check and set default values for missing data
	async function checkData() {

		// Github Config
		if (!config.value["github"]) {
			config.value["github"] = {"settings": {"org": "", "repo": ""}, "token": ""};
		}

		// Jira Config
		if (!config.value["jira"]) {
			config.value["jira"] = {"username": "", "token": ""};
		}

		loading.value.github = false;
		loading.value.jira = false;
	}

	// Function to fetch task queue data
	async function getTaskQue() {
		await getData("taskQue").then(data => {
			taskQue.value = data;
		});
	}

	// Function to save configuration data for a specific integration
	async function saveConfig(integration) {
		return new Promise((resolve, reject) => {
			apiService.post(`/app/config/${integration}`, config.value[`${integration}`]).then((data) => {
				console.log(data);
				resolve();
			}).catch((data) => {
				console.log(data);
				reject();
			});
		});
	}

	// Expose properties and functions to be used in components
	return {
		config,
		taskQue,
		saveConfig,
		getConfig,
		getTaskQue
	};
});
