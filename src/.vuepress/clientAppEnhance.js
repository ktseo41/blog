import { defineClientAppEnhance } from "@vuepress/client";
import { ProgressBar, HideContent, StockChart, ImageWithCaption } from './components'


export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("ProgressBar", ProgressBar);
  app.component("HideContent", HideContent);
  app.component("StockChart", StockChart);
  app.component("ImageWithCaption", ImageWithCaption);
});
