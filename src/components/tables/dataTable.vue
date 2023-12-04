<template>

  <!-- Top Bar Section -->
  <v-container
    class="mb-3 ml-0 mr-0"
    v-if="!tableData.hideTopBar"
    fluid="true"
  >
    <v-row
      align="end"
      justify="end"
    >
      <!-- Table Name -->
      <v-col class="ma-0 pa-0">
        <h3 class="float-start">{{ tableData.name }}</h3>
      </v-col>

      <!-- Search Box -->
      <div
        class="ma-0 pa-0 mr-2 small_input"
        :style="searchBoxClosed && !tableData.params.search ? 'width: 45px;' : 'width: 250px;'"
      >
        <v-text-field
          v-model.trim="tableData.params.search"
          :modelValue="tableData.params.search"
          @update:modelValue="onGlobalSearchDebounced"
          density="compact"
          variant="solo"
          flat="true"
          rounded="lg"
          label="plain"
          prepend-inner-icon="mdi-magnify"
          single-line="true"
          hide-details
          dense
          class="shrink bg-white rounded-lg"
          color="black"
          @focus="searchBoxClosed = false"
          @blur="searchBoxClosed = true"
        >
        </v-text-field>
      </div>

      <!-- Columns Dropdown Menu -->
      <v-menu
        transition="slide-y-transition"
        location="bottom"
        :close-on-content-click="false"
      >
        <template
          v-slot:activator="{ props }"
        >
          <v-btn
            v-bind="props"
            prepend-icon="mdi-view-column-outline"
            variant="flat"
            rounded="lg"
            append-icon="mdi-chevron-down"
            class="text-none mr-2"
            color="white"
          >
            Columns
          </v-btn>
        </template>

        <v-card
          class="mt-2"
          rounded="lg"
        >
          <v-card-text class="pa-2">
            <v-list-item class="pa-0" v-for="column in tableData.columns">
              <v-checkbox
                v-model="tableData.selectedColumns"
                :label="column.title"
                :value="column.key"
                color="semgreen"
                class="shrink" hide-details
                @change="updateSelectedHeaders"
              ></v-checkbox>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-menu>

      <!-- Filters Dropdown Menu -->
      <v-menu
        transition="slide-y-transition"
        location="bottom"
        :close-on-content-click="false"
      >
        <template
          v-slot:activator="{ props }"
        >
          <v-btn
            v-bind="props"
            prepend-icon="mdi-filter-variant"
            append-icon="mdi-chevron-down"
            variant="flat"
            rounded="lg"
            class="text-none mr-2"
            color="white"
          >
            Filters
            <v-chip
              v-if="tableData.params.columnFilters && tableData.params.columnFilters.length > 0"
              class="ml-1"
              size="small"
              color="semdarkgreen"
            >
              {{tableData.params.columnFilters.length}}
            </v-chip>
          </v-btn>
        </template>

        <!-- Filters Card -->
        <v-card
          class="mt-2"
          rounded="lg"
          min-width="800"
        >
          <v-card-text class="pa-2">
            <v-card-subtitle>New Filter</v-card-subtitle>

            <!-- Filter Form -->
            <v-row class="ma-2 small_input">
              <v-col cols="3" class="pt-0">
                <v-select
                  v-model="filterKey"
                  label="Column"
                  variant="outlined"
                  density="compact"
                  hide-details
                  rounded="lg"
                  :items="selectOptions"
                >
                </v-select>
              </v-col>
              <v-col cols="3" class="pt-0">
                <v-select
                  label="Operation"
                  v-model="filterOperation"
                  :items="['Matches', 'Contains', 'Starts With', 'Ends With', 'Between', 'More Than', 'Less Than']"
                  variant="outlined"
                  density="compact"
                  hide-details
                  rounded="lg"
                ></v-select>
              </v-col>
              <v-col cols="4" class="pt-0">
                <v-text-field
                  v-if="filterOperation !== 'Between'"
                  v-model="filterValue"
                  label="Value"
                  variant="outlined"
                  density="compact"
                  hide-details
                  rounded="lg"
                ></v-text-field>
                <v-row v-if="filterOperation === 'Between'">
                  <v-col cols="5" class="pr-0">
                    <v-text-field
                      v-model="moreThan"
                      label=""
                      variant="outlined"
                      density="compact"
                      hide-details
                      rounded="lg"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1" class="pt-5">
                    :
                  </v-col>
                  <v-col cols="5" class="pl-0">
                    <v-text-field
                      v-model="lessThan"
                      label=""
                      variant="outlined"
                      density="compact"
                      hide-details
                      rounded="lg"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="2" class="pt-0">
                <v-btn
                  variant="outlined"
                  color="semorange"
                  @click="onColumnFilter"
                  rounded="lg"
                >
                  Add
                </v-btn>
              </v-col>
            </v-row>

            <!-- Active Filters -->
            <v-card-subtitle v-if="tableData.params.columnFilters && tableData.params.columnFilters.length > 0">Active Filters</v-card-subtitle>
            <v-row class="ma-2" align="start">
              <v-chip
                v-for="(filter, index) in tableData.params.columnFilters"
                closable="true"
                class="mr-2"
                color="semdarkgreen"
                @click:close="removeFilter(index)"
              >
                <span>
                  <b>{{ filter.label }}</b> {{ filter.operation }}
                  <span v-if="filter.operation === 'Between'"><b>{{ filter.value.more }}</b> and <b>{{ filter.value.less }}</b></span>
                  <span v-else><b>{{ filter.value }}</b></span>
                </span>
              </v-chip>
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>

      <!-- Vertical Divider -->
      <v-divider
        vertical="true"
        class="mr-2"
      ></v-divider>

      <!-- Save Table Button -->
      <v-btn
        prepend-icon="mdi-content-save"
        variant="flat"
        rounded="lg"
        class="text-none float-right mr-2"
        color="semorange"
        @click="showSaveCustomReport"
      >
        Save Table
      </v-btn>

      <!-- Download Excel Button -->
      <download-excel
        class="btn btn-default"
        :data="dataS"
        :fields="exportFields"
        :worksheet="`${moment().format('YYYY-MM-DD_HH-mm-ss')}-${tableData.id}.xls`"
        :name="`${moment().format('YYYY-MM-DD_HH-mm-ss')}-${tableData.id}.xls`"
      >
        <v-btn
          prepend-icon="mdi-file-export"
          variant="flat"
          rounded="lg"
          class="text-none float-right"
          color="#a7d037"
        >
          Download
        </v-btn>
      </download-excel>
    </v-row>
  </v-container>

  <!-- Data Table Section -->
  <v-card
    class="mb-5"
    color="transparent"
    variant="flat"
    rounded="lg"
  >
    <!-- Data Table Container -->
    <div ref="dataTable" class="v-table v-table--fixed-height v-table--fixed-header v-table--has-top v-table--has-bottom v-theme--light v-table--density-comfortable v-data-table elevation-1">
      <div
        class="v-table__wrapper"
        :style="returnTableHeight()"
      >
        <!-- Table -->
        <table>
          <thead>
          <tr>
            <!-- Table Headers -->
            <th
              v-for="header in tableData.headers" :key="header.key"
              class="v-data-table__td v-data-table-column--align-start v-data-table__th v-data-table__th"
              style="position: sticky; z-index: 3; top: calc(var(--v-table-header-height) * 0);"
            >
              <div class="v-data-table-header__content">
                <span class="no-wrap">{{header.title}}</span>
              </div>
            </th>
          </tr>
          </thead>

          <tbody v-if="loading">
            <tr>
              <td :colspan="tableData.headers.length" class="text-center">
                <v-progress-circular
                  class="ma-5"
                  size="80"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </td>
            </tr>
          </tbody>

          <tbody v-else-if="dataS.length < 1">
          <!-- No Results Found Message -->
          <tr>
            <td :colspan="tableData.headers.length" class="text-center">
              No Results Found
            </td>
          </tr>
          </tbody>

          <tbody v-else>
          <!-- Data Rows -->
          <tr v-for="(item, index) in loadedData" :key="index">
            <td v-for="header in tableData.headers" >
                <span v-if="header.component === true">
                  <!-- Render Component -->
                  <component :is="tableComponents[header.componentRender](item)" ></component>
                </span>

              <span v-else-if="header.html === true">
                  <!-- Render HTML -->
                  <span v-html="header.htmlFunc(header.key, item)" class="no-wrap"></span>
                </span>

              <span v-else-if="header.type && header.type === 'date'" class="no-wrap">
                  <!-- Format Date -->
                  {{ niceDate(item[header.key]) }}
                </span>

              <input
                v-else-if="header.editable === true"
                size="1"
                type="text"
                class="table_input"
                :id="dataS[index]['id']"
                aria-describedby="input-24-messages"
                :value="dataS[index][header.key]"
                @focusin="handleInputFocus($event, index)"
              >

              <span v-else class="no-wrap">
                  <!-- Default Value -->
                  {{ item[header.key] }}
                </span>
            </td>
          </tr>

          <template v-if="dataS.length > loadedData.length">
            <!-- Load More Skeleton -->
            <tr
              v-intersect.quiet="{
                  handler: loadMore,
                  options: {
                    threshold: [0]
                  }
                }"
            >
              <td :colspan="tableData.headers.length" class="text-center">
                <v-skeleton-loader type="table-row" />
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <!-- Data Table Footer -->
      <div class="v-data-table-footer">
        <div class="v-data-table-footer__info">
          <div>{{loadedData.length}} - {{ dataS.length }} items</div>
        </div>
      </div>
    </div>

    <!-- Edit Report Modal -->
    <EditReport
      :showModal='showCustomReportModal'
      @close='showCustomReportModal = false'
      @saveReport='saveCustomReport'
    />
  </v-card>
