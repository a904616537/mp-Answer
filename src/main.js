import Vue from 'vue'
import App from './App'
import confirm from '@/components/confirm'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// 组件引用
Vue.component('confirm',confirm)

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main', 'pages/start/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#eefcff',
      navigationBarTitleText: '答题赢娃娃',
      navigationBarTextStyle: 'black'
    }
  }
}
