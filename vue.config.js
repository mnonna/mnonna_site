module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/_variables.scss";
            @import "@/scss/_common.scss";
            @import "@/scss/_buttons.scss";
            @import "@/scss/_modals.scss";
            @import "@/scss/_forms.scss";
            @import "@/scss/_dialogs.scss";
            @import "@/scss/_typography.scss";
          `
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true
    }
  }
};
