<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-wrap">
    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        class="w-60 my-1 d-flex justify-content-center align-items-center flex-wrap shadow-2 rounded-2 p-3"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">Hero Section</span>
        <!-- Hero section Title -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Hero Section Title</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-heading text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Hero Section Title"
              aria-label="Hero Section Title"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-solid fa-heading text-main-color" />
              <InputText
                id="hero_section_title"
                name="heroSectionTitle"
                v-model="settings.heroSectionTitle"
                fluid
              />
            </IconField>
            <label for="hero_section_title">Hero Section Title</label>
          </FloatLabel>
        </div>
        <!-- Hero section description -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Hero Section Description</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-paragraph text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Hero Section Description"
              aria-label="Hero Section Description"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-solid fa-paragraph text-main-color" />
              <InputText
                id="hero_section_description"
                name="heroSectionDescription"
                v-model="settings.heroSectionDescription"
                fluid
              />
            </IconField>
            <label for="hero_section_description"
              >Hero Section Description</label
            >
          </FloatLabel>
        </div>
      </div>
    </div>

    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        class="w-60 my-1 d-flex justify-content-center align-items-center flex-wrap shadow-2 rounded-2 p-3"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">Contact</span>
        <!-- Contact address -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Address</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-location-dot text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Contact Address"
              aria-label="Contact Address"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-solid fa-location-dot text-main-color" />
              <InputText
                id="contact_address"
                name="contactAddress"
                v-model="settings.contactAddress"
                fluid
              />
            </IconField>
            <label for="contact_address"
              >Contact Address</label
            >
          </FloatLabel>
        </div>
        <!-- Contact mail -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Email</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-envelope text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Contact Email"
              aria-label="Contact Email"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-solid fa-envelope text-main-color" />
              <InputText
                id="contact_email"
                name="contactEmail"
                v-model="settings.contactEmail"
                fluid
              />
            </IconField>
            <label for="contact_email"
              >Contact Email</label
            >
          </FloatLabel>
        </div>
        <!-- Contact Phone -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Phone</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-phone text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Contact Phone"
              aria-label="Contact Phone"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-solid fa-phone text-main-color" />
              <InputText
                id="contact_phone"
                name="contactPhone"
                v-model="settings.contactPhone"
                fluid
              />
            </IconField>
            <label for="contact_Phone"
              >Contact Phone</label
            >
          </FloatLabel>
        </div>
      </div>
    </div>

    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        class="w-60 my-1 d-flex justify-content-center align-items-center flex-wrap shadow-2 rounded-2 p-3"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">Social Media</span>
        <!-- Social Media facebook -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Facebook</span>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fa-brands fa-facebook-f text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Social Media Facebook"
              aria-label="Social Media Facebook"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-brands fa-facebook-f text-main-color" />
              <InputText
                id="social_media_facebook"
                name="socialMediaFacebook"
                v-model="settings.socialMediaFacebook"
                fluid
              />
            </IconField>
            <label for="social_media_facebook"
              >Social Media Facebook</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media X  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">X</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-brands fa-x-twitter text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Social Media X"
              aria-label="Social Media X"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-brands fa-x-twitter text-main-color" />
              <InputText
                id="social_media_x"
                name="socialMediaX"
                v-model="settings.socialMediaX"
                fluid
              />
            </IconField>
            <label for="social_media_x"
              >Social Media X (twitter)</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Instgram  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Instgram</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-brands fa-instagram text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Social Media Instgram"
              aria-label="Social Media Instgram"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-brands fa-instagram text-main-color" />
              <InputText
                id="social_media_instagram"
                name="socialMediaInstagram"
                v-model="settings.socialMediaInstagram"
                fluid
              />
            </IconField>
            <label for="social_media_instagram"
              >Social Media Instagram</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Tiktok  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Tiktok</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-brands fa-tiktok text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Social Media Tiktok"
              aria-label="Social Media Tiktok"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-brands fa-tiktok text-main-color" />
              <InputText
                id="social_media_tiktok"
                name="socialMediaTiktok"
                v-model="settings.socialMediaTiktok"
                fluid
              />
            </IconField>
            <label for="social_media_tiktok"
              >Social Media Tiktok</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Youtube  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
          <!-- <span class="w-100">Youtube</span>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-brands fa-youtube text-main-color"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Social Media Youtube"
              aria-label="Social Media Youtube"
            />
          </div> -->
          <FloatLabel variant="on" class="w-100">
            <IconField>
              <InputIcon class="fa-brands fa-youtube text-main-color" />
              <InputText
                id="social_media_youtube"
                name="socialMediaYoutube"
                v-model="settings.socialMediaYoutube"
                fluid
              />
            </IconField>
            <label for="social_media_youtube"
              >Social Media Youtube</label
            >
          </FloatLabel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
export default {
  components: {
    InputText,
    FloatLabel,
    IconField,
    InputIcon,
  },
  data() {
    return {
      settings: {
        heroSectionTitle: "",
        heroSectionDescription: "",
        contactAddress: "",
        contactEmail: "",
        contactPhone: "",
        socialMediaFacebook: "",
        socialMediaX: "",
        socialMediaYoutube: "",
        socialMediaInstagram: "",
        socialMediaTiktok: "",
      },
    };
  },
};
</script>

<style scoped></style>
