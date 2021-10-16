<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="app-footer__copyright">
            <p>{{ copyrightText }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="app-footer__media d-flex">
            <div class="app-footer__media--wrapper d-flex">
              <div class="app-footer__icon" v-for="icon in icons" :key="icon.link">
                <a target="_blank" :href="icon.link">
                  <img :src="icon.iconUrl" alt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: black;
  padding: 0;
  & .row:first-of-type {
    min-height: 120px;
  }
  &__copyright {
    p {
      text-align: center;
      color: $main_theme_color;
      font-weight: 600;
      @media screen and (min-width: 768px) {
        text-align: start;
      }
    }
  }
  &__icon {
    @media screen and (min-width: 768px) {
      margin-left: 10px;
    }
    img {
      width: 25px;
      height: auto;
      @media screen and (min-width: 768px) {
        width: 30px;
      }
    }
  }
  &__media {
    width: 100%;
    justify-content: center;
    @media screen and (min-width: 768px) {
      justify-content: flex-end;
    }
    &--wrapper {
      width: 150px;
      justify-content: space-between;
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
      icons: [],
      copyrightText: ""
    };
  },

  mounted() {
    this.retrieveFooterAssets();
    this.$root.$emit("footerMounted")
  },

  methods: {
    retrieveFooterAssets: async function() {
      await axios
        .get(`${this.api_url}/footer`)
        .then(response => {
          this.copyrightText = response.data.copyright_text;
          this.icons = response.data.icon_link.map(icon => {
            return {
              iconUrl: this.api_url + icon.icon.url,
              link: icon.external_url
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};
</script>