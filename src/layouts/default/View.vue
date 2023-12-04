<template>
  <v-layout>
    <DefaultBar />
    <v-main class="bg-white">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import DefaultBar from "@/layouts/default/AppBar.vue";
</script>
