<template>
  <section class="app-tech app-section" data-nav-item="appTech">
    <div class="container">
      <div class="row">
        <div class="section-main-header">
          <h2 class="section-main-header__text">Technologies</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="tech in technologies" :key="tech.id">
          <div class="tech-wrapper">
            <img :src="api_url + tech.image.url" alt />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.app-tech {
  padding: 0 0 70px 0;
}
.tech-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px 0;
  img {
    width: 120px;
    height: auto;
  }
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      technologies: []
    };
  },

  mounted() {
    this.retrieveTechnologies();
  },

  methods: {
    retrieveTechnologies: async function() {
      await axios
        .get(this.api_url + "/technologies")
        .then(response => {
          this.technologies = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>