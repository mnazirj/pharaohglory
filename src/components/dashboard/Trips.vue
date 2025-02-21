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
              :placeholder="$t('dash.trips.search')"
              fluid
            />
          </IconField>
        </div>
      </div>

      <div id="btn-create-container" class="d-flex align-content-center mx-2">
        <Button
          :label="$t('dash.trips.create')"
          icon="pi pi-plus"
          @click="openCreateDialog"
          style="min-width: 6rem"
        />
      </div>
    </div>
    <!-- <div class="table-responsive">
      <table class="table-page table align-middle text-center text-nowrap">
        <thead>
          <tr class="align-middle">
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col" class="align-bottom">
              Members<br /><span>current/max</span>
            </th>
            <th scope="col">Rate</th>
            <th scope="col">Availability</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trip in paginatedTrips" :key="trip.id">
            <td>#{{ trip.id }}</td>
            <td>{{ trip.title }}</td>
            <td>{{ trip.category }}</td>
            <td>
              {{ trip.currentMember }}/<span class="fs-5">{{
                trip.maxMember
              }}</span>
            </td>
            <td>
              <Rating
                v-model="trip.rate"
                readonly
                class="d-flex justify-content-center"
              />
            </td>
            <td>
              <i v-if="trip.availability" class="pi pi-check text-success"></i>
              <i v-else class="pi pi-ban text-danger"></i>
            </td>
            <td>
              <router-link :to="{ name: 'details', params: { uid: trip.id } }"
                ><button
                  type=" button"
                  class="btn btn-outline-second me-1 ms-1"
                >
                  <i class="pi pi-eye pt-1"></i></button
              ></router-link>

              <router-link
                :to="{ name: 'dash.trips.edit', params: { tripId: trip.id } }"
              >
                <button type="button" class="btn btn-outline-second me-1 ms-1">
                  <i class="pi pi-pen-to-square pt-1"></i></button
              ></router-link>

              <button
                type=" button"
                class="btn btn-main me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                @click="currentDataTripSeeder(trip)"
              >
                <i class="pi pi-trash pt-1"></i>
              </button>
              <router-link
                :to="{
                  name: 'dash.tripReviews',
                  params: { tripId: trip.id },
                }"
              >
                <button type=" button" class="btn btn-outline-second me-1 ms-1">
                  <i class="pi pi-star pt-1"></i>
                </button>
              </router-link>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <div class="d-flex justify-content-center">
      <DataTable
        :value="filteredData"
        paginator
        :rows="5"
        :class="['w-100 px-2 main-table', isEng ? 'ltr' : 'rtl']"
      >
        <Column :header="$t('dash.trips.title')">
          <template #body="slotProps">
            <span v-if="isEng" class="text-nowrap">{{
              slotProps.data.enTitle
            }}</span>
            <span v-else class="text-nowrap">
              {{ slotProps.data.arTitle }}</span
            >
          </template>
        </Column>

        <Column :header="$t('dash.trips.category')">
          <template #body="slotProps">
            <span v-if="isEng" class="text-nowrap">{{
              slotProps.data.enCategory
            }}</span>
            <span v-else class="text-nowrap">{{
              slotProps.data.arCategory
            }}</span>
          </template>
        </Column>

        <Column :header="$t('dash.trips.quantity')">
          <template #body="slotProps">
            <span>{{ slotProps.data.quantity }}</span>
            <span class="fs-5">/{{ slotProps.data.enrollMembers }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.trips.availabilty')">
          <template #body="slotProps">
            <i
              v-if="slotProps.data.isAvailable"
              class="pi pi-check text-success"
            ></i>
            <i v-else class="pi pi-ban text-danger"></i>
          </template>
        </Column>
        <Column :header="$t('dash.trips.actions')">
          <template #body="slotProps">
            <div class="d-flex">
              <Button
                icon="pi pi-eye"
                class="mx-1"
                severity="secondary"
                @click="
                  $router.push({
                    name: 'details',
                    params: { uid: slotProps.data.slug },
                  })
                "
              ></Button>
              <Button
                icon="pi pi-pen-to-square"
                severity="secondary"
                class="mx-1"
                @click="
                  $router.push({
                    name: 'dash.trips.edit',
                    params: { tripId: slotProps.data.slug },
                  })
                "
              ></Button>
              <Button
                icon="pi pi-trash"
                severity="danger"
                class="mx-1"
                @click="triggerDeleteDialog(slotProps.data)"
              ></Button>
              <Button
                icon="pi pi-star"
                severity="secondary"
                class="mx-1"
                @click="
                  $router.push({
                    name: 'dash.tripReviews',
                    params: { tripId: slotProps.data.slug },
                  })
                "
              ></Button>
              <!-- <router-link
                :to="{ name: 'details', params: { uid: slotProps.data.slug } }"
                ><button
                  type=" button"
                  class="btn btn-outline-second me-1 ms-1"
                >
                  <i class="pi pi-eye pt-1"></i></button
              ></router-link>

              <router-link
                :to="{
                  name: 'dash.trips.edit',
                  params: { tripId: slotProps.data.slug },
                }"
              >
                <button type="button" class="btn btn-outline-second me-1 ms-1">
                  <i class="pi pi-pen-to-square pt-1"></i></button
              ></router-link> -->

              <!-- <button
                type=" button"
                class="btn btn-main me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                @click="currentDataTripSeeder(slotProps.data)"
              >
                <i class="pi pi-trash pt-1"></i>
              </button> -->
              <!-- <router-link
                :to="{
                  name: 'dash.tripReviews',
                  params: { tripId: slotProps.data.id },
                }"
              >
                <button type=" button" class="btn btn-outline-second me-1 ms-1">
                  <i class="pi pi-star pt-1"></i>
                </button>
              </router-link> -->
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Pagination -->
    <!-- <Paginator
      class="w-100"
      :rows="rowsPerPageTrip"
      :totalRecords="filteredData.length"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChangeTrip"
    ></Paginator> -->
    <!-- Modals -->
    <!-- delete modal -->
    <Dialog
      v-model:visible="showDeleteDialog"
      :modal="true"
      :closable="true"
      :header="'Delete Trip #' + currentDataTrip.id"
      :style="{ width: '35rem' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    >
      <p>
        Are you Sure you want delete trip #{{ currentDataTrip.id }} which has
        title "{{ isEng ? currentDataTrip.enTitle : currentDataTrip.arTitle }} "
        ?
      </p>
      <template #footer>
        <Button
          icon="pi pi-trash"
          label="Delete"
          @click="deleteTrip(currentDataTrip.slug)"
        ></Button>
      </template>
    </Dialog>
    <!-- <div class="modal fade" id="delete-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">
              Delete Trip #{{ currentDataTrip.id }} {{ currentDataTrip.title }}
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex justify-content-center align-items-center"
          >
            <p>
              Are you Sure you want delete trip #{{ currentDataTrip.id }} which
              has title "{{ currentDataTrip.title }} " ?
            </p>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteData"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Create Modal -->
    <Dialog
      v-model:visible="showCreateDialog"
      :modal="true"
      :closable="true"
      :header="$t('dash.trips.curd_trip.create_a_trip')"
      :style="{ width: '75vw' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
      pt:hooks
    >
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="onFormSubmit"
        class="w-100 h-100"
      >
        <div
          class="d-flex justify-content-center align-item-center flex-wrap w-100"
        >
          <div
            class="d-flex justify-content-center align-item-center flex-wrap w-100"
          >
            <!-- Availability -->
            <div
              id="availability-container"
              class="d-flex align-item-center w-100 mt-2 mb-3"
            >
              <span class="fs-5 me-3"
                >{{ $t("dash.trips.availabilty") }} :
              </span>
              <div class="pt-1"><ToggleSwitch v-model="newTrip.status" /></div>
            </div>
            <!-- title -->
            <div
              id="title-container"
              class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
            >
              <div class="">
                <FloatLabel variant="on">
                  <InputText
                    id="titleEn"
                    type="text"
                    v-model="newTrip.titleEn"
                    name="titleEn"
                    fluid
                  />
                  <label for="titleEn"
                    ><i class="fa-solid fa-heading text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.title_in_english")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.titleEn?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.titleEn.error?.message) }}</Message
                >
              </div>
              <div class="">
                <FloatLabel variant="on">
                  <InputText
                    id="titleAr"
                    type="text"
                    name="titleAr"
                    v-model="newTrip.titleAr"
                    fluid
                  />
                  <label for="titleAr"
                    ><i class="fa-solid fa-heading text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.title_in_arabic")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.titleAr?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.titleAr.error?.message) }}</Message
                >
              </div>
            </div>
            <!-- Description -->
            <div
              id="description-container"
              class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
            >
              <div class="">
                <FloatLabel variant="on">
                  <Textarea
                    id="descriptionEn"
                    name="descriptionEn"
                    v-model="newTrip.descriptionEn"
                    @input="autoResize($event)"
                    rows="3"
                    class="w-100"
                  />
                  <label for="descriptionEn"
                    ><i class="fa-solid fa-paragraph text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.description_in_english")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.descriptionEn?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.descriptionEn.error?.message) }}</Message
                >
              </div>
              <div class="">
                <FloatLabel variant="on">
                  <Textarea
                    id="descriptionAr"
                    name="descriptionAr"
                    v-model="newTrip.descriptionAr"
                    @input="autoResize($event)"
                    rows="3"
                    class="w-100"
                  />
                  <label for="descriptionAr"
                    ><i class="fa-solid fa-paragraph text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.description_in_arabic")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.descriptionAr?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.descriptionAr.error?.message) }}</Message
                >
              </div>
            </div>
            <!-- Full Description -->
            <div
              id="fullDescription-container"
              class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
            >
              <div class="">
                <FloatLabel variant="on">
                  <Textarea
                    id="fullDescriptionEn"
                    name="fullDescriptionEn"
                    v-model="newTrip.fullDescriptionEn"
                    @input="autoResize($event)"
                    rows="6"
                    class="w-100"
                  />
                  <label for="fullDescriptionEn"
                    ><i class="fa-solid fa-paragraph text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.full_description_in_english")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.fullDescriptionEn?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.fullDescriptionEn.error?.message) }}</Message
                >
              </div>
              <div class="">
                <FloatLabel variant="on">
                  <Textarea
                    id="fullDescriptionAr"
                    name="fullDescriptionAr"
                    v-model="newTrip.fullDescriptionAr"
                    @input="autoResize($event)"
                    rows="6"
                    class="w-100"
                  />
                  <label for="fullDescriptionAr"
                    ><i class="fa-solid fa-paragraph text-main-color me-2"></i
                    ><span class="text-nowrap">{{
                      $t("dash.trips.curd_trip.full_description_in_arabic")
                    }}</span></label
                  >
                </FloatLabel>
                <Message
                  v-if="$form.fullDescriptionAr?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.fullDescriptionAr.error?.message) }}</Message
                >
              </div>
            </div>
            <!-- Category -->
            <div
              id="category-container"
              class="d-flex align-content-center flex-wrap w-100 my-5"
            >
              <div>
                <Select
                  v-model="categorySelected"
                  :options="categories"
                  id="category"
                  name="category"
                  optionLabel="categoryName"
                  :placeholder="$t('dash.trips.curd_trip.select_a_category')"
                  class="w-100"
                />
                <Message
                  v-if="$form.category?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.category.error?.message) }}</Message
                >
              </div>
              <div>
                <Select
                  v-model="typeSelected"
                  :options="eventTypes"
                  id="type"
                  name="type"
                  optionLabel="typeName"
                  :placeholder="$t('dash.trips.curd_trip.select_a_type')"
                  class="w-100"
                />
                <Message
                  v-if="$form.type?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $t($form.type.error?.message) }}</Message
                >
              </div>
            </div>
            <Accordion
              :value="[]"
              multiple
              expandIcon="pi pi-plus"
              collapseIcon="pi pi-minus"
              class="w-100"
            >
              <!-- Highlights -->
              <AccordionPanel value="0">
                <AccordionHeader>
                  <div>
                    <i class="fa-solid fa-highlighter me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2">{{
                      $t("dash.trips.curd_trip.highlights")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    class="d-flex align-items-center flex-wrap w-100 collapse"
                  >
                    <div class="w-100">
                      <DataTable
                        v-if="newTrip.heighlights != ''"
                        :value="newTrip.heighlights"
                        class="w-100"
                      >
                        <Column
                          :header="$t('dash.trips.curd_trip.in_english')"
                          style="width: 42.5%"
                        >
                          <template #body="slotProps">
                            <Textarea
                              v-model="slotProps.data.enTitle"
                              fluid
                            ></Textarea>
                          </template>
                        </Column>
                        <Column
                          :header="$t('dash.trips.curd_trip.in_arabic')"
                          style="width: 42.5%"
                        >
                          <template #body="slotProps">
                            <Textarea
                              v-model="slotProps.data.arTitle"
                              fluid
                            ></Textarea>
                          </template>
                        </Column>
                        <Column style="width: 15%">
                          <template #body="slotProps">
                            <Button
                              icon="pi pi-trash"
                              severity="danger"
                              rounded
                              variant="text"
                              @click="removeHighlight(slotProps.index)"
                            ></Button>
                          </template>
                        </Column>
                      </DataTable>
                      <div
                        class="d-flex justify-content-center align-items-center w-100 mt-4"
                      >
                        <Button
                          icon="pi pi-plus"
                          :label="$t('dash.trips.curd_trip.add')"
                          variant="text"
                          @click="addHighlight"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- Include -->
              <AccordionPanel value="1">
                <AccordionHeader>
                  <div>
                    <i
                      class="fa-regular fa-square-plus me-2 text-main-color"
                    ></i>
                    <span class="fs-5 font-bold me-2">{{
                      $t("dash.trips.curd_trip.includes")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <DataTable
                    v-if="newTrip.includes != ''"
                    :value="newTrip.includes"
                    class="w-100"
                  >
                    <Column
                      :header="$t('dash.trips.curd_trip.in_english')"
                      style="width: 35%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.enTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column
                      :header="$t('dash.trips.curd_trip.in_arabic')"
                      style="width: 35%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.arTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column
                      :header="$t('dash.trips.availabilty')"
                      style="width: 10%"
                    >
                      <template #body="slotProps">
                        <ToggleSwitch v-model="slotProps.data.status" />
                      </template>
                    </Column>
                    <Column style="width: 10%">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-trash"
                          severity="danger"
                          rounded
                          variant="text"
                          @click="removeInclude(slotProps.index)"
                        ></Button>
                      </template>
                    </Column>
                  </DataTable>
                  <div
                    class="d-flex justify-content-center align-items-center w-100 mt-4"
                  >
                    <Button
                      icon="pi pi-plus"
                      :label="$t('dash.trips.curd_trip.add')"
                      variant="text"
                      @click="addInclude"
                    ></Button>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- About Activity-->
              <AccordionPanel value="2">
                <AccordionHeader>
                  <div>
                    <i class="fa-solid fa-circle-info me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2">{{
                      $t("dash.trips.curd_trip.about_activity")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <DataTable
                    v-if="newTrip.aboutActivity != ''"
                    :value="newTrip.aboutActivity"
                    class="w-100"
                  >
                    <Column
                      :header="$t('dash.trips.curd_trip.icon')"
                      style="width: 5%"
                    >
                      <template #body="slotProps">
                        <IconPicker
                          v-model="slotProps.data.icon"
                          class="text-main-color"
                        />
                      </template>
                    </Column>
                    <Column
                      :header="$t('dash.trips.curd_trip.title_in_english')"
                      style="width: 15%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.enSubTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column
                      :header="
                        $t('dash.trips.curd_trip.description_in_english')
                      "
                      style="width: 30%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.enTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column
                      :header="$t('dash.trips.curd_trip.title_in_arabic')"
                      style="width: 15%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.arSubTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column
                      :header="$t('dash.trips.curd_trip.description_in_arabic')"
                      style="width: 30%"
                    >
                      <template #body="slotProps">
                        <Textarea
                          v-model="slotProps.data.arTitle"
                          fluid
                        ></Textarea>
                      </template>
                    </Column>
                    <Column style="width: 5%">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-trash"
                          severity="danger"
                          rounded
                          variant="text"
                          @click="removeaboutActivity(slotProps.index)"
                        ></Button>
                      </template>
                    </Column>
                  </DataTable>
                  <div
                    class="d-flex justify-content-center align-items-center w-100 mt-4"
                  >
                    <Button
                      icon="pi pi-plus"
                      :label="$t('dash.trips.curd_trip.add')"
                      variant="text"
                      @click="addAboutActivity"
                    ></Button>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- Date And time -->
              <AccordionPanel value="3">
                <AccordionHeader>
                  <div>
                    <i class="pi pi-calendar-clock me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2"
                      >{{ $t("dash.trips.curd_trip.date_and_time") }} *</span
                    >
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    id="time-container"
                    class="d-flex justify-content-between align-content-center w-100 my-5"
                  >
                    <div class="w-30 mx-2">
                      <!-- <div class="w-100 mb-1">
                        <i
                          class="fa-regular fa-calendar-plus text-main-color me-2"
                        ></i>
                        <span>{{ $t("dash.trips.curd_trip.start_date") }}</span>
                      </div>
                      <FormField
                        v-slot="$field"
                        :resolver="startDateResolver"
                        name="startDate"
                      >
                        <input
                          id="start_date"
                          type="date"
                          name="startDate"
                          class="form-control w-100"
                          v-model="newTrip.startDate"
                          :class="[{ error: $field?.invalid }]"
                          v-bind="$field.props"
                        />
                        <Message
                          v-if="$field?.invalid"
                          severity="error"
                          size="small"
                          variant="simple"
                          class="w-100"
                          >{{ $t($field.error?.message) }}</Message
                        >
                      </FormField> -->

                      <FloatLabel variant="on">
                        <DatePicker
                          v-model="newTrip.startDate"
                          inputId="start_date"
                          name="startDate"
                          showIcon
                          iconDisplay="input"
                          fluid
                          @date-select="formatedStartDate"
                        />
                        <label for="start_date"
                          ><i
                            class="fa-regular fa-calendar-plus text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.start_date")
                          }}</span></label
                        >
                      </FloatLabel>
                      <Message
                        v-if="$form.startDate?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="w-100"
                        >{{ $t($form.startDate.error?.message) }}</Message
                      >
                    </div>
                    <div class="w-30 mx-2">
                      <!-- <div class="w-100 mb-1">
                        <i
                          class="fa-regular fa-calendar-xmark text-main-color me-2"
                        ></i>
                        <span>{{ $t("dash.trips.curd_trip.end_date") }}</span>
                      </div>
                      <FormField
                        v-slot="$field"
                        :resolver="endDateResolver"
                        name="endDate"
                      >
                        <input
                          id="end_date"
                          type="date"
                          class="form-control w-100"
                          v-model="newTrip.endDate"
                          :class="[{ error: $field?.invalid }]"
                          v-bind="$field.props"
                        />
                        <Message
                          v-if="$field?.invalid"
                          severity="error"
                          size="small"
                          variant="simple"
                          class="w-100"
                          >{{ $t($field.error?.message) }}</Message
                        >
                      </FormField> -->
                      <FloatLabel variant="on">
                        <DatePicker
                          v-model="newTrip.endDate"
                          inputId="end_date"
                          name="endDate"
                          showIcon
                          iconDisplay="input"
                          fluid
                          @date-select="formatedEndDate"
                        />
                        <label for="end_date"
                          ><i
                            class="fa-regular fa-calendar-xmark text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.end_date")
                          }}</span></label
                        >
                      </FloatLabel>
                      <Message
                        v-if="$form.endDate?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="w-100"
                        >{{ $t($form.endDate.error?.message) }}</Message
                      >
                    </div>
                    <div class="w-30 mx-2">
                      <FloatLabel variant="on">
                        <InputMask
                          id="duration"
                          name="duration"
                          v-model="newTrip.duration"
                          mask="99 99:99:99"
                          fluid
                        />
                        <label for="duration"
                          ><i
                            class="fa-regular fa-clock text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">
                            {{ $t("dash.trips.curd_trip.duration") }}
                          </span></label
                        >
                      </FloatLabel>
                      <Message
                        v-if="$form.duration?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="w-100"
                        >{{ $t($form.duration.error?.message) }}</Message
                      >
                      <Message
                        v-if="$form.durationFormat?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="w-100"
                        >{{ $form.durationFormat.error?.message }}</Message
                      >
                      <!-- <div class="w-100 mb-1">
                        <i class="fa-regular fa-clock text-main-color me-2"></i>
                        <span>{{ $t("dash.trips.curd_trip.duration") }}</span>
                      </div>
                      <FormField
                        v-slot="$field"
                        :resolver="durationResolver"
                        name="duration"
                      >
                        <input
                          type="time"
                          class="form-control w-100"
                          v-model="newTrip.duration"
                          id="duration"
                          :class="[{ error: $field?.invalid }]"
                          v-bind="$field.props"
                        />
                        <Message
                          v-if="$field?.invalid"
                          severity="error"
                          size="small"
                          variant="simple"
                          class="w-100"
                          >{{ $t($field.error?.message) }}</Message
                        >
                      </FormField> -->
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- price adult & price child & discount -->
              <AccordionPanel value="4">
                <AccordionHeader>
                  <div>
                    <i class="pi pi-dollar me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2">{{
                      $t("dash.trips.curd_trip.payments")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    id="pay-container"
                    class="d-flex justify-content-between align-content-center w-100 my-5"
                  >
                    <div class="w-20 mx-2">
                      <FloatLabel variant="on">
                        <InputNumber
                          v-model="newTrip.priceAdult"
                          id="adult_price"
                          name="adultPrice"
                          mode="currency"
                          currency="USD"
                          locale="en-US"
                          fluid
                        />
                        <!-- <InputText
                          type="text"
                          id="adult_price"
                          v-model="newTrip.priceAdult"
                          fluid
                        ></InputText> -->
                        <label for="adult_price"
                          ><i
                            class="fa-solid fa-person-half-dress text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.adult_price")
                          }}</span></label
                        >
                      </FloatLabel>
                    </div>
                    <div class="w-20 mx-2">
                      <FloatLabel variant="on">
                        <InputNumber
                          v-model="newTrip.adultsDiscount"
                          id="adult_discount"
                          name="adultDiscount"
                          prefix="%"
                          fluid
                        />
                        <!-- <InputText
                          type="text"
                          id="adult_discount"
                          v-model="newTrip.adultsDiscount"
                          fluid
                        ></InputText> -->
                        <label for="adult_discount"
                          ><i
                            class="fa-solid fa-percent text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.adult_discount")
                          }}</span></label
                        >
                      </FloatLabel>
                    </div>
                    <div class="w-20 mx-2">
                      <FloatLabel variant="on">
                        <InputNumber
                          v-model="newTrip.priceChild"
                          id="children_price"
                          name="childrenPrice"
                          mode="currency"
                          currency="USD"
                          locale="en-US"
                          fluid
                        />
                        <!-- <InputText
                          type="text"
                          id="children_price"
                          v-model="newTrip.priceChild"
                          fluid
                        ></InputText> -->
                        <label for="children_price"
                          ><i
                            class="fa-solid fa-child-reaching text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.children_price")
                          }}</span></label
                        >
                      </FloatLabel>
                    </div>
                    <div class="w-20 mx-2">
                      <FloatLabel variant="on">
                        <InputNumber
                          v-model="newTrip.ChildrenDiscount"
                          id="children_discount"
                          name="childrenDiscount"
                          prefix="%"
                          fluid
                        />
                        <!-- <InputText
                          type="text"
                          id="children_discount"
                          v-model="newTrip.ChildrenDiscount"
                          fluid
                        ></InputText> -->
                        <label for="children_discount"
                          ><i
                            class="fa-solid fa-percent text-main-color me-2"
                          ></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.children_discount")
                          }}</span></label
                        >
                      </FloatLabel>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- Enroll Members -->
              <AccordionPanel value="5">
                <AccordionHeader>
                  <div class="w-100">
                    <i class="pi pi-user-plus text-main-color me-2"></i>
                    <span class="fs-5 text-nowrap">{{
                      $t("dash.trips.curd_trip.members_count")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    id="Members-container"
                    class="d-flex align-content-center flex-wrap w-100 my-5"
                  >
                    <div class="w-30 mx-2">
                      <FloatLabel variant="on">
                        <InputNumber
                          v-model="newTrip.enrollMembers"
                          inputId="enroll_member"
                          :useGrouping="false"
                          fluid
                        />
                        <label for="enroll_member"
                          ><i class="pi pi-users text-main-color me-2"></i
                          ><span class="text-nowrap">{{
                            $t("dash.trips.curd_trip.enroll_members")
                          }}</span></label
                        >
                      </FloatLabel>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- Event Main Image -->
              <!-- <AccordionPanel value="6">
                <AccordionHeader>
                  <div>
                    <i class="pi pi-image me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2">Main Image</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    id="main-image-container"
                    class="d-flex align-items-center justify-content-center"
                  >
                    <input
                      ref="fileInputMainImage"
                      type="file"
                      accept="image/*"
                      class="d-none"
                      @change="addMainImage"
                    />
                    <div
                      class="main-img-container relative m-3"
                      @mouseenter="isMainImageHovered = true"
                      @mouseleave="isMainImageHovered = false"
                      v-if="newTrip.eventImage != ''"
                    >
                      <img
                        :src="newTrip.eventImage"
                        alt="main-image"
                        class="trip-main-img"
                      />
                      <div
                        v-show="isMainImageHovered"
                        class="overlay-main-img d-flex justify-content-center align-items-center"
                      >
                        <i
                          class="pi pi-eye mx-1 text-second-color fs-3 cursor-pointer"
                          @click="viewMainImage(newTrip.eventImage)"
                        ></i>
                        <i
                          class="pi pi-pen-to-square mx-1 text-primary fs-3 cursor-pointer"
                          @click="triggerFileInputMainImage"
                        ></i>
                        <i
                          class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                          @click="deleteMainImage"
                        ></i>
                      </div>
                    </div>
                    <div v-else>
                      <Button
                        icon="pi pi-plus"
                        label="Add"
                        variant="text"
                        @click="triggerFileInputMainImage"
                      ></Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel> -->
              <!-- Images -->
              <AccordionPanel value="6">
                <AccordionHeader>
                  <div>
                    <i class="pi pi-images me-2 text-main-color"></i>
                    <span class="fs-5 font-bold me-2">{{
                      $t("dash.trips.curd_trip.images")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div
                    id="images-container"
                    class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
                  >
                    <div class="w-100 d-flex justify-content-center flex-wrap">
                      <div
                        v-for="(image, i) in newTrip.eventImages"
                        :key="i"
                        class="image-container mx-3 my-2 relative"
                        @mouseenter="isImageHovered = true"
                        @mouseleave="isImageHovered = false"
                      >
                        <img
                          :src="image"
                          :alt="'image' + i"
                          class="trip-imgs"
                        />
                        <div
                          v-show="isImageHovered"
                          class="overlay-imgs d-flex justify-content-center align-items-center"
                        >
                          <i
                            class="pi pi-eye mx-1 text-second-color fs-3 cursor-pointer"
                            @click="viewImage(image)"
                          ></i>

                          <i
                            class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                            @click="deleteImage(i)"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-center align-items-center w-100 mt-4"
                    >
                      <input
                        ref="fileInputImage"
                        type="file"
                        accept="image/*"
                        class="d-none"
                        @change="addImage"
                      />
                      <Button
                        icon="pi pi-plus"
                        :label="$t('dash.trips.curd_trip.add')"
                        variant="text"
                        @click="triggerFileInputImage"
                      ></Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="7">
                <AccordionHeader>
                  <div>
                    <i
                      class="fa-solid fa-location-dot me-2 text-main-color"
                    ></i>
                    <span class="fs-5">{{
                      $t("dash.trips.curd_trip.meeting_point")
                    }}</span>
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <div v-if="showCreateDialog" id="map" class="my-2"></div>
                  <div
                    class="w-100 d-flex justify-content-center align-items-center flex-wrap my-3"
                  >
                    <!-- <textarea
                      class="form-control w-100"
                      v-model="newTrip.meetingPoint.description"
                      @input="autoResize($event)"
                    ></textarea> -->
                    <FloatLabel variant="on" class="w-100 my-2">
                      <Textarea
                        id="en_meeting_point_description"
                        name="enMeetingPointDescription"
                        v-model="newTrip.meetingPoint.enDescription"
                        @input="autoResize($event)"
                        fluid
                      ></Textarea>
                      <label for="en_meeting_point_description"
                        ><span class="text-nowrap"
                          >{{ $t("dash.trips.curd_trip.meeting_point") }}
                          {{
                            $t("dash.trips.curd_trip.description_in_english")
                          }}</span
                        ></label
                      >
                    </FloatLabel>
                    <FloatLabel variant="on" class="w-100 my-2">
                      <Textarea
                        id="ar_meeting_point_description"
                        name="arMeetingPointDescription"
                        v-model="newTrip.meetingPoint.arDescription"
                        @input="autoResize($event)"
                        fluid
                      ></Textarea>
                      <label for="ar_meeting_point_description"
                        ><span class="text-nowrap"
                          >{{ $t("dash.trips.curd_trip.meeting_point") }}
                          {{
                            $t("dash.trips.curd_trip.description_in_arabic")
                          }}</span
                        ></label
                      >
                    </FloatLabel>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
        <div class="d-flex justify-content-end align-items-center mt-4 mb-2">
          <Button
            icon="pi pi-save"
            :label="$t('dash.trips.create')"
            type="submit"
          ></Button>
        </div>

        <Dialog
          v-model:visible="showImageDialog"
          modal
          :style="{ width: '80%' }"
          pt:root=""
          pt:header="p-0 pb-1 justify-content-end"
          pt:content="p-0"
          pt:pcclosebutton:severity="danger"
        >
          <img :src="currentImage" alt="Full Image" class="full-image" />
        </Dialog>
      </Form>
    </Dialog>

    <!-- Show Rate Modal -->
    <!-- <div class="modal fade" id="showRate-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content"> -->
    <!-- show Rate modal / Header -->
    <!-- <div class="modal-header">
            <h1 class="modal-title font-kanit fs-5">
              Reviews for tirp {{ currentDataTrip.title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> -->
    <!-- Show Rate modal / body -->
    <!-- <div
            class="modal-body w-100 d-flex justify-content-center align-items-center"
          >
            <div class="w-100"> -->
    <!-- show Rate modal / body / search seaction -->
    <!-- <div
                class="d-flex justify-content-center align-content-center mt-1 mb-3 w-100"
              >
                <div
                  class="d-flex justify-content-center align-content-center w-40 input-group"
                >
                  <i
                    class="pi pi-search fs-5 p-2 bg-main-color rounded-start-2 text-white"
                  ></i>
                  <input
                    type="text"
                    id="search"
                    class="w-90 p-1 pe-2 ps-2 border-2 border-start-0 rounded-end-2"
                  />
                </div>
              </div> -->
    <!-- show rate modal / body / table section -->
    <!-- <div
                class="table-responsive d-flex justify-content-center align-content-center flex-wrap mt-1 mb-1"
              >
                <table
                  class="table-page table align-middle text-center text-nowrap"
                >
                  <thead>
                    <tr>
                      <th scope="col" colspan="2">User</th>
                      <th scope="col">Review</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="review in paginatedReviews" :key="review.id">
                      <td>
                        <img
                          :src="review.user.img"
                          alt="user-img"
                          class="img-user rounded-circle"
                        />
                      </td>
                      <td>{{ review.user.name }}</td>
                      <td><Rating v-model="review.rate" readonly /></td>
                      <td>{{ clipText(review.description) }}</td>
                      <td>
                        <button
                          type=" button"
                          class="btn btn-main me-1 ms-1"
                          data-bs-toggle="modal"
                          data-bs-target="#showReview-modal"
                          @click="currentDataReviewsSeeder(review)"
                        >
                          <i class="pi pi-eye pt-1"></i>
                        </button>
                        <button
                          type=" button"
                          class="btn btn-danger me-1 ms-1"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteReview-modal"
                          @click="currentDataReviewsSeeder(review)"
                        >
                          <i class="pi pi-trash pt-1"></i>
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
    <!-- show rate modal / body / Pagination -->
    <!-- <Paginator
                class="w-100"
                :rows="rowsPerPageReviews"
                :totalRecords="tripReviews.length"
                :rowsPerPageOptions="[5, 10, 20, 30]"
                @page="onPageChangeReviews"
              ></Paginator> -->
    <!-- show rate modal / body / modals -->
    <!-- show rate modal / body / modals /delete modal -->
    <!-- <div class="modal fade" id="deleteReview-modal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5">
                        Delete Review #{{ currentDataReview.id }}
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div
                      class="modal-body d-flex justify-content-center align-items-center"
                    >
                      <p>
                        Are you Sure you want delete review #{{
                          currentDataReview.id
                        }}
                        from user "{{ currentDataReview.user.name }} ?"
                      </p>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        @click="deleteData"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div> -->
    <!-- show rate modal / body / modals / show modal -->
    <!-- <div id="showReview-modal" class="modal fade" tabindex="-1">
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h2>Review #{{ currentDataReview.id }}</h2>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div
                        class="d-flex justify-content-center align-items-center w-100 flex-wrap"
                      >
                        <div
                          class="d-flex justify-content-center align-items-center flex-wrap w-90 border-bottom-1 pb-2"
                        >
                          <span class="text-center w-100 mb-1 fs-5 font-bold"
                            >User Data</span
                          >
                          <div
                            class="w-100 d-flex justify-content-center align-content-center flex-wrap"
                          >
                            <div
                              class="d-flex justify-content-center align-items-center w-100 py-1"
                            >
                              <img
                                :src="currentDataReview.user.img"
                                alt="user-img"
                                class="img-user"
                              />
                            </div>
                            <div class="w-100 py-1">
                              <span class="text-muted">User id : </span>
                              <span>{{ currentDataReview.user.id }}</span>
                            </div>
                            <div class="w-100 py-1">
                              <span class="text-muted">User Name : </span>
                              <span>{{ currentDataReview.user.name }}</span>
                            </div>
                          </div>
                        </div>

                        <div
                          class="d-flex justify-content-center align-items-center flex-wrap w-90 pb-2"
                        >
                          <div
                            class="w-100 d-flex justify-content-center align-content-center flex-wrap"
                          >
                            <div class="w-100 d-flex align-items-center py-1">
                              <span class="text-muted">Rate : </span>
                              <span class="ms-1"
                                ><Rating
                                  v-model="currentDataReview.rate"
                                  readonly
                              /></span>
                            </div>
                            <div class="w-100 py-1">
                              <span class="text-muted">Description : </span>
                              <span>{{ currentDataReview.description }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-end"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Paginator from "primevue/paginator";
import Rating from "primevue/rating";
import ToggleSwitch from "primevue/toggleswitch";
import Dialog from "primevue/dialog";
import IconPicker from "./Vue3IconPicker.vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Textarea from "primevue/textarea";
import { nextTick } from "vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputMask from "primevue/inputmask";

import FloatLabel from "primevue/floatlabel";
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import DatePicker from "primevue/datepicker";
import Message from "primevue/message";

import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import axios from "axios";
import { date } from "zod";

export default {
  components: {
    Paginator,
    Rating,
    ToggleSwitch,
    IconPicker,
    Dialog,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Textarea,
    IconField,
    InputIcon,
    InputText,
    Button,
    DataTable,
    Column,
    Form,
    FloatLabel,
    DatePicker,
    Message,
    InputNumber,
    Select,
    FormField,
    InputMask,
  },

  data() {
    return {
      isEng: null,
      searchValue: "",
      showCreateDialog: false,
      showDeleteDialog: false,
      showImageDialog: false,
      isMainImageHovered: false,
      isImageHovered: false,
      currentPageTrip: 0,
      rowsPerPageTrip: 10,
      currentImage: "",
      // currentDataTrip: {
      //   id: null,
      //   title: null,
      //   category: null,
      //   maxMember: null,
      //   currentMember: null,
      //   rate: null,
      //   availability: null,
      // },
      currentDataTrip: {
        id: null,
      },
      currentPageReviews: 0,
      rowsPerPageReviews: 10,
      // currentDataReview: {
      //   id: null,
      //   user: {
      //     id: null,
      //     name: null,
      //     img: null,
      //   },
      //   description: null,
      //   rate: null,
      // },
      newTrip: {
        status: true,
        titleAr: "",
        titleEn: "",
        descriptionAr: "",
        descriptionEn: "",
        category: "",
        duration: "",
        startDate: "",
        endDate: "",
        adultsDiscount: 0,
        ChildrenDiscount: 0,
        priceAdult: 0,
        priceChild: 0,
        enrollMembers: null,
        // heighlightsEn: [],
        // heighlightsAr: [],
        heighlights: [],
        fullDescriptionAr: "",
        fullDescriptionEn: "",
        includes: [],
        aboutActivity: [],
        eventImage: "",
        eventImages: [],
        meetingPoint: {
          point: {
            lat: null,
            lng: null,
          },
          arDescription: "",
          enDescription: "",
        },
      },
      categories: [],
      categorySelected: null,
      typeSelected: null,
      eventTypes: [
        {
          id: 1,
          typeName: "Culture",
        },
        {
          id: 2,
          typeName: "Food",
        },
        {
          id: 3,
          typeName: "Nature",
        },
        {
          id: 4,
          typeName: "Sport",
        },
      ],
      map: null,
      marker: null,
      trips: null,
      initialValues: {
        adultPrice: 0,
        adultsDiscount: 0,
        childrenPrice: 0,
        childrenDiscount: 0,
      },
      // trips: [
      //   {
      //     id: 1,
      //     title: "Am Altoyor Vilage",
      //     category: "Guided Trip",
      //     maxMember: 50,
      //     currentMember: 15,
      //     rate: 2.5,
      //     availability: true,
      //   },
      //   {
      //     id: 2,
      //     title: "Latakia trip",
      //     category: "sea Trip",
      //     maxMember: 100,
      //     currentMember: 65,
      //     rate: 4.5,
      //     availability: true,
      //   },
      //   {
      //     id: 3,
      //     title: "Mhajren-mountin trip",
      //     category: "Mountin Trip",
      //     maxMember: 30,
      //     currentMember: 7,
      //     rate: 4,
      //     availability: true,
      //   },
      //   {
      //     id: 4,
      //     title: "Shikh-mountin trip",
      //     category: "Mountin Trip",
      //     maxMember: 75,
      //     currentMember: 70,
      //     rate: 3,
      //     availability: false,
      //   },
      //   {
      //     id: 5,
      //     title: "40-mountin trip",
      //     category: "Mountin Trip",
      //     maxMember: 30,
      //     currentMember: 21,
      //     rate: 4,
      //     availability: true,
      //   },
      //   {
      //     id: 6,
      //     title: "Tartous trip",
      //     category: "Sea Trip",
      //     maxMember: 150,
      //     currentMember: 84,
      //     rate: 3.5,
      //     availability: true,
      //   },
      //   {
      //     id: 7,
      //     title: "Tabaria-lake trip",
      //     category: "Sea Trip",
      //     maxMember: 150,
      //     currentMember: 15,
      //     rate: 1,
      //     availability: true,
      //   },
      //   {
      //     id: 8,
      //     title: "Four-seasion trip",
      //     category: "food Trip",
      //     maxMember: 10,
      //     currentMember: 3,
      //     rate: 4.5,
      //     availability: true,
      //   },
      //   {
      //     id: 9,
      //     title: "Tadmour trip",
      //     category: "Guided Trip",
      //     maxMember: 150,
      //     currentMember: 15,
      //     rate: 2,
      //     availability: false,
      //   },
      //   {
      //     id: 10,
      //     title: "Tadmour trip",
      //     category: "Guided Trip",
      //     maxMember: 150,
      //     currentMember: 15,
      //     rate: 2.5,
      //     availability: false,
      //   },
      //   {
      //     id: 11,
      //     title: "ALjeza trip",
      //     category: "Guided Trip",
      //     maxMember: 350,
      //     currentMember: 200,
      //     rate: 4,
      //     availability: false,
      //   },
      // ],
      // tripReviews: [
      //   {
      //     id: 1,
      //     user: {
      //       id: 1,
      //       name: "Ahmad Alahmad",
      //       img: require("@/assets/images/dashboard/avatar-1.png"),
      //     },
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
      //     rate: 3.5,
      //   },
      //   {
      //     id: 2,
      //     user: {
      //       id: 1,
      //       name: "Ahmad Alahmad",
      //       img: require("@/assets/images/dashboard/avatar-1.png"),
      //     },
      //     description:
      //       " eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
      //     rate: 3.5,
      //   },
      // ],
    };
  },
  computed: {
    // paginatedTrips() {
    //   const start = this.currentPageTrip * this.rowsPerPageTrip;
    //   const end = start + this.rowsPerPageTrip;
    //   return this.filteredData.slice(start, end);
    // },
    // paginatedReviews() {
    //   const start = this.currentPageReviews * this.rowsPerPageReviews;
    //   const end = start + this.rowsPerPageReviews;
    //   return this.tripReviews.slice(start, end);
    // },
    filteredData() {
      if (!this.searchValue) {
        return this.trips;
      }
      /*
      enTitle: this.newTrip.titleEn,
            arTitle: this.newTrip.titleAr,
            enDescription: this.newTrip.descriptionEn,
            arDescription: this.newTrip.descriptionAr,
            enFullDescription: this.newTrip.fullDescriptionEn,
            arFullDescription: this.newTrip.fullDescriptionAr,
            childPrice: this.newTrip.priceChild,
            adultPrice: this.newTrip.priceAdult,
            childDiscountAmount: this.newTrip.ChildrenDiscount,
            adultDiscountAmount: this.newTrip.adultsDiscount,
            startDate: this.newTrip.startDate,
            endDate: this.newTrip.endDate,
            quantity: 0,
            duration: this.newTrip.duration,
            eventType: this.typeSelected.typeName,
            arMeetingPoint: this.newTrip.meetingPoint.arDescription,
            enMeetingPoint: this.newTrip.meetingPoint.enDescription,
            metingPointLng: this.newTrip.meetingPoint.point.lng,
            metingPointLat: this.newTrip.meetingPoint.point.lat,
            isAvailable: this.newTrip.status,
            categorySlug: this.categorySelected.slug,
            aboutEvent: this.newTrip.aboutActivity,
            // eventHighlights: this.newTrip.heighlights,
            eventHighlights: [
              { enTitle: "test", arTitle: "Test" },
              { enTitle: "test22", arTitle: "Test2" },
            ],
            eventIncludes: this.newTrip.includes,

            enrollMembers: this.newTrip.enrollMembers,
            eventImages: this.newTrip.eventImages,
      */

      return this.trips.filter(
        (item) =>
          item.enTitle.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          item.arTitle.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          item.enDescription
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.arDescription
            .toLowerCase()
            .includes(this.searchValue.toLocaleLowerCase()) ||
          item.enFullDescription
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.arFullDescription
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.arCategory
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.enCategory
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.eventType
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.isAvailable.toString().includes(this.searchValue) ||
          item.enrollMembers.toString().includes(this.searchValue) ||
          item.quantity.toString().includes(this.searchValue)
      );
    },
  },
  methods: {
    formatedStartDate() {
      const startDate = new Date(this.newTrip.startDate);
      this.newTrip.startDate = startDate.toISOString().split("T")[0];
    },
    formatedEndDate() {
      const endDate = new Date(this.newTrip.endDate);
      this.newTrip.endDate = endDate.toISOString().split("T")[0];
    },
    currentDataTripSeeder(newData) {
      this.currentDataTrip = newData;
    },
    onPageChangeTrip(event) {
      this.currentPageTrip = event.page;
      this.rowsPerPageTrip = event.rows;
    },
    // currentDataReviewsSeeder(newData) {
    //   this.currentDataReview = newData;
    // },
    // onPageChangeReviews(event) {
    //   this.currentPageReviews = event.page;
    //   this.rowsPerPageReviews = event.rows;
    // },
    // clipText(text) {
    //   let newText = text;
    //   if (newText.split(" ").length > 5) {
    //     newText = newText.split(" ").slice(0, 5).join(" ") + "....";
    //   }
    //   return newText;
    // },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = textarea.scrollHeight + "px"; // Set height to content height
    },
    // removeHighlightEn(index) {
    //   this.newTrip.heighlightsEn.splice(index, 1);
    // },
    // removeHighlightAr(index) {
    //   this.newTrip.heighlightsAr.splice(index, 1);
    // },
    removeHighlight(index) {
      this.newTrip.heighlights.splice(index, 1);
    },
    removeInclude(index) {
      this.newTrip.includes.splice(index, 1);
    },
    removeaboutActivity(index) {
      this.newTrip.aboutActivity.splice(index, 1);
    },
    deleteImage(index) {
      this.newTrip.eventImages.splice(index, 1);
    },
    deleteMainImage() {
      this.newTrip.eventImage = "";
    },
    // addHighlightEn() {
    //   this.newTrip.heighlightsEn.push("");
    // },
    // addHighlightAr() {
    //   this.newTrip.heighlightsAr.push("");
    // },

    addHighlight() {
      this.newTrip.heighlights.push({ enTitle: "", arTitle: "" });
    },
    addInclude() {
      this.newTrip.includes.push({
        enTitle: "",
        arTitle: "",
        status: false,
      });
    },

    addAboutActivity() {
      this.newTrip.aboutActivity.push({
        enTitle: "",
        arTitle: "",
        enSubTitle: "",
        arSubTitle: "",
        icon: "fa-solid fa-circle",
      });
    },
    addMainImage(event) {
      const file = event.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newTrip.eventImage = e.target.result; // Add the image to the gallery
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    },
    addImage(event) {
      const file = event.target.files?.[0]; // Safely access the first file
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.newTrip.eventImages.push({ image: e.target.result }); // Add the image to the gallery
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    },
    viewMainImage(image) {
      this.currentImage = image;
      this.showImageDialog = true;
    },
    viewImage(image) {
      this.currentImage = image;
      this.showImageDialog = true;
    },
    triggerFileInputImage() {
      this.$refs.fileInputImage.click(); // Trigger the hidden file input
    },
    triggerFileInputMainImage() {
      this.$refs.fileInputMainImage.click();
    },
    /*

            // adultDiscountAmount: this.newTrip.adultsDiscount,
            // adultPrice: this.newTrip.priceAdult,
            // arDescription: this.newTrip.descriptionAr,
            // arFullDescription: this.newTrip.fullDescriptionAr,
            // arTitle: this.newTrip.titleAr,
            // childDiscountAmount: this.newTrip.ChildrenDiscount,
            // childPrice: this.newTrip.priceChild,
            // duration: this.newTrip.duration,
            // enDescription: this.newTrip.descriptionEn,
            // enFullDescription: this.newTrip.fullDescriptionEn,
            // enMeetingPoint: this.newTrip.meetingPoint.enDescription,
            // enTitle: this.newTrip.titleEn,
            // endDate: this.newTrip.endDate,
            // eventHighlights: this.newTrip.heighlights,
            // eventIncludes: this.newTrip.includes,
            // aboutEvent: this.newTrip.aboutActivity,
            // isAvailable: this.newTrip.status,
            // metingPointLat: this.newTrip.meetingPoint.point.lat,
            // metingPointLng: this.newTrip.meetingPoint.point.lng,
            // categorySlug: this.categorySelected.slug,
            // startDate: this.newTrip.startDate,
            // categoryId: this.categorySelected.id,
            // arCategory: this.categorySelected.categoryName,
            // enCategory: this.categorySelected.categoryName,

            // eventType: this.typeSelected.typeName,
            // slug: "test",
            // quantity: 0,

            // eventProbs:
            // eventRate: 0,
            // id: 2
    */
    async createTrip() {
      console.log(this.newTrip.heighlights);
      console.log(this.newTrip.includes);
      console.log(this.newTrip.aboutActivity);
      console.log(this.newTrip.eventImages);
      await axios
        .post(
          "base/add/event",
          {
            enTitle: this.newTrip.titleEn,
            arTitle: this.newTrip.titleAr,
            enDescription: this.newTrip.descriptionEn,
            arDescription: this.newTrip.descriptionAr,
            enFullDescription: this.newTrip.fullDescriptionEn,
            arFullDescription: this.newTrip.fullDescriptionAr,
            childPrice: this.newTrip.priceChild,
            adultPrice: this.newTrip.priceAdult,
            childDiscountAmount: this.newTrip.ChildrenDiscount,
            adultDiscountAmount: this.newTrip.adultsDiscount,
            startDate: this.newTrip.startDate,
            endDate: this.newTrip.endDate,
            quantity: 0,
            duration: this.newTrip.duration,
            eventType: this.typeSelected.typeName,
            arMeetingPoint: this.newTrip.meetingPoint.arDescription,
            enMeetingPoint: this.newTrip.meetingPoint.enDescription,
            metingPointLng: this.newTrip.meetingPoint.point.lng,
            metingPointLat: this.newTrip.meetingPoint.point.lat,
            isAvailable: this.newTrip.status,
            categorySlug: this.categorySelected.slug,
            aboutEvent: this.newTrip.aboutActivity,
            // eventHighlights: this.newTrip.heighlights,
            eventHighlights: [
              { enTitle: "test", arTitle: "Test" },
              { enTitle: "test22", arTitle: "Test2" },
            ],
            eventIncludes: this.newTrip.includes,

            enrollMembers: this.newTrip.enrollMembers,
            eventImages: this.newTrip.eventImages,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                (localStorage.getItem("_token") ||
                  sessionStorage.getItem("_token")),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.showCreateDialog = false;
            window.location.reload();
          }
        })
        .catch((e) => console.log(e));
    },
    openCreateDialog() {
      this.showCreateDialog = true;
      nextTick(() => {
        this.initMap();
      });
    },
    triggerDeleteDialog(data) {
      this.currentDataTrip = data;
      this.showDeleteDialog = true;
    },
    deleteTrip(slug) {
      axios
        .delete("base/delete/event/" + slug, {
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
          }
        });
    },
    initMap() {
      nextTick(() => {
        const mapElement = document.getElementById("map");

        if (mapElement) {
          // Initialize the map
          this.map = new google.maps.Map(mapElement, {
            center: { lat: 30.033333, lng: 31.233334 },
            zoom: 7,
          });

          // Add a click listener to set a marker
          this.map.addListener("click", (event) => {
            this.addMarker(event.latLng);
          });
        } else {
          console.error("Map element not found.");
        }
      });
    },
    addMarker(latLng) {
      const svgIcon = {
        path: "M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z",
        fillColor: "#ff1d48", // Fill color of the icon
        fillOpacity: 1, // Opacity
        strokeWeight: 0, // No border
        scale: 0.05, // Scale the size
      };
      // If a marker already exists, move it to the new position
      if (this.marker) {
        this.marker.setPosition(latLng);
        this.marker.setIcon(svgIcon);
      } else {
        // Create a new marker
        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: svgIcon,
          animation: google.maps.Animation.DROP,
          draggable: true, // Allow user to drag the marker
        });

        // Add drag event to update the marker position
        this.marker.addListener("dragend", (event) => {
          this.newTrip.meetingPoint.point = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
        });
      }

      // Update the marker position state
      this.newTrip.meetingPoint.point = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
    },
    updatePoint(lat, lng) {
      // Update the point and move the marker
      this.newTrip.meetingPoint.point.lat = lat;
      this.newTrip.meetingPoint.point.lng = lng;
      this.marker.setPosition({ lat, lng });
    },
    async getCategories() {
      await axios
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
            this.categories = res.data;
            console.log(this.categories);
          }
        });
    },
    async getTrips(token) {
      await axios
        .get("base/admin/event", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.trips = res.data;
            console.log(this.trips);
          }
        });
    },
    // startDateResolver: ({ values }) => {
    //   const errors = {};
    //   if (!values) {
    //     errors.startDate = [
    //       { message: "dash.trips.curd_trip.start_date_required" },
    //     ];
    //   }
    //   return { errors };
    // },
    // endDateResolver: ({ values }) => {
    //   const errors = {};
    //   if (!values) {
    //     errors.endDate = [
    //       { message: "dash.trips.curd_trip.end_date_required" },
    //     ];
    //   }
    //   return { errors };
    // },
    // durationResolver: ({ values }) => {
    //   const errors = {};
    //   if (!values) {
    //     errors.duration = [
    //       { message: "dash.trips.curd_trip.duration_required" },
    //     ];
    //   }
    //   return { errors };
    // },
    resolver: ({ values }) => {
      const errors = {};

      if (!values.titleEn) {
        errors.titleEn = [
          { message: "dash.trips.curd_trip.title_english_required" },
        ];
      }
      if (!values.titleAr) {
        errors.titleAr = [
          { message: "dash.trips.curd_trip.title_arabic_required" },
        ];
      }
      if (!values.descriptionEn) {
        errors.descriptionEn = [
          { message: "dash.trips.curd_trip.description_english_required" },
        ];
      }
      if (!values.descriptionAr) {
        errors.descriptionAr = [
          { message: "dash.trips.curd_trip.description_arabic_required" },
        ];
      }
      if (!values.fullDescriptionEn) {
        errors.fullDescriptionEn = [
          { message: "dash.trips.curd_trip.full_description_english_required" },
        ];
      }
      if (!values.fullDescriptionAr) {
        errors.fullDescriptionAr = [
          { message: "dash.trips.curd_trip.full_description_arabic_required" },
        ];
      }
      if (!values.category) {
        errors.category = [
          { message: "dash.trips.curd_trip.category_required" },
        ];
      }
      if (!values.type) {
        errors.type = [{ message: "dash.trips.curd_trip.type_required" }];
      }

      if (!values.startDate) {
        errors.startDate = [
          { message: "dash.trips.curd_trip.start_date_required" },
        ];
      }

      if (!values.endDate) {
        errors.endDate = [
          { message: "dash.trips.curd_trip.end_date_required" },
        ];
      }

      if (!values.duration) {
        errors.duration = [
          { message: "dash.trips.curd_trip.duration_required" },
        ];
      }

      var durationPattern = /[0-9]+\s[0-9]+:[0-9]+:[0-9]+/g;
      if (!durationPattern.test(values.duration)) {
        errors.durationFormat = [
          {
            message:
              "Format duration should be : 'dd hh:mm:ss' and all is number",
          },
        ];
      }

      console.log(values);
      console.log(errors);
      return {
        errors,
      };
    },
    onFormSubmit({ valid }) {
      console.log(this.newTrip.startDate);
      console.log(this.newTrip.endDate);
      console.log(this.newTrip.duration);
      if (valid) {
        // this.createTrip();
        console.log("Trip is created");
      }
    },
  },
  mounted() {
    // Define the global initMap function
    window.initMap = this.initMap;
    this.initMap();

    this.getTrips(
      localStorage.getItem("_token") || sessionStorage.getItem("_token")
    );
    this.getCategories();
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
  },
};
</script>

