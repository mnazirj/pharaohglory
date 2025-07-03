<template>
  <div>
    <span v-bind="$attrs" @click="visible = true">
      <i class="vue3-icon-picker" :class="modelValue"></i>
    </span>
    <!-- my modal -->
    <Dialog
      v-model:visible="visible"
      header="Pick an icon"
      :modal="true"
      :closable="true"
      :style="{ width: '50%' }"
    >
      <div class=" absolute fixed w-100 d-flex justify-content-center">
        <!-- <input v-model="filterText" placeholder="Filter by name..." />
        <i class="fas fa-search"> </i> -->
        <IconField class="">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText
              v-model="filterText"
              :placeholder="$t('dash.trips.search')"
              fluid
            />
          </IconField>
      </div>
      <div class="aim-modal--icon-preview-inner mt-5 ">
        <div class="aim-modal--icon-preview">
          <div
            class="aim-icon-item"
            v-for="glyph in glyphs"
            :key="glyph"
            :class="{ 'aesthetic-selected': isActiveGlyph(glyph) }"
            @click="setActiveGlyph(glyph)"
          >
            <div class="aim-icon-item-inner">
              <i :class="glyph"></i>
              <div class="aim-icon-item-name">
                {{ getGlyphName(glyph) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-main mt-2" @click="insert">Insert</button>
      </template>
    </Dialog>
    <!-- <div
      :id="id"
      class="modal fade"
      tabindex="-1"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Pick an icon</h2>
            <button
              type="button"
              class="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="aim-modal--icon-search">
              <input v-model="filterText" placeholder="Filter by name..." />
              <i class="fas fa-search"> </i>
            </div>
            <div class="aim-modal--icon-preview-inner">
              <div class="aim-modal--icon-preview">
                <div
                  class="aim-icon-item"
                  v-for="glyph in glyphs"
                  :key="glyph"
                  :class="{ 'aesthetic-selected': isActiveGlyph(glyph) }"
                  @click="setActiveGlyph(glyph)"
                >
                  <div class="aim-icon-item-inner">
                    <i :class="glyph"></i>
                    <div class="aim-icon-item-name">
                      {{ getGlyphName(glyph) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-main"
              data-bs-dismiss="modal"
              @click="insert"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>

  <!-- orginal -->
  <!-- <div class="aim-modal aim-open" v-if="isVisible">
    <div class="aim-modal--content">
      <div class="aim-modal--header d-flex justify-content-end">
        <div class="aim-modal--header-close-btn" @click="closePicker">
          <i class="fas fa-times" title="Close"></i>
        </div>
      </div>
      <div class="aim-modal--body">
        <div class="aim-modal--icon-preview-wrap">
          <div class="aim-modal--icon-search">
            <input v-model="filterText" placeholder="Filter by name..." />
            <i class="fas fa-search"> </i>
          </div>
          <div class="aim-modal--icon-preview-inner">
            <div class="aim-modal--icon-preview">
              <div
                class="aim-icon-item"
                v-for="glyph in glyphs"
                :key="glyph"
                :class="{ 'aesthetic-selected': isActiveGlyph(glyph) }"
                @click="setActiveGlyph(glyph)"
              >
                <div class="aim-icon-item-inner">
                  <i :class="glyph"></i>
                  <div class="aim-icon-item-name">
                    {{ getGlyphName(glyph) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="aim-modal--footer">
        <button class="aim-insert-icon-button" @click="insert">Insert</button>
      </div>
    </div>
  </div> -->
</template>

<script>
import fontLibrary from "./data/fonts";
import Dialog from "primevue/dialog";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
export default {
  components: {
    Dialog,
    IconField,
    InputIcon,
    InputText,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "Vue3 Icon Picker",
    },
    modelValue: {
      type: String,
      default: "fas fa-circle",
    },
    id: {
      type: String,
      default: "iconList-modal",
    },
  },
  data() {
    return {
      filterText: "",
      activeGlyph: this.modelValue,
      visible: false,
      // tabs: [
      //   {
      //     id: "all",
      //     title: "All Icons",
      //     icon: "fas fa-star-of-life",
      //     link: "all",
      //   },
      //   {
      //     id: "far",
      //     title: "Font Awesome Regular",
      //     icon: "fab fa-font-awesome-alt",
      //     link: fontLibrary.fontAwesome.variants.regular,
      //   },
      //   {
      //     id: "fas",
      //     title: "Font Awesome Solid",
      //     icon: "fab fa-font-awesome",
      //     link: fontLibrary.fontAwesome.variants.solid,
      //   },
      //   {
      //     id: "fab",
      //     title: "Font Awesome Brands",
      //     icon: "fab fa-font-awesome-flag",
      //     link: fontLibrary.fontAwesome.variants.brands,
      //   },
      // ],
      activeTab: {
        id: "all",
        title: "All Icons",
        icon: "fas fa-star-of-life",
        link: "all",
      },
    };
  },
  computed: {
    allGlyphs() {
      // return [].concat(
      //   this.tabs[1].link.icons,
      //   this.tabs[2].link.icons,
      //   this.tabs[3].link.icons
      // );
      return [].concat(
        fontLibrary.fontAwesome.variants.solid.icons,
        fontLibrary.fontAwesome.variants.regular.icons,
        fontLibrary.fontAwesome.variants.brands.icons
      );
    },
    glyphs() {
      let _glyphs = [];
      _glyphs = this.allGlyphs;
      // if (this.activeTab.id !== "all") {
      //   _glyphs = this.activeTab.link.icons;
      // } else {
      //   _glyphs = this.allGlyphs;
      // }

      if (this.filterText !== "") {
        const _filterText = this.filterText.toLowerCase();
        _glyphs = _glyphs.filter(
          (item) => item.substr(7, this.filterText.length) === _filterText
        );
      }
      return _glyphs;
    },
  },
  methods: {
    setActiveGlyph(glyph) {
      this.activeGlyph = glyph;
      console.log("Active Glyph:", glyph);
    },
    isActiveGlyph(glyph) {
      return this.activeGlyph === glyph;
    },
    // isActiveTab(tab) {
    //   return tab === this.activeTab.id;
    // },
    // setActiveTab(tab) {
    //   this.activeTab = tab;
    //   // this.filterText = ""; //nice feature
    // },
    getGlyphName(glyph) {
      return glyph.replace(/f.. fa-/g, "").replace("-", " ");
    },
    insert() {
      console.log("Inserting Glyph:", this.activeGlyph);
      this.$emit("update:modelValue", this.activeGlyph);
      this.visible = false;
    },
    // togglePicker() {
    //   this.isVisible = !this.isVisible;
    // },
    // closePicker() {
    //   this.isVisible = false;
    // },
  },
  // created() {
  //   this.activeTab = this.tabs[0];
  // },
};
</script>
<!-- <script>
import { ref, computed } from "vue";
import fontLibrary from "./data/fonts";

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "Vue3 Icon Picker",
    },
    modelValue: {
      type: String,
      default: "fas fa-circle",
    },
  },
  setup(props, context) {
    const filterText = ref("");
    const activeGlyph = ref(props.modelValue);
    const isVisible = ref(false);

    const tabs = [
      {
        id: "all",
        title: "All Icons",
        icon: "fas fa-star-of-life",
        link: "all",
      },
      {
        id: "far",
        title: "Font Awesome Regular",
        icon: "fab fa-font-awesome-alt",
        link: fontLibrary.fontAwesome.variants.regular,
      },
      {
        id: "fas",
        title: "Font Awesome Solid",
        icon: "fab fa-font-awesome",
        link: fontLibrary.fontAwesome.variants.solid,
      },
      {
        id: "fab",
        title: "Font Awesome Brands",
        icon: "fab fa-font-awesome-flag",
        link: fontLibrary.fontAwesome.variants.brands,
      },
    ];

    const activeTab = ref(tabs[0]);

    const allGlyphs = [].concat(
      tabs[1].link.icons,
      tabs[2].link.icons,
      tabs[3].link.icons
    );

    const glyphs = computed(() => {
      let _glyphs = [];
      if (activeTab.value.id !== "all") {
        _glyphs = activeTab.value.link.icons;
      } else {
        _glyphs = allGlyphs;
      }

      if (filterText.value != "") {
        const _filterText = filterText.value.toLowerCase();
        _glyphs = _glyphs.filter(
          (item) => item.substr(7, filterText.value.length) === _filterText
        );
      }
      return _glyphs;
    });

    const setActiveGlyph = (glyph) => {
      activeGlyph.value = glyph;
      console.log("Active Glyph:", glyph);
    };

    const isActiveGlyph = (glyph) => {
      return activeGlyph.value == glyph;
    };

    const isActiveTab = (tab) => {
      return tab == activeTab.value.id;
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      // filterText.value=''; //nice feature
    };

    const getGlyphName = (glyph) =>
      glyph.replace(/f.. fa-/g, "").replace("-", " ");

    const insert = () => {
      console.log("Inserting Glyph:", activeGlyph.value);
      context.emit("update:modelValue", activeGlyph.value);
      //isVisible.value = false;
    };

    const togglePicker = () => {
      isVisible.value = !isVisible.value;
    };

    const closePicker = () => {
      isVisible.value = false;
    };

    return {
      fontLibrary,
      tabs,
      isActiveTab,
      setActiveTab,
      glyphs,
      activeGlyph,
      getGlyphName,
      filterText,
      setActiveGlyph,
      isActiveGlyph,
      insert,
      isVisible,
      togglePicker,
      closePicker,
    };
  },
};
</script> -->

<style scoped>
/*u */
.vue3-icon-picker {
  cursor: pointer;
  /* font-size:30px; */
}

button.select-icon {
  padding: 20px;
  border-radius: 5px;
  background-color: #70b2dc;
  font-size: 22px;
  cursor: pointer;
}

.icon-picker-wrap ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
}

.icon-picker-wrap ul li {
  border: 2px solid #ddd;
  line-height: 1;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
}

.icon-picker-wrap ul li i {
  font-size: 68px;
  line-height: 1;
  margin: 0;
}

.icon-picker-wrap ul li:nth-child(2) {
  border-left: 0;
}

/*
 */
.aim-close {
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
}

.aim-open {
  opacity: 1;
  visibility: visible;
  transition: all 0.4s ease-in-out;
}
.aim-modal {
  position: fixed;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  user-select: none;
  display: flex;
  align-items: center;
}

.aim-modal .aim-modal--content {
  position: absolute;
  border-radius: 3px;
  box-shadow: 2px 8px 23px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: Roboto, Arial, Helvetica, Verdana, sans-serif;
  background-color: #f1f3f5;
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
}

/* Header */
.aim-modal .aim-modal--header {
  padding: 15px 15px;
  background-color: #fff;
  box-shadow: 0 0 8px rgb(0 0 0 / 10%);
  position: relative;
  z-index: 1;
  font-size: 15px;
  color: #495157;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.aim-modal--header-logo-title {
  padding-top: 2px;
  line-height: 1;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
}

.aim-modal--header-close-btn {
  cursor: pointer;
}
.aim-modal--header-close-btn i {
  font-size: 22px;
}

/* body */
.aim-modal--body {
  font-size: 12px;
  line-height: 1.5;
  box-sizing: border-box;
  padding: 0;
  height: 700px;
  display: flex;
  min-height: 50px;
  max-height: 85vh;
  overflow: auto;
}

/* Sidebar Tabs */
.aim-modal--sidebar {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 25%;
  background-color: hsla(0, 0%, 100%, 0.3);
}
.aim-modal--sidebar-tabs {
  margin-top: 30px;
}
.aim-modal--sidebar-tab-item {
  padding: 15px 0 15px 45px;
  font-size: 14px;
  color: #6d7882;
  text-align: left;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  text-transform: capitalize;
}
.aim-modal--sidebar-tab-item i {
  font-size: 20px;
  padding-right: 15px;
  color: #a4afb7;
}

.aim-modal--sidebar-tab-item.aesthetic-active {
  background-color: #fff;
  -webkit-box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.aim-modal--sidebar-tab-item.aesthetic-active:after {
  content: "";
  position: absolute;
  height: 100%;
  width: 5px;
  top: 0;
  left: 0;
  background-color: #71d7f7;
}
.aim-modal--sidebar-tab-item.aesthetic-active i {
  color: #71d7f7;
}

/* Preview wrapper */
.aim-modal--icon-preview-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 30px 80px 0;
  width: 75%;
}
/* u */
.aim-modal--icon-preview-inner {
  overflow: auto;
  margin: 25px -15px 0;
  padding: 0 15px 15px;
}
/* u */
.aim-modal--icon-preview {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 20px;
  margin: 20px 0;
}

/* search filter */
/* u */
.aim-modal--icon-search {
  position: relative;
}
.aim-modal--icon-search input {
  width: calc(100% - 30px);
  padding: 8px 15px;
  background-color: #fff;
  border: none;
}
.aim-modal--icon-search input::-webkit-input-placeholder {
  font-style: italic;
}
.aim-modal--icon-search input::-moz-placeholder {
  font-style: italic;
}
.aim-modal--icon-search input::-ms-input-placeholder {
  font-style: italic;
}
.aim-modal--icon-search input::placeholder {
  font-style: italic;
}
.aim-modal--icon-search i {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 15px;
}

/* Icon Item */
.aim-icon-item {
  position: relative;
  padding: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 12px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.05);
  -webkit-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  overflow: hidden;
}
.aim-icon-item:hover {
  -webkit-box-shadow: 0 1px 14px rgba(0, 0, 0, 0.16);
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.16);
}
/* u */
.aim-icon-item.aesthetic-selected {
  -webkit-box-shadow: 0 1px 12px rgba(0, 0, 0, 0.05), 0 0 0 3px #71d7f7;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.05), 0 0 0 3px #71d7f7;
}
/* u */
.aim-icon-item-inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1px;
}
.aim-icon-item-inner i,
.aim-icon-item__icon {
  font-size: 25px;
  color: #6d7882;
}
/* u */
.aim-icon-item-name {
  color: #c2cbd2;
  font-size: 11px;
  padding: 13px 20px 0;
  max-width: 100%;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
}

