<template>
  <!-- Main container for changing password -->
  <v-sheet min-height="70vh" rounded="lg" color="transparent">
    <!-- Card for changing password -->
    <v-card class="mb-5" rounded="lg">
      <!-- Card title -->
      <v-card-title class="bg-white py-4 font-weight-bold">
        Change Password
      </v-card-title>
      <!-- Divider for visual separation -->
      <v-divider></v-divider>
      <!-- Card content with password change fields -->
      <v-card-text class="pa-7">
        <!-- Old Password input field -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Old Password</v-label>
            <v-text-field
              v-model="data.oldPassword"
              color="primary"
              variant="outlined"
              density="compact"
              type="password"
            hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- New Password and Confirm New Password input fields -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">New Password</v-label>
            <v-text-field
              v-model="data.newPassword"
              color="primary"
              variant="outlined"
              density="compact"
              type="password"
            hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Confirm New Password</v-label>
            <v-text-field
              v-model="data.copyPassword"
              color="primary"
              variant="outlined"
              density="compact"
              type="password"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Divider for visual separation -->
      <v-divider></v-divider>
      <!-- Card actions with Change Password button -->
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <!-- Change Password button -->
        <v-btn
          :loading="loading"
          class="px-5"
          color="semdanger"
          elevation="1"
          variant="elevated"
          @click="save"
        >
          Change Password
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
let data = ref({oldPassword: '', newPassword: '', copyPassword: '', id: user.value.id});

function save() {
  loading.value = true;

  if (data.value.newPassword === data.value.copyPassword) {
    ApiService.post('/user/password', data.value).then(() => {
      loading.value = false;
      toast.success('Successfully Updated Password');
    }).catch(() => {
      loading.value = false;
      toast.error('Failed to update Password');
    });
  } else {
    loading.value = false;
    toast.error('Passwords Dont Match');
  }

}

console.log(user);

</script>
