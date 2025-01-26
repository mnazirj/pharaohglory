<template>
  <div>
    <div
      class="d-flex justify-content-between align-content-center mt-1 mb-3 w-100"
    >
      <div class="d-flex justify-content-center align-content-center w-90">
        <div
          class="d-flex justify-content-end align-content-center w-60 input-group"
        >
          <i
            class="pi pi-search fs-5 p-2 bg-main-color rounded-start-2 text-white"
          ></i>
          <input
            type="text"
            id="search"
            class="w-60 p-1 pe-2 ps-2 border-2 border-start-0 rounded-end-2"
          />
        </div>
      </div>

      <div class="d-flex justify-content-end align-content-center w-10 me-4">
        <button
          type="button"
          class="btn btn-main d-flex align-items-center justify-content-center"
          @click="openCreateDialog"
        >
          <i class="pi pi-plus me-2"></i>
          <span>Create</span>
        </button>
      </div>
    </div>
    <div
      class="table-responsive d-flex justify-content-center align-content-center flex-wrap mt-1 mb-1"
    >
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
                ><button type=" button" class="btn btn-main me-1 ms-1">
                  <i class="pi pi-eye pt-1"></i></button
              ></router-link>

              <router-link
                :to="{ name: 'dash.trips.edit', params: { tripId: trip.id } }"
              >
                <button type="button" class="btn btn-second me-1 ms-1">
                  <i class="pi pi-pen-to-square pt-1"></i></button
              ></router-link>

              <button
                type=" button"
                class="btn btn-danger me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                @click="currentDataTripSeeder(trip)"
              >
                <i class="pi pi-trash pt-1"></i>
              </button>
              <router-link
                :to="{ name: 'dash.tripReviews', params: { tripId: trip.id } }"
              >
                <button type=" button" class="btn btn-main me-1 ms-1">
                  <i class="pi pi-star pt-1"></i>
                </button>
              </router-link>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <Paginator
      class="w-100"
      :rows="rowsPerPageTrip"
      :totalRecords="trips.length"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChangeTrip"
    ></Paginator>
    <!-- Modals -->
    <!-- delete modal -->
    <div class="modal fade" id="delete-modal" tabindex="-1">
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
    </div>
    <!-- Create Modal -->
    <Dialog
      v-model:visible="showCreateDialog"
      :modal="true"
      :closable="true"
      header="Create a Trip"
      :style="{ width: '75vw' }"
      :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
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
            <span class="fs-5 me-3">Availability : </span>
            <div class="pt-1"><ToggleSwitch v-model="newTrip.status" /></div>
          </div>
          <!-- title -->
          <div
            id="title-container"
            class="d-flex justify-content-between align-content-center flex-wrap w-100 mt-2 mb-3"
          >
            <div class="w-100 mb-2">
              <span class="fs-5 font-bold">Title</span>
            </div>
            <div class="w-40">
              <input
                type="text"
                id="titleEn"
                class="form-control"
                placeholder="Title in English"
              />
            </div>
            <div class="w-40">
              <input
                type="text"
                id="titleAr"
                class="form-control"
                placeholder="Title in Arabic"
              />
            </div>
          </div>
          <!-- Description -->
          <div
            id="description-container"
            class="d-flex justify-content-between align-content-center flex-wrap w-100 mt-2 mb-3"
          >
            <div class="w-100 mb-2">
              <span class="fs-5 font-bold">Description</span>
            </div>
            <div class="w-40">
              <textarea
                class="form-control"
                placeholder="Description in English"
                @input="autoResize($event)"
              ></textarea>
            </div>
            <div class="w-40">
              <textarea
                class="form-control"
                placeholder="Description in Arabic"
                @input="autoResize($event)"
              ></textarea>
            </div>
          </div>
          <!-- Full Description -->
          <div
            id="fullDescription-container"
            class="d-flex justify-content-between align-content-center flex-wrap w-100 mt-2 mb-3"
          >
            <div class="w-100 mb-2">
              <span class="fs-5 font-bold">Full Description</span>
            </div>
            <div class="w-40">
              <textarea
                class="form-control"
                placeholder="Full Description in English"
                @input="autoResize($event)"
              ></textarea>
            </div>
            <div class="w-40">
              <textarea
                class="form-control"
                placeholder="Full Description in Arabic"
                @input="autoResize($event)"
              ></textarea>
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
                  <span class="fs-5 font-bold me-2">Highlights</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div
                  class="d-flex justify-content-between align-items-center flex-wrap w-100 collapse"
                >
                  <div class="w-40">
                    <div class="w-100">
                      <!-- <i
                        class="fa-solid fa-highlighter me-2 text-main-color"
                      ></i> -->
                      <span class="fs-5">Heighlights in English</span>
                    </div>
                    <table class="table">
                      <tbody>
                        <tr
                          v-for="(heighlightEn, i) in newTrip.heighlightsEn"
                          :key="i"
                          class="align-middle"
                        >
                          <td>
                            <!-- <Textarea
                              id="highlight-in-english"
                              v-model="newTrip.heighlightsEn[i]"
                              autoResize
                              rows="5"
                              cols="30"
                              placeholder="a highligh in english"
                            /> -->
                            <textarea
                              class="form-control border-0"
                              v-model="newTrip.heighlightsEn[i]"
                              @input="autoResize($event)"
                              placeholder="a Heighlight in English"
                            ></textarea>
                          </td>

                          <td class="text-end">
                            <button
                              type=" button"
                              class="btn btn-outline-danger border-0"
                              @click="removeHighlightEn(i)"
                            >
                              <i class="pi pi-trash pt-1"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="d-flex justify-content-center align-items-center w-100"
                    >
                      <button
                        type="button "
                        class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
                        @click="addHighlightEn"
                      >
                        <i class="pi pi-plus me-1"></i>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                  <div class="w-40">
                    <div class="w-100">
                      <!-- <i
                        class="fa-solid fa-highlighter me-2 text-main-color"
                      ></i> -->
                      <span class="fs-5">Heighlights in Arabic</span>
                    </div>
                    <table class="table">
                      <tbody>
                        <tr
                          v-for="(heighlightAr, i) in newTrip.heighlightsAr"
                          :key="i"
                          class="align-middle"
                        >
                          <td>
                            <textarea
                              class="form-control border-0"
                              v-model="newTrip.heighlightsAr[i]"
                              placeholder="a Heighlight in Arabic"
                              @input="autoResize($event)"
                            ></textarea>
                          </td>

                          <td>
                            <button
                              type=" button"
                              class="btn btn-outline-danger border-0"
                              @click="removeHighlightAr(i)"
                            >
                              <i class="pi pi-trash pt-1"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="d-flex justify-content-center align-items-center w-100"
                    >
                      <button
                        type="button "
                        class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
                        @click="addHighlightAr"
                      >
                        <i class="pi pi-plus me-1"></i>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <!-- Include -->
            <AccordionPanel value="1">
              <AccordionHeader>
                <div>
                  <i class="fa-regular fa-square-plus me-2 text-main-color"></i>
                  <span class="fs-5 font-bold me-2">Includes</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div class="w-100">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Include in English</th>
                        <th>Include in Arabic</th>
                        <th>Availability</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(include, i) in newTrip.includes"
                        :key="i"
                        class="align-middle"
                      >
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="newTrip.includes[i].includeEn"
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="newTrip.includes[i].includeAr"
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <ToggleSwitch v-model="newTrip.includes[i].status" />
                        </td>
                        <td class="text-end">
                          <button
                            type=" button"
                            class="btn btn-outline-danger border-0"
                            @click="removeInclude(i)"
                          >
                            <i class="pi pi-trash pt-1"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="d-flex justify-content-center align-items-center w-100"
                  >
                    <button
                      type="button "
                      class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
                      @click="addInclude"
                    >
                      <i class="pi pi-plus me-1"></i>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <!-- About Activity-->
            <AccordionPanel value="2">
              <AccordionHeader>
                <div>
                  <i class="fa-solid fa-circle-info me-2 text-main-color"></i>
                  <span class="fs-5 font-bold me-2">About Activity</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div class="">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Title in English</th>
                        <th>Description in English</th>
                        <th>Title in Arabic</th>
                        <th>Description in Arabic</th>
                        <th>icon</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(about, i) in newTrip.aboutActivity"
                        :key="i"
                        class="align-middle"
                      >
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="newTrip.aboutActivity[i].aboutTitleEn"
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="
                              newTrip.aboutActivity[i].aboutDescriptionEn
                            "
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="newTrip.aboutActivity[i].aboutTitleAr"
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <textarea
                            class="form-control border-0"
                            v-model="
                              newTrip.aboutActivity[i].aboutDescriptionAr
                            "
                            @input="autoResize($event)"
                          ></textarea>
                        </td>
                        <td>
                          <IconPicker
                            v-model="newTrip.aboutActivity[i].icon"
                            class="text-main-color"
                          />
                        </td>
                        <td class="text-end">
                          <button
                            type=" button"
                            class="btn btn-outline-danger border-0"
                            @click="removeaboutActivity(i)"
                          >
                            <i class="pi pi-trash pt-1"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="d-flex justify-content-center align-items-center w-100"
                  >
                    <button
                      type="button "
                      class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
                      @click="addAboutActivity"
                    >
                      <i class="pi pi-plus me-1"></i>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="3">
              <AccordionHeader>
                <div>
                  <i class="pi pi-calendar-clock me-2 text-main-color"></i>
                  <span class="fs-5 font-bold me-2">Date and Time</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div
                  id="time-container"
                  class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
                >
                  <div class="w-30">
                    <div class="w-100">
                      <i
                        class="fa-regular fa-calendar-plus me-2 text-main-color"
                      ></i>
                      <span class="fs-5">Start Date</span>
                    </div>
                    <input
                      type="date"
                      class="form-control"
                      :v-model="newTrip.startDate"
                    />
                  </div>
                  <div class="w-30">
                    <div class="w-100">
                      <i
                        class="fa-regular fa-calendar-xmark me-2 text-main-color"
                      ></i>
                      <span class="fs-5">End Date</span>
                    </div>
                    <input
                      type="date"
                      class="form-control"
                      :v-model="newTrip.endDate"
                    />
                  </div>
                  <div class="w-30">
                    <div class="w-100">
                      <i class="fa-regular fa-clock me-2 text-main-color"></i>
                      <span class="fs-5">Duration</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newTrip.duration"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <!-- price adult & price child & discount -->
            <AccordionPanel value="4">
              <AccordionHeader>
                <div>
                  <i class="pi pi-dollar me-2 text-main-color"></i>
                  <span class="fs-5 font-bold me-2">Payments</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div
                  id="pay-container"
                  class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
                >
                  <div class="w-20">
                    <div class="w-100">
                      <i
                        class="fa-solid fa-person-half-dress me-2 text-main-color"
                      ></i>
                      <span class="fs-5">Adult Price</span>
                    </div>

                    <input
                      type="text"
                      class="form-control"
                      v-model="newTrip.priceAdult"
                    />
                  </div>
                  <div class="w-20">
                    <div class="w-100">
                      <i
                        class="fa-solid fa-child-reaching me-2 text-main-color"
                      ></i>
                      <span class="fs-5">Child Price</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newTrip.priceChild"
                    />
                  </div>
                  <div class="w-20">
                    <div class="w-100">
                      <i class="fa-solid fa-percent me-2 text-main-color"></i>
                      <span class="fs-5">Adults Discount</span>
                    </div>

                    <input
                      type="text"
                      class="form-control"
                      v-model="newTrip.adultsDiscount"
                    />
                  </div>
                  <div class="w-20">
                    <div class="w-100">
                      <i class="fa-solid fa-percent me-2 text-main-color"></i>
                      <span class="fs-5">Children Discount</span>
                    </div>

                    <input
                      type="text"
                      class="form-control"
                      v-model="newTrip.ChildrenDiscount"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="5">
              <AccordionHeader>
                <div>
                  <i class="fa-regular fa-image me-2 text-main-color"></i>
                  <span class="fs-5 font-bold me-2">Images</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div class="w-100 d-flex justify-content-center flex-wrap">
                  <div
                    v-for="(image, i) in newTrip.images"
                    :key="i"
                    class="image-container mx-3 my-2 relative"
                    @mouseenter="isImageHovered = true"
                    @mouseleave="isImageHovered = false"
                  >
                    <img :src="image" :alt="'image' + i" class="trip-img" />
                    <div
                      v-show="isImageHovered"
                      class="overlay-img d-flex justify-content-center align-items-center"
                    >
                      <i
                        class="pi pi-eye mx-1 text-second-color fs-3 cursor-pointer"
                        @click="showImageDialog = true"
                      ></i>
                      <i
                        class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                        @click="deleteImage(i)"
                      ></i>
                      <!-- view image modal -->
                      <Dialog
                        v-model:visible="showImageDialog"
                        header=""
                        :style="{ width: '70%', height: '70%' }"
                      >
                        <img :src="image" alt="Full Image" class="full-image" />
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center w-100 mt-4"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="d-none"
                    @change="addImage"
                  />
                  <button
                    type="button "
                    class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
                    @click="triggerFileInput"
                  >
                    <i class="pi pi-plus me-1"></i>
                    <span>Add</span>
                  </button>
                </div>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="6">
              <AccordionHeader>
                <div>
                  <i class="fa-solid fa-location-dot me-2 text-main-color"></i>
                  <span class="fs-5">Meeting Point</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <div v-if="showCreateDialog" id="map" class="my-2"></div>
                <div
                  class="w-100 d-flex justify-content-center align-items-center flex-wrap my-2"
                >
                  <span class="w-100 fs-5 my-1">Meeting Point Description</span>
                  <textarea
                    class="form-control w-100"
                    v-model="newTrip.meetingPoint.description"
                    @input="autoResize($event)"
                  ></textarea>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-main" @click="createTrip">Create</button>
      </template>
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
  },
  data() {
    return {
      showCreateDialog: false,
      showImageDialog: false,
      isImageHovered: false,
      currentPageTrip: 0,
      rowsPerPageTrip: 10,
      currentDataTrip: {
        id: null,
        title: null,
        category: null,
        maxMember: null,
        currentMember: null,
        rate: null,
        availability: null,
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
        duration: "",
        startDate: "",
        endDate: "",
        adultsDiscount: "",
        ChildrenDiscount: "",
        priceAdult: "",
        priceChild: "",
        heighlightsEn: [],
        heighlightsAr: [],
        fullDescriptionAr: "",
        fullDescriptionEn: "",
        includes: [],
        aboutActivity: [],
        images: [],
        meetingPoint: {
          point: {
            lat: null,
            lng: null,
          },
          description: "",
        },
      },
      map: null,
      marker: null,
      trips: [
        {
          id: 1,
          title: "Am Altoyor Vilage",
          category: "Guided Trip",
          maxMember: 50,
          currentMember: 15,
          rate: 2.5,
          availability: true,
        },
        {
          id: 2,
          title: "Latakia trip",
          category: "sea Trip",
          maxMember: 100,
          currentMember: 65,
          rate: 4.5,
          availability: true,
        },
        {
          id: 3,
          title: "Mhajren-mountin trip",
          category: "Mountin Trip",
          maxMember: 30,
          currentMember: 7,
          rate: 4,
          availability: true,
        },
        {
          id: 4,
          title: "Shikh-mountin trip",
          category: "Mountin Trip",
          maxMember: 75,
          currentMember: 70,
          rate: 3,
          availability: false,
        },
        {
          id: 5,
          title: "40-mountin trip",
          category: "Mountin Trip",
          maxMember: 30,
          currentMember: 21,
          rate: 4,
          availability: true,
        },
        {
          id: 6,
          title: "Tartous trip",
          category: "Sea Trip",
          maxMember: 150,
          currentMember: 84,
          rate: 3.5,
          availability: true,
        },
        {
          id: 7,
          title: "Tabaria-lake trip",
          category: "Sea Trip",
          maxMember: 150,
          currentMember: 15,
          rate: 1,
          availability: true,
        },
        {
          id: 8,
          title: "Four-seasion trip",
          category: "food Trip",
          maxMember: 10,
          currentMember: 3,
          rate: 4.5,
          availability: true,
        },
        {
          id: 9,
          title: "Tadmour trip",
          category: "Guided Trip",
          maxMember: 150,
          currentMember: 15,
          rate: 2,
          availability: false,
        },
        {
          id: 10,
          title: "Tadmour trip",
          category: "Guided Trip",
          maxMember: 150,
          currentMember: 15,
          rate: 2.5,
          availability: false,
        },
        {
          id: 11,
          title: "ALjeza trip",
          category: "Guided Trip",
          maxMember: 350,
          currentMember: 200,
          rate: 4,
          availability: false,
        },
      ],
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
    paginatedTrips() {
      const start = this.currentPageTrip * this.rowsPerPageTrip;
      const end = start + this.rowsPerPageTrip;
      return this.trips.slice(start, end);
    },
    paginatedReviews() {
      const start = this.currentPageReviews * this.rowsPerPageReviews;
      const end = start + this.rowsPerPageReviews;
      return this.tripReviews.slice(start, end);
    },
  },
  methods: {
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
    removeHighlightEn(index) {
      this.newTrip.heighlightsEn.splice(index, 1);
    },
    removeHighlightAr(index) {
      this.newTrip.heighlightsAr.splice(index, 1);
    },
    removeInclude(index) {
      this.newTrip.includes.splice(index, 1);
    },
    removeaboutActivity(index) {
      this.newTrip.aboutActivity.splice(index, 1);
    },
    deleteImage(index) {
      this.newTrip.images.splice(index, 1);
    },
    addHighlightEn() {
      this.newTrip.heighlightsEn.push("");
    },
    addHighlightAr() {
      this.newTrip.heighlightsAr.push("");
    },
    addInclude() {
      this.newTrip.includes.push({
        includeEn: "",
        includeEn: "",
        status: false,
      });
    },
    addAboutActivity() {
      this.newTrip.aboutActivity.push({
        aboutTitleAr: "",
        aboutTitleEn: "",
        aboutDescriptionAr: "",
        aboutDescriptionEn: "",
        icon: "fa-solid fa-circle",
      });
    },
    addImage(event) {
      const file = event.target.files?.[0]; // Safely access the first file
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.newTrip.images.push(e.target.result); // Add the image to the gallery
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the hidden file input
    },
    createTrip() {
      console.log(this.newTrip);
      this.showCreateDialog = false;
    },
    openCreateDialog() {
      this.showCreateDialog = true;
      nextTick(() => {
        this.initMap();
      });
    },
    initMap() {
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
    },
    addMarker(latLng) {
      const svgIcon = {
        path: "M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z",
        fillColor: "#014f51", // Fill color of the icon
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
  },
  mounted() {
    // Define the global initMap function
    window.initMap = () => {
      this.initMap();
    };

    // Dynamically load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCDfsSktFiU5jHwgde6UTYYHspsCCmzkqo&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
.table-page thead tr th span {
  font-size: 0.7rem;
  color: rgb(182, 182, 182);
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
.trip-img {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.overlay-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7.5rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.image-container:hover .overlay-img {
  opacity: 1;
  pointer-events: auto;
}
.image-container:hover .trip-img {
  filter: blur(3px);
}
.overlay-img div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
.full-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
}
/* Toggle Switch */
::v-deep .p-toggleswitch-slider {
  background: #c6c6c6 !important;
}
::v-deep .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background: #014f51 !important;
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
  background: #013a3c !important;
}
/* map */
#map {
  width: 100%;
  height: 25rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
