import {h} from "vue";
import {VChip, VBtn} from "vuetify/components";
import router from "@/router";
import ApiService from "@/common/api.service";

// component for custom table
export const tableComponents = {

	// Version label component
	versionLabel(componentData) {
		// Props for VChip component
		const props = {
			"prepend-icon": "mdi-label",
			"class": "ma-2",
			"color": "semgreen",
			"text-color": "white",
			"label": true,
		};

		return {
			functional: true,
			// Render function for VChip component
			render() {
				if (componentData.tag) {
					return h(VChip, props, `${componentData.tag}`);
				} else {
					return ""; // Render nothing if no tag is present
				}
			},
		};
	},

	// Total commits component
	totalCommits(componentData) {
		console.log(componentData);
		// Props for VChip component
		const props = {
			"prepend-icon": "mdi-source-commit",
			"class": "ma-2",
			"variant": "outlined",
			"color": "primary",
			"text-color": "white",
			// Navigation on click to the Git report page with filtered commits
			onClick: () => {
				router.push(`/reports/git?filter={"commits":{"columnFilters":[{"label":"Jira+ID","key":"JiraId","operation":"Matches","value":"${componentData.id}"}]}}`);
			},
		};

		return {
			functional: true,
			render() {
				return h(VChip, props, `${componentData.Commits.length} Commits`);
			},
		};
	},

	removeSession(componentData) {
		const props = {
			"prepend-icon": "mdi-delete",
			"color": "red",
			"text-color": "white",
			"onClick": () => {
				ApiService.post("/user/session/delete", {"sessionId": componentData.id});
			}
		};

		return {
			functional: true,
			render() {
				if (componentData.id) {
					return h(VBtn, props, "Remove");
				} else {
					return "";
				}
			},
		};
	},
};

export default tableComponents;
