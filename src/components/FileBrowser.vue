<template>
  <v-card
    rounded="lg"
    class="mt-2 mb-0 pb-0"
    v-if="structure"
  >
    <v-list
      :lines="false"
    >
      <v-list-item>
        File Browser
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-if="path !== '' && !loading"
        @click="goBack()"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-arrow-left"></v-icon>
        </template>
        Go Back
      </v-list-item>
      <v-list-item
        v-if="!loading"
        v-for="(item, i) in structure"
        :key="i"
        :value="item"
        color="primary"
        @click="itemClick(item)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
    </v-list>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getDirectoryListing} from "@/common/api/video";

let structure = ref({});
let path = ref('');
let loading = ref(true);

onMounted(async () => {
  structure.value = await getDirectoryListing(path.value);
  loading.value = false;
});

async function itemClick(item) {

  if (item.type === 'folder') {
    loading.value = true;

    if (path.value === '') {
      path.value += `${item.name}`
    } else {
      path.value += `/${item.name}`
    }

    structure.value = await getDirectoryListing(path.value);
    loading.value = false;
  }

  if (item.type === 'file') {
    window.open(`/mnt/usbdata/${path.value}/${item.name}`, '_blank');
  }

}

async function goBack() {
  loading.value = true;
  const pathSegments = path.value.split('/').filter(segment => segment.trim() !== '');
  if (pathSegments.length > 0) {
    pathSegments.pop(); // Remove the last segment
    path.value = pathSegments.join('/');
    structure.value = await getDirectoryListing(path.value);
  } else {
    console.log('Already at the root.');
  }
  loading.value = false;
}

</script>
