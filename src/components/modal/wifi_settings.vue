<template>
  <!-- Dialog for configuring GitHub settings -->
  <v-dialog
    v-model="showModal"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >

    <!-- Card containing configuration form -->
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ ssid }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            variant="text"
            @click="save()"
          >
            Connect
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Card content with configuration fields -->
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Password</v-label>
            <v-text-field
              v-model="wifiPassword"
              color="primary"
              variant="outlined"
              density="compact"
              type="password"
              placeholder="Wifi Password"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importing necessary modules and components
import {ref, toRefs} from "vue";
import {updateWifi} from "@/common/api/device";
const props = defineProps(['showModal', 'ssid']);
const { showModal, ssid } = toRefs(props);
const emit = defineEmits(['close']);

const wifiName = ref('');
const wifiPassword = ref('');

async function save() {
  await updateWifi(ssid.value, wifiPassword.value);
  emit('close');
}

function close() {
  emit('close');
}

</script>
