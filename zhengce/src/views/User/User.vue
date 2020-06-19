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
export default {
  name: "User",
  data() {
    return {
      userinfo: {}
    };
  },
  components: {},
  mounted() {
    this.userinfo = this.$store.state.userInfo;
  },
  methods: {}
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
