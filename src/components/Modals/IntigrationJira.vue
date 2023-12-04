<template>
  <!-- Dialog for configuring Jira settings -->
  <v-dialog
    v-model="showModal"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <!-- Card containing configuration form -->
    <v-card
      rounded="lg"
      max-height="500"
      class="mr-8 ml-8"
      min-width="400"
    >

      <!-- Card content with configuration fields -->
      <v-card-text class="pa-7">
        <v-row>
          <!-- Jira Email input field -->
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Jira Email</v-label>
            <v-text-field
              v-model="config['jira'].username"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="Email"
              hide-details
            />
          </v-col>
          <!-- Jira Token input field -->
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Jira Token</v-label>
            <v-text-field
              v-model="config['jira'].token"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="Token"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Action buttons at the bottom of the dialog -->
      <v-row class="ma-3">
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn
          color="semdanger"
          variant="outlined"
          class="mr-2"
          @click="emit('close')"
        >
          Close
        </v-btn>
        <!-- Save button -->
        <v-btn
          color="semgreen"
          variant="elevated"
          @click="save()"
        >
          Save
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importing necessary modules and components
import {toRefs} from "vue";
import {useDataStore} from "@/stores/data";
import {storeToRefs} from "pinia";

const props = defineProps(['showModal']);

// Extracting reactive variables from props and store
const { showModal } = toRefs(props);
const emit = defineEmits(['close']);
const { config } = storeToRefs(useDataStore());
const { saveConfig } = useDataStore();

// Function to save Jira configuration and close the dialog
function save() {
  saveConfig('jira');
  emit('close');
}

</script>
