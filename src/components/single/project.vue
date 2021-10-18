<template>
  <div class="app-single-project">
    <div class="row m-0">
      <div class="col-lg-6 p-0" :class="order%2 == 0 ? 'order-lg-1' : 'order-lg-2'">
        <div class="app-single-project__thumb" :style="projectBgImage" ref="projectThumbnail"></div>
      </div>
      <div class="col-lg-6 p-0" :class="order%2 == 0 ? 'order-lg-2' : 'order-lg-1'">
        <div
          class="app-single-project__info d-flex flex-column justify-content-center"
          :class="order%2 == 0 ? 'bg__themeProjects' : ''"
        >
          <div class="app-single-project__title">
            <h2 class="app-heading app-heading__medium text-weight__semibold">{{ name }}</h2>
          </div>
          <div class="app-single-project__desc">
            <p class="app-text">{{ desc }}</p>
          </div>
          <div class="app-single-project__socials d-flex flex-wrap">
            <div class="app-single-project__socials--single">
              <a :href="projectUrl" target="_blank" v-show="projectUrl">
                <button
                  type="button"
                  class="app-button app-button__casual app-button__bg--white app-button__radius--30 mb-3"
                >
                  <span class="app-text app-text__fontWeight--600">Live site</span>
                </button>
              </a>
            </div>
            <div class="app-single-project__socials--single">
              <a :href="githubUrl" target="_blank" v-show="githubUrl">
                <button
                  type="button"
                  class="app-button app-button__casual app-button__bg--white app-button__radius--30 d-flex justify-content-center align-items-center"
                >
                  <span class="app-text app-text__fontWeight--600 mr-2">GitHub</span>
                  <font-awesome-icon :icon="['fab', 'github']" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <projectDesc :desc="desc" :show="showInfo" :image="image" />
  </div>
</template>

<style lang="scss" scoped>
.app-single-project {
  margin-bottom: 20px;
  border-bottom: 1px solid black;
  @media screen and (min-width: 992px) {
    margin-bottom: 0;
    border-bottom: none;
  }
  &__thumb {
    position: relative;
    height: 300px;
    @media screen and (min-width: 768px) {
      height: 400px;
    }
    @media screen and (min-width: 768px) {
      height: 500px;
    }
  }
  &__info {
    padding: 30px;
    @media screen and (min-width: 768px) {
      height: 400px;
    }
    @media screen and (min-width: 992px) {
      padding: 40px 80px 40px 80px;
      height: 500px;
    }
    @media screen and (min-width: 1200px) {
      padding: 80px 150px 80px 150px;
    }
  }
  &__title,
  &__desc {
    margin: 0 0 30px 0;
  }
  &__socials {
    margin: 0 -5px;
    flex-direction: column;
    @media screen and (min-width: 360px) {
      flex-direction: row;
    }
    &--single {
      padding: 0 5px;
    }
  }
}
</style>

<script>
const projectDesc = () => import("../modals/projectInfo");
export default {
  components: {
    projectDesc
  },
  props: {
    id: Number,
    name: String,
    image: String,
    desc: String,
    projectUrl: String,
    githubUrl: String,
    order: Number
  },
  computed: {
    projectBgImage: function() {
      if (this.image) {
        let heroStyle = {
          "background-image": `url('${this.image}')`,
          "background-position": "center",
          "background-size": "cover"
        };
        return heroStyle;
      } else {
        return ``;
      }
    }
  },
  data() {
    return {
      showInfo: false
    };
  },

  mounted: function() {},

  methods: {
    toggleProjectInfo() {
      this.showInfo = true;
    }
  }
};
</script>