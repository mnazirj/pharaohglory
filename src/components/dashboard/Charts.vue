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
        labels: [this.$t('dash.home.finished_trips'), this.$t('dash.home.sechduled_trips'), this.$t('dash.home.ready_trips')],
        datasets: [
          {
            data: [1240, 120, 75],
            backgroundColor: [
              documentStyle.getPropertyValue("--p-rose-600"),
              documentStyle.getPropertyValue("--p-gray-200"),
              documentStyle.getPropertyValue("--p-gray-800"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--p-rose-700"),
              documentStyle.getPropertyValue("--p-gray-300"),
              documentStyle.getPropertyValue("--p-gray-900"),
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
            label:this.$t('dash.home.trips_categorys'),
            borderColor: documentStyle.getPropertyValue("--p-rose-600"),
            pointBackgroundColor:
              documentStyle.getPropertyValue("--p-rose-700"),
            pointBorderColor: documentStyle.getPropertyValue("---p-rose-400"),
            pointHoverBackgroundColor: textColor,
            pointHoverBorderColor:
              documentStyle.getPropertyValue("--p-rose-600"),
            data: [200, 350, 500, 500, 105, 800],
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
        this.$t('dash.home.jan'),
        this.$t('dash.home.feb'),
        this.$t('dash.home.mar'),
        this.$t('dash.home.apr'),
        this.$t('dash.home.may'),
        this.$t('dash.home.june'),
        this.$t('dash.home.july'),
        this.$t('dash.home.aug'),
        this.$t('dash.home.sep'),
        this.$t('dash.home.oct'),
        this.$t('dash.home.nov'),
        this.$t('dash.home.dec'),
        ],
        datasets: [
          {
            label: this.$t('dash.home.incomes'),
            data: [
              15450, 5950, 8050, 3560, 11320, 1985, 1205, 4582, 1250, 350, 7850,
              1456,
            ],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-rose-600"),
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
  .chart-table {
    width: 80%;
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
  .chart-table {
    width: 98%;
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
