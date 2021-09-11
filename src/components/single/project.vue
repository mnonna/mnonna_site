<template>
  <div class="app-single-project">
    <div class="app-single-project__thumb" :style="projectBgImage" ref="projectThumbnail">
      <div
        class="app-single-project__more justify-content-center align-items-center flex-column"
        ref="projectMore"
      >
        <a :href="projectUrl" target="_blank" class="d-none" v-show="projectUrl">
          <button
            type="button"
            class="app-button app-button__casual app-button__bg--white app-button__radius--30 mb-3"
          >
            <span class="app-text app-text__fontWeight--600">Zobacz</span>
          </button>
        </a>
        <a :href="githubUrl" target="_blank" class="d-none" v-show="githubUrl">
          <button
            type="button"
            class="app-button app-button__casual app-button__bg--white app-button__radius--30 d-flex justify-content-center align-items-center"
          >
            <span class="app-text app-text__fontWeight--600 mr-2">GitHub</span>
            <font-awesome-icon :icon="['fab', 'github']"/>
          </button>
        </a>
        <div class="app-single-project__openDesc d-none justify-content-center align-items-center flex-column">
          <button class="app-button app-button__clean app-button__icon app-button__expand show-project-desc-modal" @click="toggleProjectInfo">
            <font-awesome-icon :icon="['fas', 'info']"/>
          </button>
        </div>
      </div>
    </div>
    <projectDesc :desc="desc" :show="showInfo" :image="image" />
  </div>
</template>

<style lang="scss" scoped>
.app-single-project {
  padding: 30px 0 30px 0;
  &__content {
    margin-top: 20px;
  }
  &__thumb {
    position: relative;
    border-radius: 10px;
    height: 250px;
    @media screen and (min-width: 768px) {
      height: 310px;
    }
  }
  &__more {
    display: flex;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 10px;
    background: radial-gradient(
      circle,
      rgba(36, 36, 36, 0.9) 0%,
      rgba(34, 34, 34, 0.75) 50%,
      rgba(78, 77, 77, 0.5046393557422969) 100%
    );
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    &.show {
      width: 100%;
      opacity: 1;
    }
  }
  &__openDesc {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 50px;
    height: 50px;
    background: black;
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
    githubUrl: String
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

  mounted: function() {
    this.$refs.projectThumbnail.addEventListener(
      "mouseenter",
      function() {
        this.$refs.projectMore.classList.add("show");
        setTimeout(
          function() {
            this.$refs.projectMore.children.forEach(el => {
              el.classList.remove("d-none");
            });
          }.bind(this),
          500
        );
      }.bind(this)
    );
    this.$refs.projectThumbnail.addEventListener(
      "mouseleave",
      function() {
        this.$refs.projectMore.children.forEach(el => {
          el.classList.add("d-none");
        });

        setTimeout(
          function() {
            this.$refs.projectMore.classList.remove("show");
          }.bind(this),
          200
        );
      }.bind(this)
    );
    this.$root.$on('close-modal', () => {
      this.showInfo = false
    })
  },

  methods: {
    toggleProjectInfo() {
      this.showInfo = true
    }
  }
};
</script>