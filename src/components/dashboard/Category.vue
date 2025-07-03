<template>
  <div>
    <div
      id="header"
      class="d-flex justify-content-between align-content-center mt-1 mb-3 w-100"
    >
      <div
        id="search-container"
        class="d-flex justify-content-center align-content-center"
      >
        <div class="d-flex align-content-center mx-3">
          <IconField class="">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText
              v-model="searchValue"
              :placeholder="$t('dash.category.search')"
              class="w-100"
            />
          </IconField>
        </div>
      </div>

      <div id="btn-create-container" class="d-flex align-content-center mx-2">
        <Button
          :label="$t('dash.category.create')"
          icon="pi pi-plus"
          @click="showCreateDialog = true"
          style="min-width: 6rem"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <DataTable
        :value="filteredData"
        paginator
        :rows="5"
        :class="[
          'w-100 px-2 main-table',
          isEng ? 'ltr' : 'rtl',
          isDark ? 'dark' : '',
        ]"
      >
        <Column
          field="id"
          :header="$t('dash.category.id')"
          style="width: 10%"
        ></Column>
        <Column
          field="categoryName"
          :header="$t('dash.category.category_name')"
          style="width: 80%"
        ></Column>
        <Column :header="$t('dash.category.actions')" style="width: 10%">
          <template #body="slotProps">
            <div class="d-flex align-items-center">
              <Button
                icon="pi pi-trash"
                severity="danger"
                class="mx-1"
                @click="triggerDeleteDialog(slotProps.data)"
              ></Button>
              <Button
                icon="pi pi-pen-to-square"
                class="mx-1"
                severity="secondary"
                @click="triggerEditDialog(slotProps.data)"
              ></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- Delete Dialog -->
    <Dialog
      v-model:visible="showDeleteDialog"
      :modal="true"
      :closable="true"
      :header="$t('dash.category.curd.delete_category') + ' #' + currentData.id"
      :style="{ width: '35rem' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
      :dir="isEng ? 'ltr' : 'rtl'"
    >
      <p>
        {{ $t("dash.category.curd.delete_quastion1") }} #{{ currentData.id }}
        {{ $t("dash.category.curd.delete_quastion2") }} "{{
          currentData.categoryName
        }}" {{ $t("dash.category.curd.?") }}
      </p>
      <template #footer>
        <Button
          :loading="isLoading"
          icon="pi pi-trash"
          :label="$t('dash.category.curd.delete')"
          @click="deleteCategory(currentData.slug)"
        ></Button>
      </template>
    </Dialog>
    <!-- Edit Dialog -->
    <Dialog
      v-model:visible="showEditDialog"
      :modal="true"
      :closable="true"
      :header="$t('dash.category.curd.edit_category') + ' #' + currentData.id"
      :style="{ width: '35rem' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
      :dir="isEng ? 'ltr' : 'rtl'"
    >
      <Form v-slot="$form" :resolver="editResolver" @submit="editOnFormSubmit">
        <FloatLabel variant="on" class="w-100 my-3">
          <IconField>
            <InputIcon class="fa-solid fa-heading text-main-color" />
            <InputText
              id="en_category_name"
              name="enCategoryName"
              v-model="newCategory.enCategoryName"
              fluid
            />
          </IconField>
          <label for="en_category_name">{{
            $t("dash.category.curd.category_name_in_english")
          }}</label>
        </FloatLabel>
        <Message
          v-if="$form.enCategoryName?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="w-100"
          >{{ $form.enCategoryName.error?.message }}</Message
        >
        <FloatLabel variant="on" class="w-100 my-3">
          <IconField>
            <InputIcon class="fa-solid fa-heading text-main-color" />
            <InputText
              id="ar_category_name"
              name="ar_categoryName"
              v-model="newCategory.arCategoryName"
              fluid
            />
          </IconField>
          <label for="ar_category_name">{{
            $t("dash.category.curd.category_name_in_arabic")
          }}</label>
        </FloatLabel>
        <Message
          v-if="$form.arCategoryName?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="w-100"
          >{{ $form.arCategoryName.error?.message }}</Message
        >
        <div class="d-flex justify-content-end align-items-center mt-4 mb-2">
          <Button
            icon="pi pi-save"
            :label="$t('dash.category.curd.update')"
            :loading="isLoading"
            @click="updateCategory(currentData.slug)"
          ></Button>
        </div>
      </Form>
    </Dialog>
    <!-- create Dialog -->
    <Dialog
      v-model:visible="showCreateDialog"
      :modal="true"
      :closable="true"
      :header="$t('dash.category.curd.create_a_category')"
      :style="{ width: '35rem' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
      :dir="isEng ? 'ltr' : 'rtl'"
    >
      <Form
        v-slot="$form"
        :resolver="createResolver"
        @submit="createOnFormSubmit"
      >
        <FloatLabel variant="on" class="w-100 my-3">
          <IconField>
            <InputIcon class="fa-solid fa-heading text-main-color" />
            <InputText
              id="en_category_name"
              name="enCategoryName"
              v-model="newCategory.enCategoryName"
              fluid
            />
          </IconField>
          <label for="en_category_name">{{
            $t("dash.category.curd.category_name_in_english")
          }}</label>
        </FloatLabel>
        <Message
          v-if="$form.enCategoryName?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="w-100"
          >{{ $form.enCategoryName.error?.message }}</Message
        >
        <FloatLabel variant="on" class="w-100 my-3">
          <IconField>
            <InputIcon class="fa-solid fa-heading text-main-color" />
            <InputText
              id="ar_category_name"
              name="arCategoryName"
              v-model="newCategory.arCategoryName"
              fluid
            />
          </IconField>
          <label for="ar_category_name">{{
            $t("dash.category.curd.category_name_in_arabic")
          }}</label>
        </FloatLabel>
        <Message
          v-if="$form.enCategoryName?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="w-100"
          >{{ $form.arCategoryName.error?.message }}</Message
        >
        <div class="d-flex justify-content-end align-items-center mt-4 mb-2">
          {{ console.log($form) }}
          <Button
            icon="pi pi-save"
            :label="$t('dash.category.create')"
            :loading="isLoading"
            type="submit"
          ></Button>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FloatLabel from "primevue/floatlabel";
