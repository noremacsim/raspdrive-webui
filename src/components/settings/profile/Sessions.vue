
<template>
  <!-- Main container for sessions table -->
  <v-sheet min-height="70vh" rounded="lg" color="transparent">
    <DataTable :tableData="sessionData" />
  </v-sheet>

</template>
<script setup>
import DataTable from "@/components/tables/dataTable.vue";
import {ref} from "vue";

let sessionData = ref({
  // Identification and basic properties of the table
  id: 'sessions',
  name: 'Current Session',
  source: '/app/sessions',
  selectedColumns: ['deviceType', 'clientType', 'clientName', 'os', 'ip', 'id'],
  hideTopBar: true,

  // Configuration for each column in the table
  columns: [
    {
      title: 'userAgent',
      key: 'userAgent',
      sortable: false,
      filter: true,
    },
    {
      title: 'deviceType',
      key: 'deviceType',
      sortable: false,
    },
    {
      title: 'deviceBrand',
      key: 'deviceBrand',
      sortable: false,
    },
    {
      title: 'clientType',
      key: 'clientType',
      editable: false,
      sortable: false,
    },
    {
      title: 'clientName',
      key: 'clientName',
      editable: false,
      sortable: false,
    },
    {
      title: 'os',
      key: 'os',
      editable: false,
      sortable: false,
    },
    {
      title: 'ip',
      key: 'ip',
      editable: false,
      sortable: false,
    },
    {
      title: 'location',
      key: 'location',
      editable: false,
      sortable: false,
    },
    {
      title: 'delete',
      key: 'id',
      component: true,
      componentRender: 'removeSession',
      sortable: false,
      filter: false,
    }
  ],

  // Parameters for table control, such as pagination
  params: {
    page: false,
    perPage: false
  },

  // Actual data to be displayed in the table
  data: [],

  // Total count of data (useful for pagination)
  dataCount: 0,

  // Loading indicator for the table data
  loading: true,
})
</script>
