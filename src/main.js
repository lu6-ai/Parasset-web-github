import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem, Button, Toast, Swipe, SwipeItem, Lazyload, Dialog  } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Field } from 'vant';
import { Icon } from 'vant';
import { Slider } from 'vant';
import { Popover } from 'vant';
import {setUnit} from "./tools";
import '@vant/touch-emulator';

Vue.use(Popover);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Field);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false
Vue.use(Button).use(Toast).use(Swipe).use(SwipeItem).use(Lazyload).use(Tabbar).use(TabbarItem).use(Dialog);
Vue.prototype.setUnit =  setUnit;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

