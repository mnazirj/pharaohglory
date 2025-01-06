<template>
  <div class="card m-2 shadow-4">
    <div
      class="d-flex justify-content-center align-items-center flex-nowrap w-100 h-100"
    >
      <div
        class="w-40 d-flex justify-content-center align-item-center bg-main-color h-100 rounded-start-2"
      >
        <div
          class="h-100 w-100 d-flex justify-content-center align-items-center"
        >
          <i :class="['icon text-white', card.icon]"></i>
        </div>
      </div>
      <div
        class="w-60 d-flex justify-content-center align-items-center flex-wrap text-nowrap"
      >
        <span id="card-name" class="w-100 text-center">{{ card.name }}</span>
        <span id="card-value" class="w-100 text-center">{{ card.value }}</span>
        <span id="card-lable" class="w-100 text-center text-muted"
          ><i :class="['me-1', card.lableIcon]"></i
          ><span>{{ card.lable }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      Type: Object,
      require: true,
      default: () => ({
        name: "",
        value: "",
        rateValue: "",
        icon: "",
        lableIcon: "",
        lable: "",
      }),
    },
  },
};
</script>

<style scoped>
.card {
  height: 9rem;
  transition: all 0.2s ease;
  transform-origin: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 2px 6px rgba(0, 0, 0, 0.12) !important;
}
.card:hover {
  height: 9.2rem;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08), 0px 3px 4px rgba(0, 0, 0, 0.1),
    0px 1px 4px -1px rgba(0, 0, 0, 0.1) !important;
}
#card-name {
  font-size: 1.7rem;
}
#card-value {
  font-size: 1.4rem;
}
#card-lable {
  font-size: 0.7rem;
}
@media screen and (min-width: 992px) {
  .card {
    width: 20%;
  }
  .card:hover {
    width: 21%;
  }
  .icon {
    font-size: 3.8rem;
  }
}
@media screen and (max-width: 992px) {
  .card {
    width: 22.5%;
  }
  .icon {
    font-size: 3.2rem;
  }
}
@media screen and (max-width: 768px) {
  .card {
    width: 40%;
  }
  .icon {
    font-size: 3rem;
  }
}
@media screen and (max-width: 576px) {
  .card {
    width: 65%;
    min-width: 10.6rem;
  }
  .icon {
    font-size: 2.8rem;
  }
}
</style>
