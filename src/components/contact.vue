<template>
  <section class="app-section app-section__contact" data-nav-item="appContact">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-main-header">
            <h2 class="section-main-header__text">Contact</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 px-0">
          <div
            class="app-section__contact--bg"
            :style="`background-image: url('${section_bg}'); background-size: cover; background-position: right;`"
          ></div>
        </div>
        <div class="col-lg-6 px-lg-0">
          <div class="app-section__contact--form d-flex align-items-center justify-content-center">
            <div>
              <h3
                class="app-heading app-heading__form text-weight__semibold text-center"
              >Leave me a message</h3>
              <form class="app-form d-flex flex-column" id="appContactForm" ref="contactForm">
                <input
                  type="text"
                  placeholder="Name"
                  class="app-input"
                  v-model="form.name"
                  ref="name"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  class="app-input"
                  v-model="form.email"
                  ref="email"
                />
                <textarea
                  name
                  id
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  class="app-input"
                  v-model="form.message"
                  ref="message"
                ></textarea>
                <submitButton
                  :data="form"
                  :endpoint="`${api_url}/contact/mail`"
                  :disabled="disabled"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.app-section__contact {
  &--bg {
    height: 350px;
    margin: 0 0 30px 0;
    @media screen and (min-width: 768px) {
      height: 400px;
    }
    @media screen and (min-width: 992px) {
      margin: 0;
    }
  }
  &--bg,
  &--form {
    @media screen and (min-width: 992px) {
      height: 600px;
    }
    @media screen and (min-width: 1200px) {
      height: 750px;
    }
  }
  &--form {
    margin: 0 0 30px 0;
    @media screen and (min-width: 992px) {
      margin: 0;
    }
  }
  &--form,
  &--form > div {
    width: 100%;
  }
  &--form {
    @media screen and (min-width: 768px) {
      padding: 0 100px;
    }
    @media screen and (min-width: 992px) {
      padding: 0 50px;
    }
    @media screen and (min-width: 1200px) {
      padding: 0 150px;
    }
  }
}
</style>

<script>
import axios from "axios";
const submitButton = () => import("./forms/submitButton");
export default {
  components: {
    submitButton
  },
  data() {
    return {
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      section_bg: "",
      disabled: true,
      regexMatch: false,
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  },

  mounted() {
    this.retirieveSectionBg();
    this.$root.$on("formSubmitted", () => {
      this.form.name = null;
      this.form.email = null;
      this.form.message = null;
    });
  },

  watch: {
    "form.name": function(value) {
      if (value == "") {
        this.$refs.name.classList.add("app-input__invalid");
        this.regexMatch = false
      } else {
        this.$refs.name.classList.remove("app-input__invalid");
        this.regexMatch = true
      }

      if (value != "" && this.form.email != "" && this.form.message != ""
      && value !== null && this.form.email !== null && this.form.message !== null
      && this.regexMatch) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    "form.email": function(value) {
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (value && value !== null && !value.match(regex)) {
        this.$refs.email.classList.add("app-input__invalid");
        this.regexMatch = false
      } else {
        this.$refs.email.classList.remove("app-input__invalid");
        this.regexMatch = true
      }

      if (value != "" && this.form.message != "" && this.form.name != ""
      && value !== null && this.form.message !== null && this.form.name !== null
      && this.regexMatch) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    "form.message": function(value) {
      if (value == "") {
        this.$refs.message.classList.add("app-input__invalid");
        this.regexMatch = false
      } else {
        this.$refs.message.classList.remove("app-input__invalid");
        this.regexMatch = true
      }

      if (value != "" && this.form.name != "" && this.form.email != ""
      && value !== null && this.form.name !== null && this.form.email !== null
      && this.regexMatch) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },

  methods: {
    retirieveSectionBg: async function() {
      await axios
        .get(this.api_url + "/contact")
        .then(response => {
          this.section_bg = this.api_url + response.data.background.url;
        })
        .catch(error => {
          console.log(error);
        });
    },
    cleanForm: function() {
      document.getElementsByClassName('.app-input').forEach(el => {
        console.log(el)
        el.classList.remove('app-input__invalid')
      })
    }
  }
};
</script>