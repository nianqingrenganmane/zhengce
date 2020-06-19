<template>
  <div class="Headlines">
    <div class="HeadlinesLeft">
      <img src="../../assets/icon_head.png" alt />
    </div>
    <div class="HeadlinesRight">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="slide" v-for="(item,index) in headLiness" :key="index">{{item.picture}}</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
let vm = null;
export default {
  name: "banenr",
  props: {
    headLiness: Array
  },
  data() {
    return {
      swiperOptions: {
        pagination: {},
        direction: "vertical",
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        //滑动速度
        speed: 500,
        on: {
          click: function() {
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
        //小手掌抓取滑动
        // grabCursor : true,
        //左右点击
      }
    };
  },
  created() {
    vm = this;
  },
  methods: {
    handleClickSlide(e) {
      var urlsa = this._props.headLiness[e];
      console.log(urlsa);
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
    }
  }
};
</script>
<style scoped>
.Headlines {
  padding: 10px 15px;
  height: 40px;
  background: #fff;
}
.Headlines > div {
  float: left;
}
.HeadlinesLeft {
  width: 54px;
  border-right: 1px solid #2f2f2f;
  height: 15px;
  line-height: 40px;
  margin-top: 12.5px;
}
.HeadlinesLeft img {
  display: block;
  width: 35px;
  height: 25px;
  margin-top: -6px;
}
.HeadlinesRight {
  padding-left: 10px;
  font-size: 13px;
  height: 35px;
  width: calc(100% - 66px);
  overflow: hidden;
}
.slide {
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
