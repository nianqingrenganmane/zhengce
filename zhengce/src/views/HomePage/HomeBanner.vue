<template>
  <div class="topSwiperBox">
    <div class="topSwiper">
      <!-- <swiper ref="mySwiper" :options="swiperOptionss">
        <swiper-slide class="slide" v-for="(item, index) in banner" :key="index">
          <img :src="item.img" alt />
          <div class="titles">{{item.header}}</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>-->
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item
          class="slide"
          @click="handleClickSlide(item)"
          v-for="(item, index) in banner"
          :key="index"
        >
          <img :src="item.img" alt />
          <div class="titles">{{item.header}}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "banenr",
  props: {
    banner: Array
  },
  data() {
    return {
      // swiperOptionss: {
      //   pagination: {
      //     el: ".swiper-pagination"
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   },
      //   notNextTick: true,
      //   //循环
      //   loop: true,
      //   //设定初始化时slide的索引
      //   initialSlide: 0,
      //   //自动播放
      //   autoplay: {
      //     delay: 5000,
      //     stopOnLastSlide: false,
      //     disableOnInteraction: false
      //   },
      //   //滑动速度
      //   speed: 1000,
      //   on: {
      //     click: function() {
      //       const realIndex = this.realIndex;
      //       vm.handleClickSlide(realIndex);
      //     }
      //   }
      //小手掌抓取滑动
      // grabCursor : true,
      //左右点击
      // }
    };
  },
  created() {},

  methods: {
    // actives(e) {
    //   console.log(e);
    //   if (e) {
    //     window.Location.href = e;
    //   }
    // },
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
.slide {
  overflow: hidden;
  position: relative;
  width: 345px !important;
  height: 100px !important;
}
.slide img {
  width: 100%;
  display: block;
}
.titles {
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  z-index: 99;
  color: #fff;
  font-size: 18px;
  margin-top: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.swiper-pagination {
  text-align: left;
  margin-left: 20px;
}
.topSwiperBox {
  padding: 10px 15px;
  overflow: hidden;
}
.topSwiper {
  border-radius: 5px;
  overflow: hidden;
}
.Headlines {
  display: flex;
}
</style>
<style>
.topSwiper .van-swipe__indicators {
  left: 10%;
}
.topSwiper .swiper-pagination-bullet-active {
  background: #fff;
  width: 8px;
}
</style>
