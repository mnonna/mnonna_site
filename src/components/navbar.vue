<template>
  <header
    class="app-header d-flex d-md-block flex-column flex-md-row justify-content-center justify-content-md-start"
    ref="navigation"
  >
    <button
      class="app-button app-button__bg--white app-header__toggle d-md-none d-flex justify-content-center align-items-center"
      @click="expandNavbar"
    >
      <font-awesome-icon :icon="['fa', 'bars']" />
    </button>
    <div class="container">
      <nav class="app-header__main d-flex flex-column flex-md-row justify-content-between">
        <div
          class="app-header__logo d-flex justify-content-center justify-content-md-start align-items-center"
        >
          <span>mnonn@</span>
        </div>
        <div class="app-header__links d-flex flex-column flex-md-row">
          <div
            class="app-header__links--single d-flex align-items-center justify-content-center"
            data-link="appAbout"
          >
            <a href>About Me</a>
          </div>
          <div
            class="app-header__links--single d-flex align-items-center justify-content-center"
            data-link="appProjects"
          >
            <a href>Projects</a>
          </div>
          <div
            class="app-header__links--single d-flex align-items-center justify-content-center"
            data-link="appTech"
          >
            <a href>Technologies</a>
          </div>
          <div
            class="app-header__links--single d-flex align-items-center justify-content-center"
            data-link="appContact"
          >
            <a href>Contact</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 40px);
  height: 100%;
  box-shadow: 0 0 10px $theme_second_color;
  padding: 0 0 5px 0;
  transform: translate3d(100%, 0, 0);
  transition: all .7s cubic-bezier(0.23, 1, 0.320, 1);
  will-change: transform;
  z-index: 100;
  @media screen and (min-width: 768px) {
    padding: 0;
    right: unset;
    height: auto;
    transform: translateX(0);
    width: 100%;
  }
  &.expanded {
    transform: translate3d(0, 0, 0);
  }
  &__toggle {
    position: absolute;
    top: 30px;
    left: -40px;
    width: 40px;
    height: 40px;
    border-right: 1px solid white;
  }
  &__logo {
    font-family: "Potta One", cursive;
    font-size: 30px;
    font-weight: 400;
    color: $theme_second_color;
    margin: 50px 0;
    @media screen and (min-width: 768px) {
      font-size: 40px;
    }
    span {
      text-shadow: 0 0 5px $main_theme_color;
    }
  }
  &__main {
    height: auto;
    @media screen and (min-width: 768px) {
      height: 100px;
    }
  }
  &__links {
    height: 100%;
    @media screen and (min-width: 768px) {
      margin: 0;
    }
  }
  &__links--single {
    height: 100%;
    padding: 15px 30px;
    a {
      font-size: 14px;
      font-weight: 700;
      color: black;
    }
    @media screen and (min-width: 768px) {
      padding: 0 15px 0 15px;
    }
  }
  &__links--single.active-item {
    border-radius: 0 0 10px 10px;
    background-color: $theme_second_color;
    border-bottom: 3px solid $main_theme_color;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    a {
      color: $main_theme_color;
    }
  }
}
</style>

<script>
/*eslint-disable */
export default {
  data() {
    return {};
  },

  mounted() {
    this.$root.$on("footerMounted", () => {
      const sections = document.querySelectorAll(".app-section");
      this.navigationHandler(sections);
      this.navigateToSection();
    });
  },

  methods: {
    navigationHandler(sections) {
      window.addEventListener("scroll", () => {
        var scrollPos =
          window.pageYOffset || document.documentElement.scrollTop;

        const scrollOffset = 150;

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.clientHeight;

          if (pageYOffset >= top - scrollOffset) {
            let target = sec.getAttribute("data-nav-item");

            const nav_links = document.querySelectorAll(
              `.app-header__links--single`
            );
            const nav_link_active = document.querySelectorAll(
              `.app-header__links--single[data-link="${target}"]`
            );

            nav_links.forEach(nl => {
              nl.classList.remove("active-item");
            });

            nav_link_active.forEach(nl => {
              nl.classList.add("active-item");
            });
          }
        });
      });
    },

    navigateToSection() {
      const links = document.querySelectorAll(".app-header__links--single");

      links.forEach(link => {
        const anchor = link.querySelector("a");
        anchor.addEventListener("click", function($event) {
          $event.preventDefault();
          const section = link.getAttribute("data-link");
          const navbarHeight = document
            .querySelector(".app-header")
            .getBoundingClientRect().height;
          var scrollPos =
            window.innerWidth < 768
              ? document.querySelector(`#${section}`).offsetTop
              : document.querySelector(`#${section}`).offsetTop - navbarHeight;

          window.scrollTo({
            top: scrollPos,
            behavior: "smooth"
          });
        });
      });
    },

    expandNavbar() {
      this.$refs.navigation.classList.toggle("expanded");
    }
  }
};
</script>