/* Footer */
.aim-modal .aim-modal--footer {
  border-top: 1px solid #e6e9ec;
  text-align: center;
  background-color: #fff;
  border: none;
  display: none;
  justify-content: flex-end;
  padding: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

/* .aim-modal--footer button.aim-insert-icon-button {
  padding: 10px 35px;
  color: #fff;
  font-size: 15px;
  background-color: #39b54a;
  border: none;
  cursor: pointer;
  outline: 0;
} */

.aim-modal .aim-modal--footer .aesthetic-button {
  height: 40px;
  margin-left: 5px;
}
/* .aim-modal .aim-modal--footer .aesthetic-button-success {
  padding: 12px 36px;
  color: #fff;
  width: initial;
  font-size: 15px;
}
.aim-modal .aim-modal--footer .aesthetic-button-success:hover {
  background-color: #39b54a;
} */

/* preview sidebar */
/* .aim-sidebar-preview {
  position: absolute;
  bottom: 50px;
  width: 300px;
} */

/* .aim-sidebar-preview .aim-icon-item {
  height: 200px;
} */

/* .aim-sidebar-preview .aim-icon-item-inner i {
  padding-top: 10px;
  font-size: 120px;
} */
/* 
.aim-sidebar-preview .aim-icon-item-name {
  padding-top: 20px;
  font-size: 20px;
  color: #444;
  text-transform: lowercase;
} */

/* Responsive css */

@media (max-width: 1439px) {
  .aim-modal .aim-modal--content {
    max-width: 990px;
  }
}
@media (min-width: 1440px) {
  .aim-modal .aim-modal--content {
    max-width: 1200px;
  }
}
@media (max-width: 1439px) {
  .aim-modal--icon-preview-wrap {
    padding: 30px 50px 0;
  }
}
@media (max-width: 479px) {
  .aim-modal--icon-preview-wrap {
    width: 100%;
  }
}
@media (max-width: 1439px) {
  .aim-modal--icon-preview {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 1024px) {
  .aim-modal--icon-preview {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (max-width: 767px) {
  .aim-modal--icon-preview {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 479px) {
  .aim-modal--icon-preview {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 479px) {
  .aim-modal--sidebar {
    display: none;
  }
}
@media (max-width: 1439px) {
  .aim-modal--sidebar-tab-item {
    padding: 15px 15px 15px 25px;
    font-size: 11px;
  }
  .aim-modal--sidebar-tab-item i {
    font-size: 15px;
  }
}
@media (max-width: 1024px) {
  .aim-modal--sidebar-tab-item i {
    display: none;
  }
}
</style>
