<template>
  <div class="author"></div>
</template>

<script>
import wechatUtil from "@/utils/wechatUtil";
export default {
  name: "author",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    // this.useruLogin("ocJPQ0VoGUIUGhGkn53m5Sg5IeiE");
    var urls = location.search;
    var theRequest = new Object();
    var tris = "";
    if (urls.indexOf("?") != -1) {
      var str = urls.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
      tris = theRequest;
    }
    console.log(tris, 66666666666666);
    this.$store.commit("userId", "o_y51wcqVBSyZedralz2xmVIC2yY");
    this.useruLogin("o_y51wcqVBSyZedralz2xmVIC2yY");
    // 正式版：o_y51wcqVBSyZedralz2xmVIC2yY
    // 测试版：ocJPQ0VoGUIUGhGkn53m5Sg5IeiE
    // this.$store.commit("userId", "ocJPQ0VoGUIUGhGkn53m5Sg5IeiE");
    //     this.$store.commit("userInfo", {
    //       id: 67,
    //       img_url:
    //         "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoajfajo8fzzS1E9g6VV8yqJr9xYDwAKd99aJQtdhFhQGAM8lDKOFdOGibNVwRASw7hmBNOtbnAGHQ/132",
    //       name: "",
    //       nickname: "、nugub",
    //       phone: "18736999552",
    //       username: ""
    //     });
    //     this.$router.replace("/");
    // if (tris.code) {
    //   this.$axios
    //     .post("weChat/getOpenIdWebpage", {
    //       code: tris.code
    //     })
    //     .then(res => {
    //       this.$store.commit("userId", res.data.data.openid);
    //       this.$store.commit("access_token", res.data.data.access_token);
    //       this.useruLogin(res.data.data.openid);
    //     });
    // } else {
    //   window.location.replace(
    //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef9ac8aa9a9bd204&redirect_uri=http%3a%2f%2fzcsdmobile.yuanqucha.com%23%2fauthor&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    //   );
    // }
  },
  methods: {
    useruLogin(openid) {
      sessionStorage.setItem("lastname", "Smith");
      this.$axios
        .post("user/login", {
          open_id: openid,
          password: this.$md5(openid)
        })
        .then(res => {
          if (res.data.code != 20000) {
            console.log(1);
            var urlaa1 = window.location.href;
            var valiable1 = urlaa1.split("?")[0];
            window.history.pushState({}, 0, valiable1 + "#");
            this.wechat();
            this.$router.replace("/login");
          } else {
            window.localStorage.setItem("ele_login", res.data.token);
            this.userInfo(openid);
          }
        });
    },
    userInfo(openid) {
      this.$axios
        .post("user/info", {
          code: "user",
          data: {
            openid: openid
          }
        })
        .then(res => {
          this.$store.commit("userInfo", res.data.data);
          var cookis = "";
          var cookiid = "";
          var strcookie = document.cookie; //获取cookie字符串
          var arrcookie = strcookie.split("; "); //分割
          //遍历匹配
          for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == "urls") {
              cookis = arr[1];
            }
            if (arr[0] == "id") {
              cookiid = arr[1];
            }
          }
          if (cookis) {
            console.log(2);
            var urlaa2 = window.location.href;
            var valiable2 = urlaa2.split("?")[0];
            window.history.pushState({}, 0, valiable2 + "#");
            this.wechat();
            if (cookis == "/details" || cookis == "/detailsy") {
              this.$router.replace({ path: cookis, query: { id: cookiid } });
            } else {
              this.$router.replace(cookis);
            }
          } else {
            console.log(3);
            var urlaa3 = window.location.href;
            var valiable3 = urlaa3.split("?")[0];
            window.history.pushState({}, 0, valiable3 + "#");
            this.wechat();
            // location.hash = "/";
            this.$router.replace("/");
          }
        });
    },
    // 调用jssdk、
    wechat() {
      var lon = "";
      var lat = "";
      wechatUtil.init(["getLocation"]).then((wx, res) => {
        wx.getLocation({
          type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(data) {
            console.log(data);
            lon = data.longitude;
            lat = data.latitude;
          }
        });
        console.log(111, wx, res);
      });
      setTimeout(() => {
        this.$store.commit("setItude", {
          lon: lon,
          lat: lat
        });
      }, 3000);
    }
  },
  components: {}
};
</script>
<style scoped>
</style>
