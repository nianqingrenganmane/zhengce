import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
import wx from 'weixin-js-sdk'

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "政策速递",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/author",
    name: "author",
    component: () => import("../views/author.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () => import("../views/Login/login.vue")
  },
  {
    path: "/addUser",
    name: "addUser",
    meta: {
      title: "兴趣标签收集"
    },
    component: () => import("../views/AddUserData/AddUserData.vue")
  },
  {
    path: "/search",
    name: "search",
    meta: {
      keepAlive: true,
      title: "政策搜索"
    },
    component: () => import("../views/Search/Search.vue")
  },
  {
    path: "/unscramble",
    name: "unscramble",
    meta: {
      keepAlive: true,
      title: "政策解读"
    },
    component: () => import("../views/Unscramble/Unscramble.vue")
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: "个人中心"
    },
    component: () => import("../views/User/User.vue")
  },
  {
    path: "/collection",
    name: "collection",
    meta: {
      title: "我的收藏"
    },
    component: () => import("../views/Collection/Collection.vue")
  },
  {
    path: "/details",
    name: "details",
    meta: {
      title: "政策详情"
    },
    component: () => import("../views/Details/Details.vue")
  },
  {
    path: "/detailsy",
    name: "detailsy",
    meta: {
      title: "政策解读详情"
    },
    component: () => import("../views/DetailsY/DetailsY.vue")
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});
router.afterEach((to, from, next) => {
  console.log(111111111111, to, from, next)
  let path = to.fullPath.slice(1) // 去除'/'
  if (!sessionStorage.getItem('initLink')) {
    // 解决ios微信下，分享签名不成功的问题,将第一次的进入的url缓存起来。
    sessionStorage.setItem('initLink', document.URL)
  }
  let url

  // 安卓 process.env.BASE_URL 自己定义各个环境下域名变量
  url = location.origin + process.env.BASE_URL + path
  store.commit('setInitLink', url)
  if (to.path == '/details' || to.path == '/detailsy') {
    // window.scrollTo(0, 0);
  }

})
// 路由守卫
router.beforeEach((to, form, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  const session = sessionStorage.getItem("lastname") ? true : false;
  // const isLogin = false;
  console.log(to, form, session, store.state)
  if (to.path == "/author" && session) {
    if (form.path == "/login" || form.path == "/" || form.path == "/user" || form.path == "/details" || form.path == "/detailsy") {
      wx.closeWindow()
      console.log(999999)
    }
  }
  if (to.path == "/author") {
    next();
  } else {
    if (isLogin) {
      next()
    } else {
      if (to.path != '/login') {
        document.cookie = "urls=" + to.path;
        if (to.query.id) {
          document.cookie = "id=" + to.query.id;
        }
      } else if (to.path == '/login') {
        next()
        return
      }
      next("/author")
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;