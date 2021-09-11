<template>
  <div class="container-fluid">
    <div class="row">
      <section class="app-hero app-section">
        <div class="app-hero__overlay" :style="heroBgStyle"></div>
        <div class="app-hero__content">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="app-hero__text d-flex flex-column">
                  <h1 class="hero-main-header">{{ title }}</h1>
                  <p class="hero-lead">{{ leadText }}</p>
                  <p class="hero-desc">{{ description }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="app-hero__secondaryImg d-flex">
                  <div class="app-hero__secondaryImg--wrapper">
                    <img :src="urls.heroSecondaryImg" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="app-hero__scroll d-flex justify-content-center align-items-center"
          @click="scrollToAbout"
        >
          <div class="icon-wrapper">
            <font-awesome-icon icon="chevron-circle-down" size="3x" :style="{ color: '#FFD32A' }" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-hero {
  position: relative;
  height: 100vh;
  width: 100%;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  &__content {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    @media screen and (min-width: 768px) {
      padding: 100px 0 0 0;
    }
    & > .container,
    & > .container .row {
      height: 100%;
    }
    & > .container .row {
      @media screen and (min-width: 768px) {
        align-items: center;
      }
    }
    .hero-main-header {
      text-transform: uppercase;
      font-size: 40px;
      color: $main_theme_color;
      @media screen and (min-width: 768px) {
        font-size: 56px;
      }
    }
    .hero-lead {
      font-size: 22px;
      color: white;
      @media screen and (min-width: 768px) {
        font-size: 28px;
      }
    }
    .hero-desc {
      font-size: 14px;
      @media screen and (min-width: 768px) {
        font-size: 16px;
        padding: 0 50px 0 0;
      }
    }
    .hero-lead,
    .hero-desc {
      margin-top: 20px 0 0 0;
    }
    .hero-main-header,
    .hero-desc {
      color: $main_theme_color;
    }
    .hero-main-header,
    .hero-lead {
      font-weight: 700;
    }
  }
  &__text {
    height: 100%;
    justify-content: center;
    text-align: center;
    @media screen and (min-width: 768px) {
      text-align: unset;
    }
  }
  &__leadimg {
    width: 100%;
    height: 100%;
  }
  &__secondaryImg {
    width: 100%;
    justify-content: center;
    @media screen and (min-width: 768px) {
      justify-content: flex-end;
    }
    &--wrapper {
      width: 250px;
      height: 250px;
      padding: 20px;
      position: relative;
      @media screen and (min-width: 768px) {
        width: 340px;
        height: 340px;
      }
      &::after {
        content: "";
        position: absolute;
        height: 50%;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-left: 1px solid $main_theme_color;
        border-right: 1px solid $main_theme_color;
      }
      &:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 50%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border-top: 1px solid $main_theme_color;
        border-bottom: 1px solid $main_theme_color;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
    }
  }
  &__scroll {
    position: absolute;
    bottom: 20px;
    width: 100%;
    @media screen and (min-width: 768px) {
      bottom: 50px;
    }
    .icon-wrapper {
      cursor: pointer;
      animation: 2s infinite bounce cubic-bezier(0.5, 0.5, 0.5, 0.5);
      @keyframes bounce {
        0% {
          transform: translateY(20px);
        }
        25% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }        
        75% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(20px);
        }
      }
      svg {
        fill: $main_theme_color;
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
      title: "",
      description: "",
      leadText: "",
      urls: {
        heroMainImg: "",
        heroSecondaryImg: ""
      }
    };
  },

  mounted() {
    this.getHeroImgAssets();
  },

  computed: {
    heroBgStyle: function() {
      if(this.urls.heroMainImg) {
        let heroStyle = {
          'background-image': `linear-gradient(90deg, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.75) 35%, rgba(182,182,182,0.5046393557422969) 100%), url('${this.urls.heroMainImg}')`,
          'background-position': 'center',
          'background-size': 'cover'
        }
        return heroStyle
      }else {
        return ``
      }
    }
  },

  methods: {
    getHeroImgAssets: async function() {
      await axios
        .get(`${this.api_url}/hero`)
        .then(response => {
          this.urls.heroMainImg =
            this.api_url + response.data.hero_background.url;
          this.urls.heroSecondaryImg =
            this.api_url +
            response.data.hero_secondary_img.formats.medium.url;
          this.title = response.data.hero_title;
          this.description = response.data.hero_desc_text;
          this.leadText = response.data.hero_lead_text;
        })
        .catch(error => {
          console.log(error);
        });
    },
    scrollToAbout: function() {
      const about = document.querySelector("#appAbout");
      window.scrollTo({
        top: about.offsetTop - 100,
        behavior: "smooth"
      });
    }
  }
};
</script>