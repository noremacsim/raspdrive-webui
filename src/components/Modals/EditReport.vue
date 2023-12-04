<template>
  <!-- Dialog for creating or editing a report -->
  <v-dialog
    v-model="showModal"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <!-- Card containing report form -->
    <v-card
      rounded="lg"
      max-height="500"
      class="mr-8 ml-8"
      min-width="400"
    >
      <!-- Card content -->
      <v-card-text class="pa-7">
        <!-- Form for entering the report title -->
        <v-row>
          <v-col cols="12">
            <v-label class="font-weight-medium mb-2">Report Title</v-label>
            <v-text-field
              v-model="reportName"
              color="primary"
              variant="outlined"
              density="compact"
              type="text"
              placeholder="Title"
              hide-details
            >
            </v-text-field>
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
import {ref, toRefs} from "vue";

const props = defineProps(['showModal']);

// Extracting reactive variables from props
const { showModal } = toRefs(props);
const emit = defineEmits(['close', 'saveReport']);

// Initializing a reactive variable for the report name
let reportName = ref('');

// Function to emit events for saving and closing the dialog
function save() {
  emit('saveReport', reportName);
  emit('close');
}
</script>
