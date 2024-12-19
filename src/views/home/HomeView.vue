<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="text-center">
      <Button
        :icon="[{ 'pi pi-moon': isDarkMode }, { 'pi pi-sun': !isDarkMode }]"
        @click="ToggleDarkMode"
        rounded
      />
      <h5 class="w-50 mx-auto text-left mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sint
        repellat autem mollitia aut nihil, vitae voluptatem odit atque
        obcaecati?
      </h5>
      <InputText type="text" v-model="value" placeholder="Username" />

      <Card>
        <template #title>Simple Card</template>
        <template #content>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import { ref } from "vue";
const isDarkMode = ref(false);
function ToggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
  document.body.classList.toggle("custom-dark");
  isDarkActive();
}

function isDarkActive() {
  return document.documentElement.classList.contains("my-app-dark")
    ? (isDarkMode.value = true)
    : (isDarkMode.value = false);
}
</script>
