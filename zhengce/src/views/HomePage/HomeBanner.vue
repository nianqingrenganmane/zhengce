<template>
  <div class="topSwiperBox">
    <div class="topSwiper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="slide" v-for="(item, index) in banner" :key="index">
          <img :src="item.img" alt />
          <div class="titles">{{item.header}}</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
let vm = null;
export default {
  name: "banenr",
  props: {
    banner: Array
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
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
        speed: 1000,
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
    // actives(e) {
    //   console.log(e);
    //   if (e) {
    //     window.Location.href = e;
    //   }
    // },
    handleClickSlide(e) {
      var urlsa = this._props.banner[e].url;
      console.log(urlsa, 111);
      if (urlsa) {
        window.location.href = urlsa;
      }
    }
  }
};
</script>
<style scoped>
.slide {
  overflow: hidden;
  position: relative;
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
.topSwiper .swiper-pagination-bullet {
  width: 5px;
  height: 5px;
  border-radius: 2px;
}

.topSwiper .swiper-pagination-bullet-active {
  background: #fff;
  width: 8px;
}
</style>
