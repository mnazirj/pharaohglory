<template>
  <section>
    <div
      class="d-flex align-items-center bg-custom p-5"
      :style="
        'background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)) ,url(' +
        background +
        '); height:560px'
      "
    >
      <div class="container">
        <div>
          <div class="py-3 white-always">
            <h1 class="text-white font-bold text-uppercase">
              Travel memories <br />you'll
              <span class="colored-always p-1 rounded">never forget</span>
            </h1>
            <h5 class="text-white">
              Discover the heart of Paris and the new Notre Dame
            </h5>
          </div>
          <a href="#" class="text-decoration-none font-bold text-white"
            >Learn more
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between gap-3 mt-2">
        <Button
          label="Culture"
          icon="fas fa-monument"
          :variant="currentTab == 1 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(1)"
        />
        <Button
          label="Food"
          icon="fas fa-utensils"
          :variant="currentTab == 2 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(2)"
        />
        <Button
          label="Nature"
          icon="fas fa-mountain"
          :variant="currentTab == 3 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(3)"
        />
        <Button
          label="Sport"
          icon="fas fa-person-skiing"
          :variant="currentTab == 4 ? '' : 'outlined'"
          class="w-100"
          @click="ChangeTab(4)"
        />
      </div>
      <Tabs :value="currentTab" class="mt-3">
        <TabPanels>
          <TabPanel :value="1">
            <Details
              header="Unforgettable cultural experiences"
              subheader="Top cultural sights you can't miss"
            />
          </TabPanel>
          <TabPanel :value="2">
            <Details
              header="Unforgettable food experiences"
              subheader="Top cultural sights you can't miss"
            />
          </TabPanel>
          <TabPanel :value="3">
            <Details
              header="Unforgettable nature experiences"
              subheader="Top cultural sights you can't miss"
            />
          </TabPanel>
          <TabPanel :value="4">
            <Details
              header="Unforgettable sports experiences"
              subheader="Top cultural sights you can't miss"
            />
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

import { ref } from "vue";
const background = ref(require("@/assets/images/hero1.jpeg"));
const currentTab = ref(1);

function ChangeTab(value) {
  background.value = require("@/assets/images/hero" + value + ".jpeg");
  currentTab.value = value;
}
</script>