</template>

<script setup>
// Import necessary modules and components
import '@/styles/dataTable.scss';
import {defineExpose, defineProps, ref, toRefs} from "vue";
import router from "@/router";
import Router from "@/router";
import lodash from 'lodash';
import apiService from "@/common/api.service";
import ApiService from "@/common/api.service";
import moment from "moment/moment";
import EditReport from "@/components/Modals/EditReport.vue";
import tableComponents from "@/common/tableComponents";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Initialize the toast for displaying notifications
const toast = useToast();

// Destructure props using defineProps
const props = defineProps(['tableData', 'reportID']);

// Destructure props into individual refs
const { tableData, reportID } = toRefs(props);

// Declare and initialize reactive variables
let firstLoad = ref(false);
let dataS = ref([]);
let loadedData = ref([]);
let loadedOffset = ref(0);
let dataCount = ref(0);
let loading = ref(true);

// Variables for search functionality
let searchBoxClosed = ref(true);

// Variables for column filtering
let selectOptions = ref(filteredSelectColumns());
let filterKey = ref();
let filterOperation = ref();
let filterValue = ref();
let moreThan = ref();
let lessThan = ref();
let exportFields = ref({});
let showCustomReportModal = ref(false);
let dataTable = ref(null);

// Show save custom report modal
function showSaveCustomReport() {
  showCustomReportModal.value = true;
}

