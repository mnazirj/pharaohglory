<template>
  <div
    id="card-container mt-2 mb-2"
    class="d-flex justify-content-around align-content-center flex-wrap"
  >
    <Card
      :card="{
        name: 'Trips',
        value: '1\,200',
        icon: 'pi pi-home',
        lableIcon: 'pi pi-chart-line',
        lable: '1\.6 % Trips Added',
      }"
    />
    <Card
      :card="{
        name: 'Daily Users',
        value: '356\,145',
        icon: 'pi pi-user',
        lableIcon: 'pi pi-chart-line',
        lable: '15\.45 % New Users',
      }"
    />
    <Card
      :card="{
        name: 'Users',
        value: '356\,145',
        icon: 'pi pi-user',
        lableIcon: 'pi pi-chart-line',
        lable: 'Anything',
      }"
    />
    <Card
      :card="{
        name: 'Users',
        value: '356\,145',
        icon: 'pi pi-user',
        lableIcon: 'pi pi-chart-line',
        lable: 'Anything',
      }"
    />
  </div>
  <div id="charts-container mt-2">
    <charts>
      <template #section-1>
        <div
          id="section-1-table"
          class="d-flex justify-content-center align-items-center flex-wrap w-90 shadow-2 rounded-2"
        >
          <div
            class="d-flex justify-content-center align-items-center flex-wrap p-2"
          >
            <span class="fs-3 w-100 text-center text-main-color"
              >Lastest Ready Trips</span
            >
            <span class="fs-6 w-100 text-center text-muted"
              >can be expanded</span
            >
          </div>
          <div class="table-responsive">
            <table
              class="table w-80 text-nowrap table-borderless table-sm align-middle my-3"
            >
              <thead>
                <tr>
                  <th scope="col" class="">Name</th>
                  <th scope="col" class="">Type</th>
                  <th scope="col" class="">Number</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lastestReadyTrip in lastestReadyTrips"
                  :key="lastestReadyTrip.id"
                >
                  <td class="">
                    {{ lastestReadyTrip.name }}
                  </td>
                  <td class="">
                    {{ lastestReadyTrip.type }}
                  </td>
                  <td class="">
                    {{ lastestReadyTrip.number }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="d-flex justify-content-center align-items-center w-100 p-2 my-1"
          >
            <button type=" button" class="w-50 btn btn-main">View More</button>
          </div>
        </div>
      </template>
      <template #section-2>
        <div
          id="section-1-table"
          class="d-flex justify-content-center align-items-center flex-wrap w-90 shadow-2 rounded-2"
        >
          <div
            class="d-flex justify-content-center align-items-center flex-wrap p-2"
          >
            <span class="fs-3 w-100 text-center text-main-color"
              >Lastest Payment</span
            >
          </div>

          <div class="table-responsive">
            <table
              class="table w-80 text-nowrap table-borderless table-sm align-middle my-3"
            >
              <thead>
                <tr>
                  <th scope="col" class="">From</th>
                  <th scope="col" class="">To</th>
                  <th scope="col" class="">Cash</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lastesPayment in lastesPayments"
                  :key="lastesPayment.id"
                >
                  <td class="">
                    {{ lastesPayment.from }}
                  </td>
                  <td class="">
                    {{ lastesPayment.to }}
                  </td>
                  <td class="">
                    {{ lastesPayment.cash }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="d-flex justify-content-center align-items-center w-100 p-2 my-1"
          >
            <button type=" button" class="w-50 btn btn-main">View More</button>
          </div>
        </div>
      </template>
    </charts>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Charts from "./Charts.vue";
export default {
  components: {
    Card,
    Charts,
  },
  data() {
    return {
      lastestReadyTrips: [
        {
          id: 1,
          name: "Latakia trip",
          type: "Sea Trip",
          number: 140,
        },
        {
          id: 2,
          name: "Hamalaia trip",
          type: "Mountin Trip",
          number: 75,
        },
        {
          id: 3,
          name: "Rub al-Khali desert",
          type: "Adventure Trip",
          number: 30,
        },
      ],
      lastesPayments: [
        {
          id: 1,
          from: "Mohammad GG",
          to: "Latakia Trip",
          cash: "80$",
        },
        {
          id: 2,
          from: "Ahmad Alahmad GG",
          to: "Alshikh mountin Trip",
          cash: "60$",
        },
        {
          id: 3,
          from: "Sara Al srsara",
          to: "Latakia Trip",
          cash: "80$",
        },
      ],
    };
  },
};
</script>

<style scoped>
#chart-container {
  width: 100%;
}
</style>
