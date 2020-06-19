import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

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
// 路由守卫
router.beforeEach((to, form, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  // const isLogin = false;
  console.log(store.state)
  console.log(to, form)
  if (to.path == "/author") {
    console.log(3)
    next();
  } else {
    if (isLogin && store.state.userid) {
      console.log(2)
      next()
    } else {
      if (to.path != '/login') {
        document.cookie = "urls=" + to.path;
      } else if (to.path == '/login') {
        next()
        return
      }
      console.log(1)
      next("/author")
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;