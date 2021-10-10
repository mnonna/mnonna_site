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
import { mapActions } from 'vuex'
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
      statusMessage: ""
    };
  },
  methods: {
    ...mapActions({
      addFormMessage: 'forms/addFormMessage'
    }),
    async submitForm($event) {
      this.processing = true;
      const data = this.data;
      for (const key in data) {
        this.post.append(key, data[key]);
      }
      await axios
        .post(this.endpoint, this.post)
        .then(response => {
          this.statusMessage = response.data.message;
          this.formPushStatusMessage(this.statusMessage, true)
        })
        .catch(error => {
          this.statusMessage = error.data.message;
          this.formPushStatusMessage(this.statusMessage, false)
        })
        .then(() => {
          this.flushFormData(this.post)
          this.cleanForm(this.statusMessage, $event.target);
          this.processing = false;
        });
    },
    cleanForm(message, target) {
      const form = target.closest("form");
      const id = form?.id;
      const data = {
        formID: id
      };
      this.$root.$emit("formSubmitted", data);
    },
    formPushStatusMessage(message, status) {
      let key = (Math.random() + 1).toString(36).substring(7)
      let formMessage = {
        message: message,
        key: key,
        status: status
      }
      this.addFormMessage(formMessage)
    },
    flushFormData() {
      this.post = new FormData()
    }
  }
};
</script>