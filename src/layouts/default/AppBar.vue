<template>
  <v-toolbar dark="true" color="primary" class="elevation-1 primary">
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
    <v-toolbar-title color="white">
      TeslaCam
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon color="white">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon color="white">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon color="white">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";

// Reference to the currently selected route
const currentSelected = ref(router.currentRoute.value.name);

// Function to navigate to a specified key and link
function navigate(key, link) {
  currentSelected.value = key;
  router.push(link);
}
</script>
