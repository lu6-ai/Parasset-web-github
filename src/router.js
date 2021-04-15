import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { setUserLoginInfo} from "./tools";
// import {host} from "./config";
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home/Index.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
      }
    },
    {
      path: '/mintage',
      name: 'mintage',
      component: () => import(/* webpackChunkName: "task" */ './views/Mintage/Index.vue'),
      meta: {
        title: '铸币',
        requireAuth: true,
      }
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: () => import(/* webpackChunkName: "insurance" */ './views/Insurance/Index.vue'),
      meta: {
        title: '保险池',
        requireAuth: true,
      }
    },
    {
      path: '/clearing',
      name: 'clearing',
      component: () => import(/* webpackChunkName: "task" */ './views/Clearing/Index.vue'),
      meta: {
        title: '清算',
        requireAuth: true,
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "task" */ './views/Task/Index.vue'),
      meta: {
        title: '任务',
        requireAuth: true,
      }
    },

  ]
});


router.beforeEach((to, from, next) => {
  if (to.path === '/'){
    next({
      path: '/home',
    });
  }
  // 检测资金密码
  // if (to.matched.some((r) => r.meta.checkFundPass)) {
  //   axios({
  //     method: 'post',
  //     url: host + 'user/query_info',
  //     data: {
  //       uid: store.state.uid,
  //     },
  //   }).then(function (response) {
  //     if (response.data && response.data.code === 0) {
  //       if (response.data.data.fundPass === 0) {
  //         Dialog.confirm({
  //           title: '提示',
  //           message: '请先设置资金密码'
  //         }).then(() => {
  //           next({
  //             path: '/setPayPassword',
  //           });
  //         });
  //       }
  //     }
  //   });
  // }
  //  检测是否登录
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (store.state.token && store.state.token !== '') {   //判断是否已经登录
      next();
    } else {
      // 已经登录，第一次就你如页面，设置state
      if (setUserLoginInfo()) {
        next();
        return
      }

      next();
      // next({
      //   path: '/login',
      //   query: {redirect: to.fullPath}   //登录成功后重定向到当前页面
      // });

    }
  } else {
    next();
  }
});
export default router;
