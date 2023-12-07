<template>
  <v-card
    rounded="lg"
    class="mt-2 mb-0 pb-0"
  >
    <v-list
      :lines="false"
    >
      <v-list-item>
        USB Events
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
    <v-list
      :lines="false"
      density="compact"
      class="overflow-y-auto"
      max-height="200"
    >
      <v-list-item
        v-if="!loading"
        v-for="(item, i) in events"
        :key="i"
        :value="item"
        color="primary"
      >
        <template v-slot:subtitle="{ log }">
          <div v-html="item.log"></div>
        </template>
      </v-list-item>
    </v-list>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getUSBEvents} from "@/common/api/device";

let loading = ref(true);
let events = ref([]);

onMounted(async () => {
  loading.value = false;
  events.value = await getUSBEvents()
});

</script>
