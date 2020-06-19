<template>
  <div class="home">
    <van-sticky>
      <div class="navTabs">
        <navTab :tabLists="tabLists" @onchange="onchange" />
        <router-link to="/search">
          <div class="search">
            <img src="../assets/icon_search.png" />
          </div>
        </router-link>
      </div>
    </van-sticky>
    <!-- banner -->
    <navBan v-show="indexTab == 0" :banner="banner1"></navBan>
    <!-- 头条 -->
    <headLines v-show="indexTab == 0" :headLiness="headLiness"></headLines>
    <HomeUnscramble v-show="indexTab == 0" :banner="banner2"></HomeUnscramble>
    <!-- 内容 -->
    <main>
      <div v-for="(item,index) in tabLists" :key="index">
        <div v-if="tabIDS == item.id">
          <keep-alive>
            <HomePage :tabId="item.id" :tabLists="tabLists"></HomePage>
          </keep-alive>
        </div>
      </div>
    </main>
    <!-- <allList :contenLists="contenLists"></allList> -->
  </div>
</template>

<script>
// @ is an alias to /src
import navTab from "@/components/navTab.vue";
// import allList from "@/components/allList.vue";
import navBan from "./HomePage/HomeBanner";
import HomePage from "./HomePage/HomePage";
import headLines from "./HomePage/HomeHeadlines";
import HomeUnscramble from "./HomePage/HomeUnscramble";

export default {
  name: "Home",
  data() {
    return {
      banner1: [],
      banner2: [],
      tabLists: [],
      indexTab: 0,
      tabIDS: -1,
      headLiness: [],
      handpick: 1, //是否精选
      label_place_ids: -1 //TabID
    };
  },
  computed: {},
  mounted() {
    // this.$store.commit("userId", "ocJPQ0VoGUIUGhGkn53m5Sg5IeiE");
    // this.$store.commit("userInfo", {
    //   id: 62
    // });
    // this.$axios
    //   .post("user/login", {
    //     open_id: "ocJPQ0VoGUIUGhGkn53m5Sg5IeiE",
    //     password: this.$md5("ocJPQ0VoGUIUGhGkn53m5Sg5IeiE")
    //   })
    //   .then(res => {
    //     if (res.data.code != 20000) {
    //       this.$router.push("/login");
    //     } else {
    //       window.localStorage.setItem("ele_login", res.data.token);
    //     }
    //   });
    this.bannerList();
    this.tabList();
    this.headLines();
    // this.contenList();
  },
  methods: {
    // 获取头条列表
    headLines() {
      var daty = {
        code: "policy_double",
        data: {
          page_index: 1,
          page_size: 100,
          sorters: [
            {
              field: "created_time",
              sort: "desc"
            }
          ],
          is_headlines: 1
        }
      };
      this.allLists(daty, 1);
    },
    // 获取内容列表
    allLists(daty, num) {
      this.$axios.post("qry/all", daty).then(res => {
        console.log(res);
        if (num == 1) {
          this.headLiness = res.data.data.list;
        }
      });
    },
    // 获取tab下标
    onchange(e) {
      console.log(e);
      this.indexTab = e;
      this.tabIDS = this.tabLists[e].id;
    },
    // 获取banner
    bannerList() {
      this.$axios
        .post("ent/listView", {
          code: "banner",
          data: {
            page_index: 1,
            page_size: 10,
            sorters: [
              {
                field: "id",
                sort: "desc"
              }
            ]
          }
        })
        .then(res => {
          if (res.data.data.list[1].url) {
            res.data.data.list[1].url = eval(
              "(" + res.data.data.list[1].url + ")"
            );
            this.banner1 = res.data.data.list[1].url;
          }
          if (res.data.data.list[0].url) {
            res.data.data.list[0].url = eval(
              "(" + res.data.data.list[0].url + ")"
            );
            this.banner2 = res.data.data.list[0].url;
          }
          console.log(res.data.data.list);
        });
    },
    //Tab列表
    tabList() {
      this.$axios
        .post("ent/listView", {
          code: "label_place",
          data: {
            page_index: 1,
            page_size: 100,
            sorters: [
              {
                field: "id",
                sort: "desc"
              }
            ],
            type: "2"
          }
        })
        .then(res => {
          res.data.data.list.splice(0, 0, {
            name: "全部",
            id: 0
          });
          res.data.data.list.splice(0, 0, {
            name: "精选",
            id: -1
          });
          this.tabLists = res.data.data.list;
          console.log(1);
        });
    }
  },
  components: {
    navTab,
    navBan,
    headLines,
    // allList,
    HomeUnscramble,
    HomePage
  }
};
</script>
<style scoped>
.navTabs {
  width: calc(100% - 60px);
}
.search {
  position: absolute;
  width: 60px;
  height: 44px;
  background: #fff;
  right: 0;
  top: 0;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: -6px -4px 10px -1px #eee;
}
.search img {
  width: 24px;
  height: 24px;
  margin-top: 10px;
}
main {
  padding: 0 15px;
}
</style>
