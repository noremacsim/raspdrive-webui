<template>
  <v-container fluid>
    <Stats/>
    <Files />
    <EventsLog />
  </v-container>
</template>
<script setup>
import Stats from "@/components/Stats.vue";
import Files from "@/components/FileBrowser.vue";
import EventsLog from "@/components/EventsLog.vue";
</script>