// Save custom report
function saveCustomReport(reportName) {
  // Prepare data for saving the report
  let postData = {
    'name': reportName.value,
    'url': Router.currentRoute.value.path,
    'data': tableData.value,
    'id': reportID.value ?? null
  }
  // Make API request to save the report
  ApiService.post(`/app/reports/save`, postData).then(() => {
    toast.success('Saved Report Successfully');
  });
}

// Update export fields based on selected columns
function updateExportFields() {
  exportFields.value = {};
  for (let key of tableData.value.selectedColumns) {
    const filteredColumn = tableData.value.columns.filter(item => item.key === key)[0];
    exportFields.value[filteredColumn.title] = filteredColumn.key;
  }
}

// Check if there is a filter in the current route and load data accordingly
if (router.currentRoute.value.query.filter && !tableData.value.igoreRoute) {
  let filterParams = JSON.parse(router.currentRoute.value.query.filter);
  let currentTableParams = filterParams[tableData.value.id];
  if (currentTableParams) {
    firstLoad.value = true;
    updateParams(currentTableParams);
    loadData();
  }
} else {
  loadData();
}

// Initialize export fields
updateExportFields();

// Load data from the API
function loadData() {
  updateSelectedHeaders();
  loading.value = true;
  apiService.post(tableData.value.source, tableData.value.params).then((data) => {
    dataS.value = data.data.rows;
    dataCount.value = data.data.count;
    loading.value = false;
    loadedData.value = [];
    loadedOffset.value = 0;
    loadMore(true);
    resizableGrid();
  }).catch(() => {
    removeFilter(tableData.value.params.columnFilters.length - 1);
  });
}

