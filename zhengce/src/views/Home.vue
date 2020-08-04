<template>
  <div class="home">
    <div class="navTabs">
      <navTab :type="1" :tabLists="tabLists" @onchange="onchange" />
    </div>
    <div class="pas">
      <!-- banner -->
      <navBan v-show="indexTab == 0" :banner="banner1"></navBan>
      <!-- 头条 -->
      <headLines v-show="indexTab == 0" :headLiness="headLiness"></headLines>
      <!-- <HomeUnscramble v-show="indexTab == 0" :banner="banner2"></HomeUnscramble> -->
      <!-- 内容 -->
      <main>
        <div v-for="(item,index) in tabLists" :key="index">
          <div v-if="tabIDS === item.id">
            <keep-alive>
              <HomePage :banner2="banner2" :tabId="item.id" :tabLists="tabLists"></HomePage>
            </keep-alive>
          </div>
        </div>
      </main>
      <!-- <allList :contenLists="contenLists"></allList> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navTab from "@/components/navTab.vue";
// import allList from "@/components/allList.vue";
import navBan from "./HomePage/HomeBanner";
import HomePage from "./HomePage/HomePage";
import headLines from "./HomePage/HomeHeadlines";
// import HomeUnscramble from "./HomePage/HomeUnscramble";
import wechatUtil from "@/utils/wechatUtil";
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
  created() {
    this.wechat();
  },
  mounted() {
    // this.$axios
    //   .post("weChat/refund/getjsapiTicket", {
    //     url: "http://172.20.16.79:8080/"
    //   })
    //   .then(res => {
    //     console.log(res);
    //     wx.config({
    //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       appId: "wxef9ac8aa9a9bd204", // 必填，公众号的唯一标识
    //       timestamp: res.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: res.noncestr, // 必填，生成签名的随机串
    //       signature: res.sha1Hex, // 必填，签名
    //       jsApiList: [] // 必填，需要使用的JS接口列表
    //     });
    //   });
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
        if (num == 1) {
          this.headLiness = res.data.data.list;
        }
      });
    },
    // 获取tab下标
    onchange(e) {
      this.indexTab = e;
      this.tabIDS = this.tabLists[e].id;

      console.log(11111111111111111);
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
            name: "推荐",
            id: -1
          });
          res.data.data.list.push({ name: "", id: "" });
          this.tabLists = res.data.data.list;
        });
    },
    logSet(cid, op, cont) {
      this.$axios
        .post("log/set", {
          data: {
            cid: cid,
            uid: this.$store.state.userid,
            pid: this.$route.path,
            lat: this.$store.state.setItude.lon,
            lon: this.$store.state.setItude.lat,
            op: op,
            cont: cont
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    // 调用jssdk、
    wechat() {
      var lon = "";
      var lat = "";
      wechatUtil
        .init([
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "getLocation"
        ])
        .then((wx, res) => {
          // 这里写微信的接口
          wx.updateAppMessageShareData({
            title: "园区查", // 分享标题
            desc: "园区查", // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4Y4ic9zQkgibCz3oVRq2GZzye4ooULRKia6mCR6mv3voXDw/132", // 分享图标
            success: function() {
              // 设置成功
            }
          });
          wx.updateTimelineShareData({
            title: "园区查", // 分享标题
            desc: "园区查", // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4Y4ic9zQkgibCz3oVRq2GZzye4ooULRKia6mCR6mv3voXDw/132", // 分享图标
            success: function() {
              // 设置成功
            }
          });
          wx.getLocation({
            type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(data) {
              lon = data.longitude;
              lat = data.latitude;
              console.log(data, 2222222);
            }
          });
          console.log(res);
        });
      setTimeout(() => {
        this.$store.commit("setItude", {
          lon: lon,
          lat: lat
        });
        console.log(lon, this.$store.state);
        this.logSet("null", "查询", "null");
      }, 2000);
    }
  },
  components: {
    navTab,
    navBan,
    headLines,
    // allList,
    // HomeUnscramble,
    HomePage
  }
};
</script>
<style scoped>
.navTabs {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.pas {
  padding-top: 44px;
}
.wids {
  position: fixed;
  width: calc(100% - 60px);
}
</style>
