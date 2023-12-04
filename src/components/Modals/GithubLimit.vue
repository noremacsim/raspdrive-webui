<template>
  <!-- Dialog for displaying a message when GitHub API limit is reached -->
  <v-dialog
    v-model="showModal"
    transition="dialog-bottom-transition"
    width="600px"
    persistent="true"
  >
    <!-- Card containing the informative message -->
    <v-card
      rounded="lg"
      max-height="500"
      class="mr-8 ml-8"
      title="Github API Limit Reached"
    >
      <!-- Prepend icon for visual emphasis -->
      <template v-slot:prepend>
        <v-avatar color="semorange">
          <v-icon icon="mdi-alarm"></v-icon>
        </v-avatar>
      </template>
      <!-- Card content with the informative message -->
      <v-card-text>
        Oops! GitHub API limit reached. Please wait 20 minutes before trying again.
      </v-card-text>
      <!-- Action button at the bottom of the dialog -->
      <v-row class="ma-3">
        <v-spacer></v-spacer>
        <!-- Okay button to close the dialog -->
        <v-btn
          color="semgreen"
          variant="elevated"
          @click="emit('close')"
        >
          Okay
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importing necessary modules and components
import {toRefs} from "vue";

const props = defineProps(['showModal']);
const emit = defineEmits(['close']);

// Extracting reactive variables from props
const { showModal } = toRefs(props);
</script>
