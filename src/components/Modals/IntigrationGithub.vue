<template>
  <!-- Dialog for configuring GitHub settings -->
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
    >

      <!-- Card content with configuration fields -->
      <v-card-text class="pa-7">
        <v-row>
          <!-- GitHub Organization input field -->
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Github Org</v-label>
            <v-text-field
              v-model="config['github'].settings.org"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="Organization"
              hide-details
            >
              <template v-slot:append>
                <v-icon>
                  mdi-slash-forward
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <!-- GitHub Repository input field -->
          <v-col cols="12" sm="6">
            <v-label class="font-weight-medium mb-2">Github Repo</v-label>
            <v-text-field
              v-model="config['github'].settings.repo"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="Repo"
              hide-details
            />
          </v-col>
          <!-- GitHub Token input field -->
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Github Token</v-label>
            <v-text-field
              v-model="config['github'].token"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="ghp_########..."
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

// Function to save GitHub configuration and close the dialog
function save() {
  saveConfig('github');
  emit('close');
}

</script>
