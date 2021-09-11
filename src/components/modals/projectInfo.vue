<template>
  <aside
    class="app-modal app-modal__projectInfo flex-column"
    v-if="show"
    ref="projectInfoModalWindow"
  >
    <div class="app-modal__close d-flex justify-content-end">
      <button class="app-button app-button__clean" @click="closeModal">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="app-modal__content d-flex flex-column align-items-center">
            <img :src="image" alt class="app-image app-image__size--medium app-image__rounded" />
            <p class="app-text app-text__size--medium app-text__color--white mt-4">{{ desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  props: {
    show: Boolean,
    desc: String,
    image: String
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$root.$emit("close-modal");
    }
  },

  mounted() {
    console.log(this.$refs)
  }
};
</script>