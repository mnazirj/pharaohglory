<template>
  <section v-if="!isLoading">
    <div
      class="d-flex align-items-center bg-custom p-5"
      :style="
        background != null
          ? 'background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)) ,url(' +
            background +
            '); height:560px;'
          : 'background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)) ,url(' +
            information.mediaImage1 +
            '); height:560px;'
      "
    >
      <div class="container">
        <div>
          <div class="py-3 white-always">
            <h1 class="text-white font-bold text-uppercase w-50">
              {{ information.coverTitle }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between gap-3 mt-2">
        <Button
          :label="$t('selector.culture')"
          icon="fas fa-monument"
          :variant="currentTab == 1 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(1, information.mediaImage1)"
        />
        <Button
          :label="$t('selector.food')"
          icon="fas fa-utensils"
          :variant="currentTab == 2 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(2, information.mediaImage2)"
        />
        <Button
          :label="$t('selector.nature')"
          icon="fas fa-mountain"
          :variant="currentTab == 3 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(3, information.mediaImage3)"
        />
        <Button
          :label="$t('selector.sport')"
          icon="fas fa-person-skiing"
          :variant="currentTab == 4 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(4, information.mediaImage4)"
        />
      </div>
      <Tabs :value="currentTab" class="mt-3">
        <TabPanels>
          <TabPanel :value="1">
            <Details :header="$t('trips.culture')" :card="cards.Culture" />
          </TabPanel>
          <TabPanel :value="2">
            <Details :header="$t('trips.food')" :card="cards.Food" />
          </TabPanel>
          <TabPanel :value="3">
            <Details :header="$t('trips.nature')" :card="cards.Nature" />
          </TabPanel>
          <TabPanel :value="4">
            <Details :header="$t('trips.sport')" :card="cards.Sports" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </section>
</template>

<script setup>
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import Details from "./CardDetails";
import { toRefs } from "@vue/reactivity";

import axios from "axios";
import { onMounted, ref } from "vue";

defineProps({
  cards: Array,
  information: Array,
});
const background = ref(null);
const currentTab = ref(1);

function ChangeTab(value, img) {
  background.value = img;
  currentTab.value = value;
}
</script>
