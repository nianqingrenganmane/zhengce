<template>
  <div class="Headlines">
    <div class="HeadlinesLeft">
      <img src="../../assets/icon_head.png" alt />
    </div>
    <div class="HeadlinesRight">
      <van-swipe vertical class="notice-swipe" :autoplay="5000" :show-indicators="false">
        <van-swipe-item
          @click="handleClickSlide(item)"
          v-for="(item,index) in headLiness"
          :key="index"
        >
          <span class="ssd">{{item.header}}</span>
        </van-swipe-item>
      </van-swipe>
      <!-- <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="slide" ></swiper-slide>
      </swiper>-->
    </div>
  </div>
</template>

<script>
// let vm = null;
export default {
  name: "banenr",
  props: {
    headLiness: Array
  },
  data() {
    return {
      // swiperOptions: {
      //   pagination: {},
      //   direction: "vertical",
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
      //   speed: 500,
      //   on: {
      //     click: function() {
      //       const realIndex = this.realIndex;
      //       vm.handleClickSlide(realIndex);
      //     }
      //   }
      //   //小手掌抓取滑动
      //   // grabCursor : true,
      //   //左右点击
      // }
    };
  },
  created() {
    // vm = this;
  },
  methods: {
    handleClickSlide(e) {
      var urlsa = e;
      console.log(urlsa);
      this.logSet(urlsa.id, "点击", urlsa.header);
      if (urlsa.type == 0) {
        this.$router.push({
          name: `details`, // 只是把query改了，其他都没变
          query: {
            id: urlsa.id
          }
        });
      } else {
        this.$router.push({
          name: `detailsy`, // 只是把query改了，其他都没变
          query: {
            id: urlsa.id
          }
        });
      }
      // if (urlsa) {
      //   window.open(urlsa);
      // }
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
.Headlines {
  padding: 10px 15px;
  height: 40px;
  background: #fff;
  display: flex;
  align-items: center;
}
.Headlines > div {
  float: left;
}
.HeadlinesLeft {
  width: 54px;
  border-right: 1px solid #2f2f2f;
  height: 13px;
  display: flex;

  align-items: center;
}
.HeadlinesLeft img {
  display: block;
  width: 35px;
  height: 25px;
}
.HeadlinesRight {
  padding-left: 15px;
  font-size: 13px;
  height: 35px;
  width: calc(100% - 67.5px);
}
.notice-swipe {
  height: 35px;
}
.van-swipe-item {
  display: flex;
  align-items: center;
  height: 35px;
}
.ssd {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>
