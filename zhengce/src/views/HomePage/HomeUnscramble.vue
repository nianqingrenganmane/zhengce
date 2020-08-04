<template>
  <div class="HomeUnscramble">
    <van-cell title="政策解读" :border="false" is-link to="/unscramble" />
    <div class="my-swipe">
      <van-swipe class :autoplay="5000" indicator-color="white">
        <van-swipe-item
          class="slide"
          @click="handleClickSlide(item)"
          v-for="(item, index) in banner"
          :key="index"
        >
          <img :src="item.img" alt />
          <div class="label">{{item.label}}</div>
          <div class="titles">{{item.header}}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeUnscramble",
  props: {
    banner: Array
  },
  data() {
    return {};
  },
  created() {
    console.log(this);
  },
  methods: {
    handleClickSlide(e) {
      if (e.url) {
        this.logSet(e.id, "点击", e.header);
        window.location.href = e.url;
      }
    },
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
    }
  }
};
</script>
<style scoped>
.my-swipe {
  padding: 0 20px;
  overflow: hidden;
}

.van-cell__title {
  font-size: 18px;
}
.slide {
  overflow: hidden;
  position: relative;
  height: 160px !important;
  border-radius: 5px;
}
.slide img {
  width: 100%;
  display: block;
  height: 100%;
}
.titles {
  font-size: 18px;
  color: #fff;
  position: absolute;
  bottom: 30px;
  left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 18px;
}
.label {
  position: absolute;
  font-size: 15px;
  color: #fff;
  left: 10px;
  bottom: 62.5px;
}
</style>
