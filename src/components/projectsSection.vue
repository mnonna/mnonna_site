<template>
  <section class="app-projects app-section" data-nav-item="appProjects">
    <div class="container">
      <div class="row">
        <div class="section-main-header">
          <h2 class="section-main-header__text">Projects</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="app-projects__lead">
            <div class="app-projects__lead--image">
              <img :src="sectionLeadImg" alt />
            </div>
            <div class="app-projects__lead--desc">
              <p>{{ sectionDesc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-projects__list">
      <div class="container">
        <div class="row">
          <div class="col-lg-6" v-for="(project) in projects" :key="project.id">
            <project
              :id="project.id"
              :name="project.name"
              :image="api_url + project.image.formats.medium.url"
              :desc="project.description"
              :projectUrl="project.project_url"
              :githubUrl="project.github_url"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.app-projects {
  &__lead {
    padding: 0 0 70px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &--image {
      flex: 0 0 100%;
      max-width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    @media screen and (min-width: 768px) {
      align-items: center;
      &--image {
        flex: 0 0 60%;
        max-width: 60%;
      }
      &--desc {
        flex: 0 0 40%;
        max-width: 40%;
      }
    }
    p {
      color: $theme_third_color;
    }
  }
  &__list {
    padding: 20px 0 20px 0;
    width: 100%;
    /*background-image: linear-gradient(
      90deg,
      rgba(255, 211, 42, 0.8) 0%,
      rgba(255, 211, 42, 0.8) 30%,
      rgba(213, 213, 213, 0.75) 85%,
      rgba(238, 238, 238, 0.5046393557422969) 100%
    );*/
    background-image: url('../assets/Group 5.png');
    background-size: contain;
    background-repeat: repeat;
    background-position: bottom;

  }
}
</style>

<script>
import axios from "axios";
const project = () => import("./single/project");
export default {
  components: {
    project
  },
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      sectionDesc: "",
      sectionLeadImg: "",
      projects: []
    };
  },

  mounted() {
    this.retirieveSectionLead();
    this.retrieveProjects();
  },

  methods: {
    retirieveSectionLead: async function() {
      await axios
        .get(this.api_url + "/projects-section")
        .then(response => {
          this.sectionLeadImg = this.api_url + response.data.lead_image.url;
          this.sectionDesc = response.data.section_description;
        })
        .catch(error => {
          console.log(error);
        });
    },
    retrieveProjects: async function() {
      await axios
        .get(this.api_url + "/projects")
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>