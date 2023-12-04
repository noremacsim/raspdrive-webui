<template>

  <!-- Button to show progress circular when tasks are pending -->
  <v-btn
    icon
    v-if="totalPending  > 0 && taskQue[0].status !== 'complete'"
  >
    <v-progress-circular
      :model-value="taskQue[0].percentage"
      :color="taskQue[0].status === 'error' ? 'semorange' : 'primary'"
      :width="4"
      :size="28"
    >
    </v-progress-circular>
    <v-tooltip
      activator="parent"
      location="bottom"
    >
      {{ taskQue[0].message }}
    </v-tooltip>
  </v-btn>

  <!-- Button to trigger the downloadCommits method when no tasks are pending -->
  <v-btn
    icon
    v-else
    @click="downloadCommits()"
  >
    <v-icon
      icon="mdi-download"
    ></v-icon>
    <v-tooltip
      activator="parent"
      location="bottom"
    >
      Fetch New Commits
    </v-tooltip>
  </v-btn>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useDataStore} from "@/stores/data";
import {onMounted, onUnmounted, ref} from "vue";
import ApiService from "@/common/api.service";

// Destructuring reactive state variables from the data store
const { taskQue } = storeToRefs(useDataStore());
const { getTaskQue } = useDataStore();

// Initializing reactive variables
let totalPending = ref(0);
let intervalId = ref();
let isIntervalInitialized = ref(false);

// Lifecycle hook: runs when the component is mounted
onMounted(() => {
  getPendingTasks();
  initializeInterval();
});

// Lifecycle hook: runs when the component is unmounted
onUnmounted(() => {
  if (isIntervalInitialized.value) {
    clearInterval(intervalId.value);
    isIntervalInitialized.value = false;
  }
});

// Function to initialize the polling interval for task updates
function initializeInterval() {
  if (!isIntervalInitialized.value) {
    intervalId.value = setInterval(getPendingTasks, 2000);
    isIntervalInitialized.value = true;
  }
}

// Function to get the total number of pending tasks
function getPendingTasks() {
  getTaskQue();
  if (taskQue.value && taskQue.value.length > 0) {
    totalPending.value = taskQue.value.filter(task => task.status !== "complete").length ?? 0;
  } else {
    totalPending.value = 0;
  }
}

// Function to trigger the downloadCommits method
function downloadCommits() {
  ApiService.get('/app/data');
}

</script>
