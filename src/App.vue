<template>
  <div id="app">
    <navbar />
    <hero />
    <about id="appAbout" />
    <projects id="appProjects" />
    <tech id="appTech" />
    <contact id="appContact" />
    <appFooter />
    <statusesDialogs />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Potta+One&display=swap");

body,
html {
  font-family: "Source Sans Pro", sans-serif !important;
  scroll-behavior: smooth;
}

a {
  color: black;
  text-decoration: none !important;
  &:visited {
    color: black;
  }
}

body p {
  margin: 0 0 0 0;
  font-size: 14px;
  @media screen and (min-width: 993px) {
    font-size: 16px;
  }
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background: white;
}

::-webkit-scrollbar-thumb {
  background: $main_theme_color;
  border-radius: 20px;
}
</style>

<script>
const navbar = () => import("./components/navbar");
const hero = () => import("./components/heroSection");
const about = () => import("./components/aboutSection");
const projects = () => import("./components/projectsSection");
const tech = () => import("./components/techSection");
const contact = () => import("./components/contact");
const appFooter = () => import("./components/footerSection");
const statusesDialogs = () => import("./components/appStatusMessages"); 
export default {
  name: "App",
  components: {
    navbar,
    hero,
    about,
    projects,
    tech,
    contact,
    appFooter,
    statusesDialogs
  }
};
</script>

