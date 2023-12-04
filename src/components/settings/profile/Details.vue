<template>
  <!-- Main container for account settings -->
  <v-sheet min-height="70vh" rounded="lg" color="transparent">
    <!-- Card for account settings -->
    <v-card class="mb-5" rounded="lg">
      <!-- Card title -->
      <v-card-title class="bg-white py-4 font-weight-bold">
        Account Settings
      </v-card-title>
      <!-- Divider for visual separation -->
      <v-divider></v-divider>
      <!-- Card content with account details -->
      <v-card-text class="pa-7">
        <!-- Username input field -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Username</v-label>
            <v-text-field
              v-model="user.username"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- First and Last Name input fields -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">First Name</v-label>
            <v-text-field
              v-model="user.firstName"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Last Name</v-label>
            <v-text-field
              v-model="user.lastName"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Email input field -->
        <v-row>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Email</v-label>
            <v-text-field
              v-model="user.email"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Divider for visual separation -->
      <v-divider></v-divider>
      <!-- Card actions with Save button -->
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <!-- Save button -->
        <v-btn
          :loading="loading"
          class="px-5"
          color="semgreen"
          elevation="1"
          variant="elevated"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import ApiService from "@/common/api.service";
const { user } = storeToRefs(useUserStore());
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


const toast = useToast();
let loading = ref(false);

function save() {
  loading.value = true;

  ApiService.post('/user/update', user.value).then(() => {
    loading.value = false;
    toast.success('Succesfully Updated User Details');
  }).catch(() => {
    loading.value = false;
    toast.error('Failed to update Details');
  });

}

console.log(user);

</script>
