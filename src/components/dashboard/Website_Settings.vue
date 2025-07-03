<template>
  <div class="w-100 d-flex justify-content-center align-items-center flex-wrap">
    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        :class="['w-60 my-1 d-flex justify-content-center align-items-center flex-wrap rounded-2  p-3', isDark? 'dark-shadow':'shadow-2']"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">{{ $t('dash.website_settings.hero_section') }}</span>
        <!-- Hero section Title -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
            <label for="hero_section_title">{{ $t('dash.website_settings.hero_section_title') }}</label>
          </FloatLabel>
        </div>
        <!-- Hero section description -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
        
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
              >{{ $t('dash.website_settings.hero_section_description') }}</label
            >
          </FloatLabel>
        </div>
      </div>
    </div>

    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        :class="['w-60 my-1 d-flex justify-content-center align-items-center flex-wrap  rounded-2 p-3', isDark? 'dark-shadow':'shadow-2']"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">{{ $t('dash.website_settings.contact') }}</span>
        <!-- Contact address -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.contact_address') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Contact mail -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.contact_email') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Contact Phone -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.contact_phone') }}</label
            >
          </FloatLabel>
        </div>
      </div>
    </div>

    <div class="w-100 d-flex justify-content-center align-items-center mb-3">
      <div
        :class="['w-60 my-1 d-flex justify-content-center align-items-center flex-wrap rounded-2 p-3' , isDark? 'dark-shadow':'shadow-2']"
      >
        <span class="w-100 text-center fs-4 text-main-color mb-3">{{ $t('dash.website_settings.social_media') }}</span>
        <!-- Social Media facebook -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.social_media_facebook') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media X  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.social_media_x') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Instgram  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.social_media_instagram') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Tiktok  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.social_media_tiktok') }}</label
            >
          </FloatLabel>
        </div>
        <!-- Social Media Youtube  -->
        <div class="d-flex justify-content-center flex-wrap mb-4 w-90">
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
              >{{ $t('dash.website_settings.social_media_youtube') }}</label
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
        isDark:null,
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
  beforeMount(){
    this.isDark = localStorage.getItem("mode") == "dark";
  }
};
</script>

<style scoped>
</style>
