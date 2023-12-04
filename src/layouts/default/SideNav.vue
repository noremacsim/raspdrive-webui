<template>
  <!-- Navigation drawer with an avatar, ChangeLog title, and a list of items -->
  <v-navigation-drawer
    expand-on-hover="true"
    rail="true"
    permanent="true"
  >
    <v-list>
      <!-- Item in the list with an avatar and title for ChangeLog -->
      <v-list-item
        prepend-avatar="https://v82.staging.semestry.com/favicon.ico"
        title="ChangeLog"
      ></v-list-item>
    </v-list>

    <!-- Divider to separate the ChangeLog from the main list -->
    <v-divider></v-divider>

    <!-- List of items for navigation with icons and titles -->
    <v-list
      density="compact"
      nav="true"
      color="semdarkgreen"
    >
      <!-- Iterate through menu items and create a list item for each -->
      <v-list-item
        v-for="item in menu"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        :active="item.url.includes(Router.currentRoute.value.path)"
        @click="navigateTo(`${item.url}`)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// Import necessary modules
import {useRouter} from 'vue-router';
import {ref} from "vue";
import Router from "@/router";

// Define a ref for the menu items
let menu = ref([
  {
    title: "Jira's",
    value: 'JiraReport',
    icon: 'mdi-jira',
    url: '/reports/jira',
  },
  {
    title: 'Commits',
    value: 'CommitsReport',
    icon: 'mdi-github',
    url: '/reports/git',
  },
  {
    title: 'Saved',
    value: 'customReports',
    icon: 'mdi-folder',
    url: '/reports/custom',
  },
]);

// Get the router instance
const router = useRouter();

// Function to navigate to the specified route
function navigateTo(route) {
  // Check if the current route is the same as the target route
  if (Router.currentRoute.value.path === route) {
    // Replace the route with a query parameter to force a reload
    router.replace(`${route}?lr=1`);
  } else {
    // Replace the route without a query parameter
    router.replace(route);
  }
}
</script>