import { Form } from "@primevue/forms";
import Message from "primevue/message";
import axios from "axios";
export default {
  components: {
    Dialog,
    IconField,
    InputIcon,
    InputText,
    Button,
    DataTable,
    Column,
    FloatLabel,
    Form,
    Message,
  },
  data() {
    return {
      searchValue: "",
      isLoading: false,
      isEng: null,
      isDark: null,
      categoryies: null,
      newCategory: {
        arCategoryName: "",
        enCategoryName: "",
      },
      currentData: {
        id: null,
      },
      showDeleteDialog: false,
      showEditDialog: false,
      showCreateDialog: false,
    };
  },
  computed: {
    filteredData() {
      if (!this.searchValue) {
        return this.categoryies;
      }
      return this.categoryies.filter(
        (item) =>
          item.id.toString().includes(this.searchValue) ||
          item.categoryName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
      );
    },
  },
  methods: {
    triggerDeleteDialog(data) {
      this.currentData = data;
      this.showDeleteDialog = true;
    },
    triggerEditDialog(data) {
      this.currentData = data;
      this.showEditDialog = true;
    },
    deleteCategory(slug) {
      this.showDeleteDialog = false;
    },
    getCategories() {
      axios
        .get("base/view/category?lang=" + localStorage.getItem("locale"), {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("_token") ||
                sessionStorage.getItem("_token")),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.categoryies = res.data;
            console.log(this.categoryies);
          }
        });
    },
    createCategory() {
      this.isLoading = true;
      axios
        .post(
          "base/add/category",
          {
            enCategoryName: this.newCategory.enCategoryName,
            arCategoryName: this.newCategory.arCategoryName,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                (localStorage.getItem("_token") ||
                  sessionStorage.getItem("_token")),
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.showCreateDialog = false;
            this.newCategory = null;
            window.location.reload();
          } else {
            this.isLoading = false;
          }
        });
    },
    updateCategory(slug) {
      this.isLoading = true;
      axios
        .put(
          "base/edit/category/" + slug,
          {
            enCategoryName: this.newCategory.enCategoryName,
            arCategoryName: this.newCategory.arCategoryName,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                (localStorage.getItem("_token") ||
                  sessionStorage.getItem("_token")),
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.showEditDialog = false;
            this.newCategory = null;
            window.location.reload();
          } else {
            this.isLoading = false;
          }
        });
    },
    deleteCategory(slug) {
      this.isLoading = true;
      axios
        .delete("base/delete/category/" + slug, {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("_token") ||
                sessionStorage.getItem("_token")),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.showDeleteDialog = false;
            window.location.reload();
          }else {
            this.isLoading = false;
          }
        });
    },
    createResolver({ values }) {
      const errors = {};

      if (!values.enCategoryName) {
        errors.enCategoryName = [
          { message: this.$t("dash.category.curd.en_category_name_required") },
        ];
      }
      if (!values.arCategoryName) {
        errors.arCategoryName = [
          { message: this.$t("dash.category.curd.ar_category_name_required") },
        ];
      }
      return { errors };
    },
    createOnFormSubmit({ valid }) {
      if (valid) {
        this.createCategory();
      }
    },
    editResolver({ values }) {
      const errors = {};
      if (!values.enCategoryName) {
        errors.enCategoryName = [
          { message: this.$t("dash.category.curd.en_category_name_required") },
        ];
      }
      if (!values.arCategoryName) {
        errors.arCategoryName = [
          { message: this.$t("dash.category.curd.ar_category_name_required") },
        ];
      }
      return { errors };
    },
    editOnFormSubmit({ valid }) {
      if (valid) {
        this.updateCategory();
      }
    },
  },
  mounted() {
    this.getCategories();
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
    this.isDark = localStorage.getItem("mode") == "dark";
  },
};
</script>

<style scoped>
/* Responsive */
/* header */
@media (min-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 50%;
    justify-content: end;
  }
}
@media (max-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 60%;
    justify-content: end;
  }
}
@media (max-width: 1023px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 70%;
    justify-content: end;
  }
}
@media (max-width: 768px) {
  #search-container {
    width: 100%;
  }
  #header #search-container div {
    width: 90%;
    justify-content: center;
  }
  #header {
    flex-wrap: wrap;
  }
  #btn-create-container {
    width: 90%;
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