// Update selected headers based on selected columns
function updateSelectedHeaders() {
  tableData.value.headers = tableData.value.columns.filter(header => tableData.value.selectedColumns.includes(header.key));
  updateExportFields();
  resizableGrid();
}

// Update parameters and navigate to the updated route
function updateParams(newProps = null) {
  if (newProps) {
    tableData.value.params = Object.assign({}, tableData.value.params, newProps);
  }
  let filter;
  if (router.currentRoute.value.query.filter) {
    let filterParams = JSON.parse(router.currentRoute.value.query.filter);
    filterParams[tableData.value.id] = tableData.value.params;
    filter = JSON.stringify(filterParams);
  } else {
    filter = JSON.stringify({[tableData.value.id]: tableData.value.params});
  }
  router.push({
    path: router.currentRoute.value.path,
    query: {
      filter: filter
    }
  });
}

// Handle page change
function onPageChange(page) {
  if (firstLoad.value === true) {
    firstLoad.value = false;
    return;
  }

  updateParams({ page: page });
  loadData();
}

// Handle per page change
function onPerPageChange(perPage) {
  if (firstLoad.value === true) {
    return;
  }

  updateParams({ perPage: perPage });
  loadData();
}

// Handle sort change
function onSortChange(params) {
  if (firstLoad.value === true) {
    return;
  }

  let props;

  if (params[0]?.order === 'none' || params.length === 0) {
    props = {
      sort: [],
    };
  } else {
    props = {
      sort: [{
        type: params[0].order,
        field: params[0].key,
      }],
    };
  }

  updateParams(props);
  loadData();
}

// Handle column filter
function onColumnFilter() {
  let currentFilters = tableData.value.params.columnFilters ?? [];
  let selectField = tableData.value.columns.filter(item => item.title === filterKey.value)[0];

  let addFilter = {
    label: filterKey.value,
    key: selectField.key,
    operation: filterOperation.value,
    value: filterValue.value
  };

  if (filterOperation.value === 'Between') {
    addFilter.value = { more: moreThan.value, less: lessThan.value };
  }

  currentFilters.push(addFilter);

  updateParams({ page: 1 });
  updateParams({ columnFilters: currentFilters });
  loadData();

  filterKey.value = '';
  filterValue.value = '';
  filterOperation.value = '';
  moreThan.value = '';
  lessThan.value = '';
}

// Handle global search with debouncing
function onGlobalSearch(value) {
  updateParams({ page: 1 });
  updateParams({ search: value });
  loadData();
}

// Filter columns to include only those with filter set to true
function filteredSelectColumns() {
  return tableData.value.columns.filter(item => item.filter !== false);
}

// Remove a filter based on its index
function removeFilter(index) {
  updateParams({ page: 1 });
  tableData.value.params.columnFilters.splice(index, 1);
  updateParams();
  loadData();
}

