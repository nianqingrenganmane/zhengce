<template>
  <div class="author"></div>
</template>

<script>
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
    console.log(tris);

    if (tris.code) {
      this.$axios
        .post("weChat/getOpenIdWebpage", {
          code: tris.code
        })
        .then(res => {
          this.$store.commit("userId", res.data.data.openid);
          this.$store.commit("access_token", res.data.data.access_token);
          this.useruLogin(res.data.data.openid);
          console.log(this.$store);
        });
    } else {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0058a525e6f6f76&redirect_uri=http%3a%2f%2fshefule.jijieit.com%2fdist%2findex.html%23%2fauthor&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
  },
  methods: {
    useruLogin(openid) {
      this.$axios
        .post("user/login", {
          open_id: openid,
          password: this.$md5(openid)
        })
        .then(res => {
          if (res.data.code != 20000) {
            console.log(4);
            var urlaa1 = window.location.href;
            var valiable1 = urlaa1.split("?")[0];
            window.history.pushState({}, 0, valiable1 + "#");
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
          var cookis = document.cookie.split("=")[1];
          if (cookis) {
            var urlaa2 = window.location.href;
            var valiable2 = urlaa2.split("?")[0];
            window.history.pushState({}, 0, valiable2 + "#");
            this.$router.replace(cookis);
          } else {
            var urlaa3 = window.location.href;
            var valiable3 = urlaa3.split("?")[0];
            window.history.pushState({}, 0, valiable3 + "#");
            // location.hash = "/";
            this.$router.replace("/");
          }
        });
    }
  },
  components: {}
};
</script>
<style scoped>
</style>
