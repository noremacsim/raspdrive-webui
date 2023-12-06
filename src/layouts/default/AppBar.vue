<template>
  <v-toolbar dark="true" color="primary" class="elevation-1 primary">
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
    <v-toolbar-title color="white">
      TeslaCam
    </v-toolbar-title>
    <v-spacer></v-spacer>
<!--    <v-btn icon color="white">-->
<!--      <v-icon>mdi-magnify</v-icon>-->
<!--    </v-btn>-->
    <v-btn icon color="white" @click="showWifiSettings = true">
      <v-icon>mdi-wifi</v-icon>
    </v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon color="white" v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="reboot()"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-restart"></v-icon>
          </template>
          <v-list-item-title>Reboot</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="updateSystem()"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-update"></v-icon>
          </template>
          <v-list-item-title>Update</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <wifi_settings
    :showModal="showWifiSettings"
    @close="showWifiSettings=false"
  ></wifi_settings>

</template>

<script setup>
import router from "@/router";
import {ref} from "vue";
import Wifi_settings from "@/components/modal/wifi_settings.vue";
import {reboot} from "@/common/api/device";


// Reference to the currently selected route
const currentSelected = ref(router.currentRoute.value.name);
const showWifiSettings = ref(false);

// Function to navigate to a specified key and link
function navigate(key, link) {
  currentSelected.value = key;
  router.push(link);
}

function updateSystem() {
  window.location.href = '/cgi-bin/updateweb.sh';
}

</script>
