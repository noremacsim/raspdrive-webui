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
import SideNav from "@/layouts/default/SideNav.vue";
import DefaultBar from "@/layouts/default/AppBar.vue";
import GithubLimit from "@/components/Modals/GithubLimit.vue";
import {ref} from "vue";

let showGitLimitModal = ref(false);
</script>
