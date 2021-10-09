<template>
  <button
    type="button"
    class="app-button app-button__radius--10 app-button__bg--theme text-style__uppercase text-weight__semibold"
    @click="submitForm($event)"
    :disabled="disabled"
  >
    Send
    <font-awesome-icon v-show="processing" :icon="['fas', 'spinner']" spin />
  </button>
</template>

<style lang="scss" scoped>
</style>

<script>
import axios from "axios";
export default {
  props: {
    disabled: Boolean,
    data: Object,
    endpoint: String
  },
  data() {
    return {
      post: new FormData(),
      processing: false,
      statusMessaage: ""
    };
  },
  methods: {
    async submitForm($event) {
      this.processing = true;
      const data = this.data;
      for (const key in data) {
        this.post.append(key, data[key]);
      }
      await axios
        .post(this.endpoint, this.post)
        .then(response => {
          this.statusMessaage = response.data.message;
        })
        .catch(error => {
          this.statusMessaage = error.data.message;
        })
        .then(() => {
          this.cleanForm(this.statusMessaage, $event.target);
          this.processing = false;
        });
    },
    cleanForm(message, target) {
      const form = target.closest("form");
      const id = form?.id;
      const data = {
        formID: id,
        message: message
      };
      this.$root.$emit("formSubmitted", data);
    }
  }
};
</script>