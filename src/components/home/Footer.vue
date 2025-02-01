<template>
  <footer class="text-center text-lg-start bg-body-secondary" id="footer">
    <section class="d-flex justify-content-center p-4 border-bottom color">
      <div>
        <a :href="facebook" class="me-4 text-reset">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a :href="x" class="me-4 text-reset">
          <i class="fab fa-x"></i>
        </a>

        <a :href="instagram" class="me-4 text-reset">
          <i class="fab fa-instagram"></i>
        </a>
        <a :href="youtube" class="me-4 text-reset">
          <i class="fab fa-youtube"></i>
        </a>
        <a :href="tiktok" class="me-4 text-reset">
          <i class="fab fa-tiktok"></i>
        </a>
        <a :href="snapchat" class="me-4 text-reset">
          <i class="fab fa-snapchat"></i>
        </a>
      </div>
    </section>

    <section>
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4 color-always">
              <i class="fas fa-gem me-3"></i>Company name
            </h6>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
              nostrum nihil eveniet impedit, culpa molestiae debitis expedita
              mollitia animi deleniti.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4 color-always">
              {{ $t("footer.support.title") }}
            </h6>
            <p>
              <a href="#" class="text-reset">
                {{ $t("footer.support.contact") }}</a
              >
            </p>
            <p>
              <a href="#" class="text-reset">{{ $t("footer.support.pp") }}</a>
            </p>
            <p>
              <a href="#" class="text-reset">{{ $t("footer.support.ln") }}</a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4 color-always">
              {{ $t("footer.company.title") }}
            </h6>
            <p>
              <a href="#" class="text-reset">{{
                $t("footer.company.about")
              }}</a>
            </p>
            <p>
              <a href="#" class="text-reset">{{ $t("footer.company.blog") }}</a>
            </p>
            <p>
              <a href="#" class="text-reset">{{ $t("footer.company.gift") }}</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4 color-always">Contact</h6>
            <p>
              <i class="fas fa-home me-3 color float-start"></i>
              {{ location }}
            </p>
            <p>
              <i class="fas fa-envelope me-3 color float-start"></i>
              {{ email }}
            </p>
            <p>
              <i class="fas fa-phone me-3 color float-start"></i>{{ phone }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="text-center p-4">
      © {{ new Date().getFullYear() }} {{ $t("footer.copy") }}:
      <a class="text-reset fw-bold" href="#">Pharaoh Glory</a>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  facebook: String,
  youtube: String,
  x: String,
  instagram: String,
  snapchat: String,
  tiktok: String,
  location: String,
  email: String,
  phone: String,
});
</script>
