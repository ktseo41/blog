import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ImageWithCaption from '../components/ImageWithCaption.vue'
import BookAndProgress from '../components/BookAndProgress.vue'
import ProgressBar from '../components/ProgressBar.vue'
import StreakOnDay from '../components/StreakOnDay.vue'
import './custom.scss'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {    // extend default theme custom behaviour.
    ctx.app.component('ImageWithCaption', ImageWithCaption)
    ctx.app.component('BookAndProgress', BookAndProgress)
    ctx.app.component('ProgressBar', ProgressBar)
    ctx.app.component('StreakOnDay', StreakOnDay)
  }
}
