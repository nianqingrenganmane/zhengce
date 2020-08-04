<template>
  <div class="User">
    <div class="userBox">
      <div class="userCard">
        <div class="userCardLogo">
          <img :src="userinfo.img_url" alt />
        </div>
        <div class="userCardInfo">
          <div class="userCardName">{{userinfo.nickname}}</div>
          <div class="userCardPhone">{{userinfo.phone}}</div>
        </div>
      </div>
    </div>
    <van-cell title="我的收藏" is-link to="/collection" />
  </div>
</template>

<script>
import wechatUtil from "@/utils/wechatUtil";
export default {
  name: "User",
  data() {
    return {
      userinfo: {}
    };
  },
  components: {},
  created() {
    this.wechat();
  },
  mounted() {
    this.userinfo = this.$store.state.userInfo;
  },
  methods: {
    // 日志记录
    logSet(cid, op, cont) {
      this.$axios
        .post("log/set", {
          data: {
            cid: cid,
            uid: this.$store.state.userid,
            pid: this.$route.path,
            lat: this.$store.state.setItude.lat,
            lon: this.$store.state.setItude.lon,
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
  }
};
</script>
<style scoped>
.User {
  background: #f6f6f6;
  min-height: 100vh;
}
.userBox {
  padding: 15px 20px;
}
.userCard {
  background: #c9a97c;
  height: 60px;
  border-radius: 7px;
  padding: 20px 15px;
  display: flex;
}
.userCardLogo {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  overflow: hidden;
}
.userCardLogo img {
  width: 60px;
  height: 60px;
  display: block;
}
.userCardInfo {
  padding-left: 15px;
}
.userCardInfo > div {
  height: 30px;
  line-height: 30px;
}
.userCardName {
  font-size: 18px;
}
.userCardPhone {
  font-size: 16px;
}
</style>