<style scoped>
.table-page thead tr th span {
  font-size: 0.7rem;
  color: rgb(224, 224, 224);
}
/* show rate modal */
.img-user {
  width: 3rem;
  height: 3rem;
}
textarea {
  resize: none;
  overflow-y: hidden;
}
#fullDescription-container div textarea {
  height: 5rem;
}
/* images */
.image-container {
  width: 13%;
  height: 7.5rem;
}
.trip-imgs {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.overlay-imgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 7.5rem; */
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.image-container:hover .overlay-imgs {
  opacity: 1;
  pointer-events: auto;
}
.image-container:hover .trip-imgs {
  filter: blur(3px);
}
.overlay-imgs div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
.full-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-attachment: fixed;
  background-size: cover;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
}
.main-img-container {
  width: 70%;
  height: 16rem;
}
.trip-main-img {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}
.overlay-main-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.main-img-container:hover .overlay-main-img {
  opacity: 1;
  pointer-events: auto;
}
.main-img-container:hover .trip-main-img {
  filter: blur(3px);
}
.overlay-main-img div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
/* Toggle Switch */
::v-deep .p-toggleswitch-slider {
  background: #c6c6c6 !important;
}
::v-deep .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background: #ff1d48 !important;
}
::v-deep
  .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover)
  .p-toggleswitch-slider {
  background: #959595 !important;
}
::v-deep
  .p-toggleswitch:not(.p-disabled):has(
    .p-toggleswitch-input:hover
  ).p-toggleswitch-checked
  .p-toggleswitch-slider {
  background: #e1183d !important;
}
/* map */
#map {
  width: 100%;
  height: 25rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* Responsive */
