<template>
  <v-card
    rounded="lg"
    class="mt-2"
  >
    <v-card-item>
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-usb"
          size="18"
          color="purple"
          class="me-1 pb-1"
        ></v-icon>

        Pi USB Stats
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <v-progress-linear
            v-model="stats.sizePercent"
            color="primary"
            height="25"
            class="rounded-lg"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact">
        <v-list-item-subtitle>🟢 {{ stats.uptime }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact">
        <v-list-item-subtitle>🔥 {{ stats.cpuTemp }}</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-divider></v-divider>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getPiStatus} from "@/common/api/device";
let stats = ref({});


onMounted(() => {
  setInterval(() => {
    updateStats();
  }, 1000)

});

async function updateStats() {
  stats.value = await getPiStatus();
}

</script>
