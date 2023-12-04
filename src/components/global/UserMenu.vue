<template>
  <!-- Menu for user account actions -->
  <v-menu
    transition="slide-y-transition"
    location="bottom"
  >
    <!-- Activator button with account icon -->
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <!-- Card containing user actions -->
    <v-card
      class="mt-2"
      rounded="lg"
      :close-on-content-click="false"
    >
      <!-- Card content -->
      <v-card-text class="pa-4">
        <!-- Profile button -->
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-btn
              prepend-icon="mdi-account"
              @click="router.push('/settings/profile')"
              variant="text"
            >
              Profile
            </v-btn>
          </v-col>
        </v-row>

        <!-- Divider between Profile and Logout -->
        <v-divider class="mt-4 mb-4"></v-divider>

        <!-- Logout button -->
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-btn
              prepend-icon="mdi-logout"
              @click="logout"
              variant="text"
              color="semdanger"
            >
              Logout
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
// Importing necessary modules and components
import {useUserStore} from "@/stores/user";
import router from "@/router";

const { logout } = useUserStore(); // Destructuring the logout function from the user store
</script>
