<template>
  <v-container fluid="true">
    <Stats/>
  </v-container>
</template>
<script setup>
import {last} from 'lodash';
import Stats from "@/components/Stats.vue";
import Player from "@/components/VideoPlayer/Player.vue";
import {ref} from "vue";
import {getVideoList} from "@/common/api/video";

let current = ref(null);
let layout = ref(null);
let currentVideo = ref(null);
let videos = ref(null)

function layouts() {
  return ['1', '2', '3', '4', '5'].map(value => ({value, label: this.t(`layout-${value}`)}));
}

function currentVideos() {
  const [group, date, time] = current.value.split('$');
  currentVideo.value = videos.value[group][date][time];
}

const load = async () => {
  try {
    videos.value = await getVideoList();
    console.log(videos.value)
    if (videos.value === null) {
      return;
    }
    current.value = getCurrent(videos.value).join('$');
    currentVideos();
  }
  catch (err) {
    console.log(err);
  }
};

load();

function getCurrent(videos) {
  const group = Object.keys(videos)[0];
  const date = last(Object.keys(videos[group]));
  const time = last(Object.keys(videos[group][date]));
  return [group, date, time];
}

</script>
