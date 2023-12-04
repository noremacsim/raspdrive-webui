<template>
  <v-layout>
    <DefaultBar />
    <SideNav />
    <v-main class="bg-white">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import DefaultBar from "@/layouts/default/AppBar.vue";
import SideNav from "@/layouts/default/SideNav.vue";
</script>
