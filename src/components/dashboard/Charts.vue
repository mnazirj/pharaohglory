<template>
  <div
    id="section1"
    class="d-flex justify-content-between align-items-center flex-wrap w-100 mb-2"
  >
    <!-- <Chart
          type="bar"
          :data="chartDataBar"
          :options="chartOptionsBar"
          class="chart-bar d-flex justify-content-center"
        /> -->
    <Chart
      type="line"
      :data="chartDataLine"
      :options="chartOptionsLine"
      class="chart-line d-flex justify-content-center"
    />
    <Chart
      type="radar"
      :data="chartDataRadar"
      :options="chartOptionsRadar"
      class="chart-radar d-flex justify-content-center"
    />
  </div>
  <div
    id="section2"
    class="d-flex justify-content-between align-items-center w-100 flex-wrap mt-2"
  >
    <div
      class="chart-table d-flex justify-content-center align-items-center flex-wrap"
    >
      <slot name="table-slot"></slot>
    </div>

    <Chart
      type="doughnut"
      :data="chartDataDonat"
      :options="chartOptionsDonat"
      class="chart-donat d-flex justify-content-center"
    />
  </div>
</template>

<script>
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartDataDonat: null,
      chartOptionsDonat: {
        cutout: "60%",
      },
      // chartDataBar: null,
      // chartOptionsBar: null,
      chartDataRadar: null,
      chartOptionsRadar: null,
      chartDataLine: null,
      chartOptionsLine: null,
    };
  },
  mounted() {
    this.chartDataDonat = this.setChartDataDonat();
    this.chartOptionsDonat = this.setChartOptionsDonat();
    // this.chartDataBar = this.setChartDataBar();
    // this.chartOptionsBar = this.setChartOptionsBar();
    this.chartDataRadar = this.setChartDataRadar();
    this.chartOptionsRadar = this.setChartOptionsRadar();
    this.chartDataLine = this.setChartDataLine();
    this.chartOptionsLine = this.setChartOptionsLine();
  },
  methods: {
    setChartDataDonat() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ["Finished Trips ", "Sechduled Trips", "Ready Trips"],
        datasets: [
          {
            data: [1240, 120, 75],
            backgroundColor: [
              documentStyle.getPropertyValue("--p-teal-700"),
              documentStyle.getPropertyValue("--p-amber-200"),
              documentStyle.getPropertyValue("--p-gray-200"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--p-teal-800"),
              documentStyle.getPropertyValue("--p-amber-300"),
              documentStyle.getPropertyValue("--p-gray-300"),
            ],
          },
        ],
      };
    },
    setChartOptionsDonat() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");

      return {
        plugins: {
          legend: {
            labels: {
              cutout: "60%",
              color: textColor,
            },
          },
        },
      };
    },
    // setChartDataBar() {
    //   const documentStyle = getComputedStyle(document.documentElement);

    //   return {
    //     labels: [
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //     ],
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         backgroundColor: documentStyle.getPropertyValue("--p-teal-700"),
    //         borderColor: documentStyle.getPropertyValue("--p-teal-700"),
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //       },
    //       {
    //         label: "My Second dataset",
    //         backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
    //         borderColor: documentStyle.getPropertyValue("--p-gray-500"),
    //         data: [28, 48, 40, 19, 86, 27, 90],
    //       },
    //     ],
    //   };
    // },
    // setChartOptionsBar() {
    //   const documentStyle = getComputedStyle(document.documentElement);
    //   const textColor = documentStyle.getPropertyValue("--p-text-color");
    //   const textColorSecondary = documentStyle.getPropertyValue(
    //     "--p-text-muted-color"
    //   );
    //   const surfaceBorder = documentStyle.getPropertyValue(
    //     "--p-content-border-color"
    //   );

    //   return {
    //     maintainAspectRatio: false,
    //     aspectRatio: 0.8,
    //     plugins: {
    //       legend: {
    //         labels: {
    //           color: textColor,
    //         },
    //       },
    //     },
    //     scales: {
    //       x: {
    //         ticks: {
    //           color: textColorSecondary,
    //           font: {
    //             weight: 500,
    //           },
    //         },
    //         grid: {
    //           display: false,
    //           drawBorder: false,
    //         },
    //       },
    //       y: {
    //         ticks: {
    //           color: textColorSecondary,
    //         },
    //         grid: {
    //           color: surfaceBorder,
    //           drawBorder: false,
    //         },
    //       },
    //     },
    //   };
    // },
    setChartDataRadar() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");

      return {
        labels: [
          "Guided Trips",
          "Adventure Trips",
          "Workshop Trips",
          "Day Trips",
          "Sea Trips",
          "Mountin Trips",
        ],
        datasets: [
          {
            label: "Trips Type",
            borderColor: documentStyle.getPropertyValue("--p-teal-700"),
            pointBackgroundColor:
              documentStyle.getPropertyValue("--p-teal-700"),
            pointBorderColor: documentStyle.getPropertyValue("---p-teal-700"),
            pointHoverBackgroundColor: textColor,
            pointHoverBorderColor:
              documentStyle.getPropertyValue("--p-teal-700"),
            data: [15, 20, 22, 12, 18, 13],
          },
        ],
      };
    },
    setChartOptionsRadar() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: textColorSecondary,
            },
          },
        },
      };
    },
    setChartDataLine() {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Income",
            data: [
              15450, 5950, 8050, 3560, 11320, 1985, 1205, 4582, 1250, 350, 7850,
              1456,
            ],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-teal-800"),
            tension: 0.4,
          },
        ],
      };
    },
    setChartOptionsLine() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
  },
};
</script>
<style scoped>
.chart-donat,
.chart-line,
.chart-radar {
  height: 20rem;
}

@media screen and (min-width: 1024px) {
  .chart-donat {
    width: 30%;
  }
  .chart-line {
    width: 65%;
  }
  /* .chart-bar {
    width: 90%;
  } */
  .chart-radar {
    width: 30%;
  }
  .chart-table {
    width: 65%;
  }
}
@media screen and (max-width: 1024px) {
  .chart-donat {
    width: 100%;
  }
  .chart-line {
    width: 90%;
  }
  /* .chart-bar {
    width: 90%;
  } */
  .chart-radar {
    width: 60%;
  }
}
@media screen and (max-width: 767px) {
  .chart-donat {
    width: 100%;
  }
  .chart-line {
    width: 90%;
  }
  /* .chart-bar {
    width: 90%;
  } */
  .chart-radar {
    width: 100%;
  }
}
/* @media screen and (max-width: 576px) {
  .chart-donat {
    width: 90%;
  }
  .chart-line {
    width: 90%;
  }
  .chart-bar {
    width: 90%;
  }
  .chart-radar {
    width: 90%;
  }
} */
</style>
