import { defineClientAppEnhance } from "@vuepress/client";
import ProgressBar from "./components/ProgressBar.vue";
import HideContent from "./components/HideContent.vue";
import StockChart from "./components/StockChart.vue";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("ProgressBar", ProgressBar);
  app.component("HideContent", HideContent);
  app.component("StockChart", StockChart);
});
