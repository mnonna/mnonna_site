<template>
  <section class="app-about app-section" id="aboutSection" data-nav-item="appAbout">
    <div class="container">
      <div class="row">
        <div class="section-main-header">
          <h2 class="section-main-header__text">About</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="app-about__desc">
            <p>{{ aboutDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.app-about {
  &__desc {
    position: relative;
    margin: 45px 0 45px 0;
    color: $theme_third_color;
    &::before {
      content: "";
      position: absolute;
      top: -50px;
      left: 0px;
      width: 30px;
      height: 30px;
      border-right: 1px solid $main-theme-color;
      border-bottom: 1px solid $main-theme-color;
      @media screen and (min-width: 993px) {
        top: -65px;
        width: 50px;
        height: 50px;
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -50px;
      right: 0px;
      width: 30px;
      height: 30px;
      border-left: 1px solid $main-theme-color;
      border-top: 1px solid $main-theme-color;
      @media screen and (min-width: 993px) {
        bottom: -65px;
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      aboutDesc: ""
    };
  },

  mounted() {
    this.retrieveAboutDesc();
  },

  methods: {
    retrieveAboutDesc: async function() {
      await axios
        .get(this.api_url + "/about")
        .then(response => {
          this.aboutDesc = response.data.about_text;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>