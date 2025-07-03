<template>
  <div
    id="card-container mt-2 mb-2"
    class="d-flex justify-content-around align-content-center flex-wrap"
  >
    <Card
      :card="{
        name: 'dash\.home\.trips',
        value: '1200',
        icon: 'fa-solid fa-suitcase-rolling',
        lableIcon: 'pi pi-chart-line',
        lable:  'dash\.home\.added_trips',
        lableValue:'16%',
      }"
    />
    <Card
      :card="{
        name: 'dash\.home\.reservations',
        nameClass: 'fs-6',
        value: '15',
        icon: 'pi pi-calendar-clock',
        lableIcon: 'pi pi-chart-bar',
        lable: 'dash\.home\.new_reservations',
        lableValue:'1%',
      }"
    />
    <Card
      :card="{
        name: 'dash\.home\.incomes',
        value: '1$',
        icon: 'pi pi-dollar',
        lableIcon: 'pi pi-chart-line',
        lable: 'dash\.home\.addition',
        lableValue:'15%',
      }"
    />
    <Card
      :card="{
        name: 'dash\.home\.users',
        value: '356145',
        icon: 'pi pi-user',
        lableIcon: 'pi pi-chart-line',
        lable: 'dash\.home\.new_user',
        lableValue:'25%',
      }"
    />
  </div>
  <div
    id="charts-container"
    class="d-flex justify-content-center align-items-center flex-wrap my-3"
  >
    <charts>
      <template #table-slot>
        <div
          :class="['w-80 d-flex justify-content-center align-items-center flex-wrap rounded-2', isDark? 'dark-shadow' :'shadow-2']"
        >
          <div
            class="d-flex justify-content-center align-items-center flex-wrap p-2 w-100"
          >
            <span class="fs-3 w-100 text-center text-main-color"
              >{{ $t('dash.home.lastest_ready_trip') }}</span
            >
          </div>
          <div class="w-100 d-flex justify-content-center align-items-center ">
            <DataTable :value="lastestReadyTrips" class="w-100">
              <Column field="title" :header="$t('dash.home.title')"></Column>
              <Column field="category" :header="$t('dash.home.category')"></Column>
              <Column field="quantity" :header="$t('dash.home.quantity')"></Column>
            </DataTable>
          </div>
        </div>
      </template>
    </charts>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Charts from "./Charts.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {
  components: {
    Card,
    Charts,
    DataTable,
    Column,
  },
  data() {
    return {
      isDark:null,
      lastestReadyTrips: [
        {
          id: 1,
          title: "Latakia trip",
          category: "Sea Trip",
          quantity: 140,
        },
        {
          id: 2,
          title: "Hamalaia trip",
          category: "Mountin Trip",
          quantity: 75,
        },
        {
          id: 3,
          title: "Rub al-Khali desert",
          category: "Adventure Trip",
          quantity: 30,
        },
      ],
    };
  },
  beforeMount(){
    this.isDark = localStorage.getItem("mode") == "dark";
  }
};
</script>

<style scoped>
#chart-container {
  width: 100%;
}

</style>
