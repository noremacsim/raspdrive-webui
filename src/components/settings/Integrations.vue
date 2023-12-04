<template>
  <!-- Main container for Github and Jira integration settings -->
  <v-sheet min-height="70vh" rounded="lg" color="transparent" v-show="config['github']">
    <!-- Row with two columns for Github and Jira integration -->
    <v-row>
      <!-- Github Integration -->
      <v-col cols="6">
        <v-card rounded="lg" flat="true">
          <!-- Header section with title and subtitle -->
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                Github
              </v-card-title>
              <v-card-subtitle>Get Github Data and Stats</v-card-subtitle>

              <!-- Action buttons for settings and help -->
              <v-card-actions>
                <!-- Settings button -->
                <v-btn
                  class="ms-2"
                  variant="flat"
                  size="small"
                  :color="config['github'].token ? 'semgreen' : 'semorange'"
                  @click="showGithubModal = true"
                >
                  <span v-if="config['github'].token">
                    Settings
                  </span>
                  <span v-else>
                    Setup Integration
                  </span>
                </v-btn>

                <!-- Help button -->
                <v-btn
                  class="ms-2"
                  size="small"
                  color="primary"
                >
                  Help
                </v-btn>
              </v-card-actions>
            </div>

            <!-- Avatar section with Github logo -->
            <v-avatar
              class="ma-3"
              size="125"
              rounded="0"
            >
              <v-img rounded="lg" class="rounded-lg" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <!-- Jira Integration -->
      <v-col cols="6">
        <v-card rounded="lg" flat="true">
          <!-- Header section with title and subtitle -->
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                Jira
              </v-card-title>
              <v-card-subtitle>Link Commits to Jiras either from the commit message or description</v-card-subtitle>

              <!-- Action buttons for settings and help -->
              <v-card-actions>
                <!-- Settings button -->
                <v-btn
                  class="ms-2"
                  variant="flat"
                  size="small"
                  :color="config['jira'].token ? 'semgreen' : 'semorange'"
                  @click="showJiraModal = true"
                >
                  <span v-if="config['jira'].token">
                    Settings
                  </span>
                  <span v-else>
                    Setup Integration
                  </span>
                </v-btn>

                <!-- Help button -->
                <v-btn
                  class="ms-2"
                  size="small"
                  color="primary"
                >
                  Help
                </v-btn>
              </v-card-actions>
            </div>

            <!-- Avatar section with Jira logo -->
            <v-avatar
              class="ma-3"
              size="125"
              rounded="0"
            >
              <v-img rounded="lg" class="rounded-lg" src="https://pbs.twimg.com/profile_images/1026572523230515200/Qifq4jpS_400x400.jpg"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>

  <!-- Github Integration Settings Modal -->
  <IntigrationGithub
    :showModal="showGithubModal"
    @close="showGithubModal=false"
  />

  <!-- Jira Integration Settings Modal -->
  <IntigrationJira
    :showModal="showJiraModal"
    @close="showJiraModal=false"
  ></IntigrationJira>

</template>

<script setup>
// Importing components and necessary utilities
import IntigrationGithub from "@/components/Modals/IntigrationGithub.vue";
import IntigrationJira from "@/components/Modals/IntigrationJira.vue";
import {ref} from "vue";
import {useDataStore} from "@/stores/data";
import {storeToRefs} from "pinia";

// Accessing the data store and initializing values
const { config } = storeToRefs(useDataStore());
const { getConfig } = useDataStore();
getConfig();

// Refs for controlling modal visibility
let showGithubModal = ref(false);
let showJiraModal = ref(false);
</script>