/* dialog */
@media (min-width: 768px) {
  #title-container,
  #category-container,
  #description-container,
  #fullDescription-container,
  #category-container {
    justify-content: space-between;
  }
  #title-container div,
  #category-container div,
  #description-container div,
  #fullDescription-container div,
  #category-container div {
    width: 40%;
  }
}

@media (max-width: 768px) {
  #title-container,
  #category-container,
  #description-container,
  #fullDescription-container,
  #category-container {
    justify-content: center;
  }
  #title-container div,
  #category-container div,
  #description-container div,
  #fullDescription-container div,
  #category-container div {
    width: 80%;
    margin: 1rem 0;
  }
}

@media (min-width: 1440px) {
  .image-container {
    width: 9.5%;
    height: 6.6rem;
  }
  .overlay-imgs {
    height: 6.6rem;
  }
}
@media (max-width: 1440px) {
  .image-container {
    width: 12%;
    height: 6rem;
  }
  .overlay-imgs {
    height: 6rem;
  }
}
@media (max-width: 1023px) {
  .image-container {
    width: 13.5%;
    height: 5.8rem;
  }
  .overlay-imgs {
    height: 5.8rem;
  }
}
@media (max-width: 768px) {
  .image-container {
    width: 20%;
    height: 5rem;
  }
  .overlay-imgs {
    height: 5rem;
  }
}
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