// Format date in a nice way
function niceDate(dateString) {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Make the table columns resizable
function resizableGrid() {
  let resizeBars = document.getElementsByClassName("resizeBar");
  let resizeBarsArray = Array.from(resizeBars);
  resizeBarsArray.forEach(function(element) {
    element.remove();
  });

  let tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    let row = tables[i].getElementsByTagName('tr')[0],
      cols = row ? row.children : undefined;
    if (!cols) return;

    for (let i = 0; i < cols.length; i++) {
      let div = createDiv();
      cols[i].appendChild(div);
      cols[i].style.position = 'relative';
      setListeners(div);
    }
  }
}

// Set listeners for resizing columns
function setListeners(div) {
  let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

  div.addEventListener('mousedown', function (e) {
    curCol = e.target.parentElement;
    nxtCol = curCol.nextElementSibling;
    pageX = e.pageX;

    let padding = paddingDiff(curCol);

    curColWidth = curCol.offsetWidth - padding;
    if (nxtCol)
      nxtColWidth = nxtCol.offsetWidth - padding;
  });

  div.addEventListener('mouseover', function (e) {
    e.target.style.borderRight = '3px solid #2596be';
  });

  div.addEventListener('mouseout', function (e) {
    let lastCurCol = curCol;
    if (lastCurCol) {
      let diffX = e.pageX - pageX;

      if (nxtCol)
        nxtCol.style.width = (nxtColWidth - (diffX))+'px';
      lastCurCol.style.width = (curColWidth + diffX)+'px';
    }
    e.target.style.borderRight = '';
  });

  document.addEventListener('mousemove', function (e) {
    if (curCol) {
      let diffX = e.pageX - pageX;

      if (nxtCol)
        nxtCol.style.width = (nxtColWidth - (diffX))+'px';
      curCol.style.width = (curColWidth + diffX)+'px';
    }
  });

  document.addEventListener('mouseup', function () {
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
  });
}

// Create a div for resizing columns
function createDiv() {
  let div = document.createElement('div');
  div.classList = 'resizeBar'
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = '10px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  div.style.userSelect = 'none';
  div.style.height = returnTableHeight(false);
  return div;
}

// Calculate padding difference for resizing
function paddingDiff(col) {
  if (getStyleVal(col,'box-sizing') === 'border-box'){
    return 0;
  }

  let padLeft = getStyleVal(col,'padding-left');
  let padRight = getStyleVal(col,'padding-right');
  return (parseInt(padLeft) + parseInt(padRight));
}

// Get style value for an element
function getStyleVal(elm, css) {
  return (window.getComputedStyle(elm, null).getPropertyValue(css))
}

// Add items to the table in chunks
function addItemsInChunks(chunkSize) {
  let loadNew = dataS.value.slice(loadedOffset.value, (loadedOffset.value + (chunkSize)));
  loadedOffset.value += loadNew.length;
  loadedData.value = [...loadedData.value, ...loadNew];
}

// Return table height based on data length
function returnTableHeight(style = true) {
  let height = (dataS.value && dataS.value.length < 20) ? (48 * (dataS.value.length + 2)) : '70vh'

  if (style) {
    return `height: ${height};`
  }

  return height
}

// Load more data when intersecting
function loadMore(isIntersecting) {
  if (isIntersecting === true) {
    if ((dataS.value.length - loadedOffset.value) < 20) {
      addItemsInChunks((dataS.value.length - loadedOffset.value));
    } else {
      addItemsInChunks(20);
    }
  }
}

// Handle input focus
function handleInputFocus(event) {
  const closestRow = event.target.closest('td');

  const allRows = document.querySelectorAll('td');
  allRows.forEach(row => row.classList.remove('selected'));

  if (closestRow) {
    closestRow.classList.add('selected');
  }
}

// Debounced global search function
const onGlobalSearchDebounced = lodash.debounce(onGlobalSearch, 1000);

// Expose functions to parent components
defineExpose({
  loadData,
  updateParams
});

</script>
