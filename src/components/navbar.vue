<template>
  <header class="app-header">
    <div class="container">
      <nav class="app-header__main d-flex justify-content-between">
        <div class="app-header__logo d-flex align-items-center">
          <span>mnonn@</span>
        </div>
        <div class="app-header__links d-flex">
          <div class="app-header__links--single d-flex align-items-center justify-content-center" data-link="appAbout">
            <a href>About Me</a>
          </div>
          <div class="app-header__links--single d-flex align-items-center justify-content-center" data-link="appProjects">
            <a href>Projects</a>
          </div>
          <div class="app-header__links--single d-flex align-items-center justify-content-center" data-link="appTech">
            <a href>Technologies</a>
          </div>
          <div class="app-header__links--single d-flex align-items-center justify-content-center" data-link="appContact">
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
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 0 10px $theme_second_color;
  padding: 0 0 5px 0;
  overflow-x: auto;
  @media screen and (min-width: 768px) {
    padding: 0;
    bottom: unset;
    top: 0;
  }
  &__logo {
    font-family: "Potta One", cursive;
    font-size: 22px;
    font-weight: 400;
    color: $theme_second_color;
    @media screen and (min-width: 768px) {
      font-size: 40px;
    }
    span {
      text-shadow: 0 0 5px $main_theme_color;
    }
  }
  &__main {
    height: 100px;
  }
  &__links {
    height: 100%;
    margin-left: 15px;
    @media screen and (min-width: 768px) {
      margin: 0;
    }
  }
  &__links--single {
    height: 100%;
    padding: 0 15px 0 15px;
    a {
      font-size: 14px;
      font-weight: 700;
      color: black;
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
      this.navigateToSection()
    });
  },

  methods: {
    navigationHandler: function(sections) {
      window.addEventListener("scroll", () => {
        var scrollPos =
          window.pageYOffset || document.documentElement.scrollTop;

        const scrollOffset = 150

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.clientHeight;

          if (pageYOffset >= (top - scrollOffset)) {
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

    navigateToSection: function() {
      const links = document.querySelectorAll('.app-header__links--single')

      links.forEach(link => {
        const anchor = link.querySelector('a')
        anchor.addEventListener('click', function($event) {
          $event.preventDefault()
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
        })
      })
    }
  }
};
</script>