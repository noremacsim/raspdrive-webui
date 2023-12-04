<template>
  <v-app>
    <v-layout>
      <v-main>
        <DefaultBar />
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import DefaultBar from "@/layouts/default/AppBar.vue";
</script>
