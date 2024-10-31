import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import ImageWithCaption from "../components/ImageWithCaption.vue";
import BookAndProgress from "../components/BookAndProgress.vue";
import ProgressBar from "../components/ProgressBar.vue";
import StreakOnDay from "../components/StreakOnDay.vue";
import Callout from "../components/Callout.vue";
import GradientUnderbar from "../components/GradientUnderbar.vue";
import GoldPurchasingPowerChart from "../components/GoldPurchasingPowerChart.vue";
import "./custom.scss";

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    ctx.app.component("ImageWithCaption", ImageWithCaption);
    ctx.app.component("BookAndProgress", BookAndProgress);
    ctx.app.component("ProgressBar", ProgressBar);
    ctx.app.component("StreakOnDay", StreakOnDay);
    ctx.app.component("Callout", Callout);
    ctx.app.component("GradientUnderbar", GradientUnderbar);
    ctx.app.component("GoldPurchasingPowerChart", GoldPurchasingPowerChart);
  },
};
